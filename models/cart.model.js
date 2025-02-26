const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the user"]


    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: false,


            },
            quantity:{
                type:Number,
                required: [true, "Please provide the quantity of the product"],
                default: 1,
                min: [1, "Quantity cannot be less than 1"]

            },
            price:{
                type:Number,
                required: [true, "Please provide the price of the product"],
                min: [0, "Price cannot be less than 0"]

            }

        }
    ],
    total:{
        type:Number,
        required: [true, "Please provide the total amount of the cart"],
        min: [0, "Total amount cannot be less than 0"]
    }
})


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;