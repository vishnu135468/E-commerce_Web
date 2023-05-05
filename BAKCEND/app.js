//
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

// addressing to the routes to controllers
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes = require("./routes/product.js")
const orderRoutes = require("./routes/order.js")
const stripeRoutes = require("./routes/stripepayment.js")

//connection 
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true})
        .then((()=> console.log("Database connected")));

//Middlewares --- It is a piece of code that comes in the middle of request and response
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())
// path to routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    return `${port} is running`
})

