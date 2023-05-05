const Category = require("../models/category")

// finding category through id
exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, cate) => {
        if (err) {
           return res.status(400).json({
                error: "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    })
}

//------------------------ Creating Category

exports.createCategory = (req, res) => {
    //createing an object of category
    const category = new Category(req.body)

    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save category in DB"
            });
        }
        return res.json({ category });
    });
}

//------------------------get Category through id
exports.getCategory = (req, res) => {
    return res.json(req.category);

}

//------------------------get all Category
exports.getAllCategory = (req, res) => {

    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: " NO categories found"
            });
        }
       return res.json(categories);
    });
}


//------------------------Update Category

exports.updateCategory = (req, res) => {

    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        return res.json(updatedCategory);
    })
}


//------------------------Delete Category

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete category"
            })
        }
        return res.json({
            // message: "Succesfully deleted"
            message: `Category named ${category} is DELETED`
        })
    })
}