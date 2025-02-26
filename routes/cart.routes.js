const router = require("express").Router();
const Cart = require("../models/cart.model");


//get all carts
router.get("/carts", async (req, res)=>{
    try{
        const carts = await Cart.find();
        res.status(201).json(carts);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
});

//get a single cart
router.get("/carts/:id", async (req, res)=>{
    try{
        const cartid = req.params.id;
        const cart = await Cart.findById(cartid);
        if(!cart){
            return res.status(404).json({msg: "Cart not found"});
        }
        res.status(201).json(cart);

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
});

//create a cart
router.post("/createCart", async (req, res)=>{
    try{
        const cart = req.body;
        const newCart = new Cart(cart);

        await newCart.save();
        res.status(201).json({msg: "Cart created successfully"});

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})

//update a cart
// router.put("/carts/:id", async (req, res)=>{
//     try{
//         const cartid = req.params.id;
//         const updates = req.body;
//         const options = {new: true};
//         const updatedCart = await Cart.findByIdAndUpdate(cartid, updates, options);
//         if(!updatedCart){
//             return res.status(404).json({msg: "Cart not found"});
//         }
//         res.status(201).json(updatedCart);

//     }
//     catch(err){
//         return res.status(500).json({msg: err.message});
//     }
// });


//cart management ->
//1. you can save the cart on the server 
//2.cache the cart on your local storage 
    // -> save the cart using cookies 
    // cookies -> jwt-> token
    //cart-> userId, product, total 


//delete a cart
router.delete("/deleteCart/:id", async (req, res)=>{
    try{
        const cartid = req.params.id;
        const cart = await Cart.findByIdAndDelete(cartid);

        if(!cart){
            return res.status(404).json({msg: "Cart not found"});
        }
        res.status(201).json({msg: "Cart deleted successfully"});
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})

//add a product to the cart
router.post("/carts/:cartId", async (req, res)=>{
    try{
        const cartId = req.params.cartId;
        const cart = await Cart.findById(cartId);
        //product page -> id 
        const { productId, quantity, price }   = req.body;
        

        //checks if the cart exists or not
        if(!cart){
            cart = new Cart({ user: req.user._id, products:[], total:0 });
        }

        //checks if the product is already in the cart
        if(cart.products.length >0){
            const existingProductIndex = cart.products.findIndex(product=> product.productId === productId);
            if(existingProductIndex >-1){
                //fetched the product that was ALREADY existing
                const existingProduct = cart.products[existingProductIndex];
                //increased the quantity and price in this OBJECT
                existingProduct.quantity += quantity;
                existingProduct.price +=price;
                //replaced the existing product with the updated product
                cart.products[existingProductIndex]= existingProduct;
                //updated the total price of the cart
                cart.total += price;
                await cart.save();
                return res.status(201).json({msg: "Product quantity increased successfully"});
            }
        }

        else{
            
        //we need to add the product
        cart.products.push({productId, quantity, price});
        cart.total += price;
        await cart.save();
        }

        return res.status(201).json({msg: "Product added to cart successfully"});

    }catch(err){
        return res.status(500).json({msg: err.message});
    }
})
//website -> add to cart
//if cart.products>0 -> send an email or whatsapp to the user 
//to remind them to checkout


//remove a product from the cart
router.delete("/carts/:cartId/:productId", async (req, res)=>{
    try{
        const cart = await Cart.findById(req.params.cartId);
        const productId = req.params.productId;

        if(!cart){
            return res.status(404).json({msg: "Cart not found"});
        }

        const existingProductIndex = cart.products.findIndex(product=> product.productId === productId);
        
        //it starts from an index and goes till n splice(index,n)
        cart.products.splice(existingProductIndex,1);
        await cart.save();
        return res.status(201).json({msg: "Product removed from cart successfully"});

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
   
})

//update a product in the cart
router.put("/carts/:cartId/:productId", async (req, res)=>{
    try{
        const cart = await Cart.findById(req.params.cartId);
        const productId = req.params.productId;

        if(!cart){
            return res.status(404).json({msg: "Cart not found"});
        }

        const existingProductIndex = cart.products.findIndex(product=> product.productId === productId);

        const {quantity, price} = req.body;

        const existingProduct = cart.products[existingProductIndex];
        existingProduct.quantity = quantity;
        //edge case 
        if(existingProduct.quantity===0){
            cart.products.splice(existingProductIndex,1);
        }
        existingProduct.price = price;
        cart.products[existingProductIndex] = existingProduct;
        await cart.save();

    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
})


module.exports = router;