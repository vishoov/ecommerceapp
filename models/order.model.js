const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
        
    },
    products:[{
        productId:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Placed",
        enum:["Placed", "Shipped","Out for Delivery", "Delivered"]
    },
    shippingAddress:{
        type :String,
        required:true
    },
    paymentType:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        default:"Pending",
        enum:["Pending", "Failed", "Success"]
    }
},
    {timestamps:true});
    //timestamps -> createdAt and updatedAt fields will be automatically added to the schema

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;