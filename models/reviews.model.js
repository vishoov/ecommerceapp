const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        max:5,
        min:1
    },
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    verifiedPurchase:{
        type:Boolean,
        default:false
    },
    votes:{
        type:Number,
        default:0
    },
    comments:[{
        userId:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    media:[{
        type:String
    }]
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;