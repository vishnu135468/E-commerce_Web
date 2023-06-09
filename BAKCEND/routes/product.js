const express = require('express')
const router = express.Router();

const {getProductById, createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts} = require("../controllers/product.js")

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth.js")
const {getUserById} = require("../controllers/user.js");

    // params
router.param("userId",getUserById);
router.param("productId",getProductById);

    // actual routes
    //create route
    router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
    //read product
    router.get("/product/:productId",getProduct);
    router.get("/product/photo/:productId",photo);

    //update route
    router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

    //delete route
    router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)

    //listing route
    router.get("/products",getAllProducts);
module.exports= router;
