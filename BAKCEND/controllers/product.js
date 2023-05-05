const Product = require("../models/product.js");

//npm for form data
const formidable = require("formidable");
const _ = require("lodash");

//for accessing path of file (File System)
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category") //----------
    .exec((err, prod) => {
      if (err) {
        return res.status(403).json({
          error: " Product not found",
        });
      }
      req.product = prod;
      next();
    });
};

//---------------------Create Product

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  console.log(form);
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log(fields);
    console.log(file);

    if (err) {
      return res.status(400).json({
        error: "problem with image..",
      });
    }

    const { name, description, price, category, stock } = fields; //Destructuring the Fields

    //--------------restriction on field

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    //-----------------------------------

    let product = new Product(fields);

    //handling the file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too BIG",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "FAILED to save t-shirt in DB ",
        });
      }
      res.json(product);
    });
  });
};

//--------------------read controller

//get product
exports.getProduct = (req, res) => {
  // req.product.photo = undefined;
  res.json(req.product);
};

//--------------MIDDLEWARE (PHOTO)

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//--------------------update controller

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

    // No need for restriction in update process
    // if (!name || !description || !price || !category || !stock) {
    //   return res.status(400).json({
    //     error: "Please include all fields"
    //   });
    // }

    //UPDATION CODE
    let product = req.product;
    //lodash
    product = _.extend(product, fields);
    //-------------------------------------
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);
    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "UPDATION of product failed",
        });
      }
      res.json(product);
    });
  });
};

//--------------------delete controller

exports.deleteProduct = (req, res) => {
  let product = req.product;

  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete product",
      });
    }
    return res.json({
      // message: "Successfully deleted"
      message: `Product named ${product} is DELETED`,
    });
  });
};

//--------------------get all controller (LISTING ROUTER)

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 8; //taking limit form user
  // let limit;
  // if((req.query.limit).isEmpty()){
  //   limit = 8
  // }else{
  //   limit=req.query.limit
  // }
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]]) //Product.find().sort([['updatedAt', 'descending']])
    .limit(limit)

    //execute
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product found",
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.map((prod) => {
    return {
      // returning an object
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "BULK OPERATIONS FAILED",
      });
    }
    next();
  });
};
