const User = require("../models/user");

const { check, validationResult, cookie } = require('express-validator')

const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

exports.signup = (req, res) => {

    // for checking the express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to store in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email
        });
    });
};

//-----------------------SINGIN
exports.signin = (req, res) => {
    // vaildate the inputs given by the users
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].message
        })
    }
    //checking the credentials from database
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: "Email doesn't exist"
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password doesn't match"
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        // putting token in a cookie
        res.cookie("token", token, { expire: new Date() + 9999 })

        //parsing the cookie to the front end
        const { _id, name, email, role } = user;

        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role
            }
        })
    })
};

//protected route
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
});

// middle wares 
exports.isAuthenticated = (req, res, next) => {
    // console.log("Called isAuth")
    // console.log(req.profile?._id, req.auth)
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    // console.log("Called isAdmin")
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You're not ADMIN. ACCESS DENIED"
        })
    }
    next();
}

