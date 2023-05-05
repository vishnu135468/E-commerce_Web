const { Order } = require("../models/order")

exports.getOrderById = (req, res, next, id) => {

    Order.findById(id)
        .populate("products.product", "name price")  // no comma
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "FAILED TO GET ORDER BY ID"
                })
            }
            req.order = order;
            next();
        })
}

//------------------------create Order

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err) {
            return res.status(401).json({
                error: "FAILED TO SAVE YOUR ORDER IN DB"
            })
        }
        res.json(order)
    });
}

//------------------------get All Order

exports.getAllOrders = (req, res) => {

    Order.find()
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "NO ORDER FOUND IN DB"
                })
            }
            res.json(orders);
        })
};


//------------------get ORDER STATUS
exports.getOrderStatus = (req, res) => {
    //getting enum values from order schema 
    res.json(Order.schema.path("status").enumValues);
}



//------------------UPDATE ORDER STATUS
exports.updateStatus = (req, res) => {
    Order.updateOne(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } }
    ).exec((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Cannot update Order Status"
            })
        }
        res.json(order);
    })
};


