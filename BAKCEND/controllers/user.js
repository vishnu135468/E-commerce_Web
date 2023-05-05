const { orderBy } = require("lodash");
const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = async (req, res, next, id) => {
    // User.findById(id).exec((err, user) => {
    //     if (err || !user) {
    //         res.status(401).json({
    //             error: "No user found in Database"
    //         });
    //     }
    //     req.profile = user;
    //     next();
    // })
    try {
        const user = await User.findById(id);
        console.log(user);
        req.profile = user;
    } catch (err) {
        res.status(401).json({
            error: "No user found in Database"
        })
    }
    next();
}


exports.getUser = (req, res) => {
    // for hiding the sensitive data
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    req.profile.__v = undefined
    return res.status(200).json(req.profile)
}


/*
exports.getAllUser = (req, res) => {
    User.find().exec((err, user) => {
        if (err) {
            res.status(422).json({
                error: "Unable to retrieve data "
            })
        }
        res.json(user)
    })
}
*/
//------------------------------------------------------------------------------------
// exports.updateUser = (req, res) => {
//     User.findOneAndUpdate({ _id: req.profile._id },
//         { $set: req.body },
//         { new: true, useFindAndModify: true },
//         (err, user) => {
//             if (err || !user) {
//                 return res.send(422).json({
//                     error: "You are not authorized to update this user"
//                 })
//             }
//             user.salt = undefined
//             user.encry_password = undefined
//             user.__v = undefined
//             user.__v = undefined
//             res.json(user)
//         }
//     )
// }

exports.updateUser = async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({ _id: req.profile._id },
            { $set: req.body },
            { new: true }
        );
        res.json(updateUser);
    }
    catch (err) {
        return res.send(422).json({
            error: "you are not authorized to update this user"
        })
    }
}
//---------------------------------------------------------------------------------------------              

// exports.userPurchaseList = (req, res) => {
//     Order.find({ user: req.profile._id })
//         .populate("user", "id name")
//         .exec((err, order) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: "No Order in this account"
//                 })
//             }
//             return res.json({ order })
//         })
// }

exports.userPurchaseList = async (req, res) => {
    try {
        const order = await Order.find({ user: req.profile._id }).populate("user", "id name");
        req.json(order);
    } catch (err) {
        return res.status(400).json({
            error: "NO ORDER IN THIS ACCOUNT"
        })
    }
}


// middleware to push order in purchase list 
exports.pushOrderInPurchareList = (req, res, next) => {
    let purchases = []
    req.body.order.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    //store this in database
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next()
        }
    )

}

