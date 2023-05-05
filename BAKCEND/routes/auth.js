const express = require('express');
const{signout,signup,signin} = require("../controllers/auth.js");
const router = express.Router();

const {check, validationResult} = require('express-validator');

router.post("/signup",[
    check('name').isLength({min:3}).withMessage("Name atleast have 3 characters"),
    check('email').isEmail().withMessage("Email is required"),
    check('password').isLength({min:3}).withMessage("Password should atleast 3 characters")
], signup);

router.get("/signout", signout);

router.post("/signin",[
    check('email').isEmail().withMessage("Email is required"),
    check('password').isLength({min:3}).withMessage("Password is required")
], signin);

module.exports= router;

