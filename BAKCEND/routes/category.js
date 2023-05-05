const express = require('express')
// object creating
const router = express.Router()

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category.js")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth.js")
const { getUserById } = require("../controllers/user")

//PARAMS
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//actual routes goes here 
//create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)  // using userId here for validation 

//read routes
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

//update routes
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete routes
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

// module.exports = router;
module.exports = router;


