const router = require('express').Router();
const Product = require('../models/product.model');



//get all products
router.get('/products', async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(201).json(products);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
});

//get a single product
router.get("/products/:id", async (req, res)=>{
    try{
        const productid = req.params.id;
        const product = await Product.findById(productid);
        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }
        res.status(201).json(product);

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
});

//create a product
router.post("/createProduct", async (req, res)=>{
    try{
        const product = req.body;
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({msg: "Product created successfully"});

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})

//update a product
router.put("/products/:id", async (req, res)=>{
    try{
        const productid = req.params.id;
        const updates = req.body;
        const options = {new: true};
        const updatedProduct = await Product.findByIdAndUpdate(productid, updates, options);
        if(!updatedProduct){
            return res.status(404).json({msg: "Product not found"});
        }
        res.status(201).json(updatedProduct);

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})



//delete a product
router.delete("/products/:id", async (req, res)=>{
    try{
        const productid = req.params.id;
        const product = await Product.findByIdAndDelete(productid);
        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }
        res.status(201).json({msg: "Product deleted successfully"});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})



module.exports = router;