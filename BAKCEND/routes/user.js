const express = require("express")
const router = express.Router();

const {getUserById,getUser, getAllUser, updateUser, userPurchaseList} = require("../controllers/user.js")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth.js")

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

// router.get("/users", getAllUser);
//Updating user info
router.put("/user/:userId",isSignedIn, isAuthenticated, updateUser);

// 
router.get("/order/user/:userId",isSignedIn,isAuthenticated, userPurchaseList);




module.exports = router;