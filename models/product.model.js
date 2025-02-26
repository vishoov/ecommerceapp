const mongoose = require('mongoose');


const productSchema = new  mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide the name of the product"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    description:{
        type: String,
        required: [true, "Please provide the description of the product"],
        maxLength: [500, "Description cannot exceed 500 characters"]
    },
    costprice:{
        type: Number,
        required: false,
        maxLength: [5, "Cost price cannot exceed 5 characters"]
    },
    saleprice:{
        type: Number,
        required: [true, "Please provide the sale price of the product"],
        maxLength: [5, "Sale price cannot exceed 5 characters"]
    },
    category:{
        type: String,
        required: [true, "Please provide the category of the product"],
        maxLength: [50, "Category cannot exceed 50 characters"]
    },
    stock:{
        type:Number,
        required: [true, "Please provide the stock of the product"],
        maxLength: [5, "Stock cannot exceed 5 characters"]

    },
    images:{
        type: [String],
        required: false

    },
    createdAt:{
        type: Date,
        default: Date.now
    },


});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;
