const router = require('express').Router();

const Order = require('../models/order.model');

router.post("/order", async (req, res)=>{
    try {
        const {userId, products, totalAmount, paymentType, paymentStatus, shippingAddress} = req.body;
        const order = new Order({
            userId, products, totalAmount, paymentType, paymentStatus, shippingAddress
        });
        await order.save();

        res.status(201).send(order);
    }
    catch(err){
        res
        .status(500)
        .send({message: err.message});
    }
});


//get all orders
router.get("/orders", async (req, res)=>{
    try{
        const order = await Order.find();
        res.send(order);

    }
    catch(err){
        res
        .status(500)
        .send({message: err.message});
    }
});


//Track the order
router.get("/order/:id", async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).send({message: "Order not found"});
        }

        res.status(200).send(order);

    }
    catch(err){
        res
        .status(500)
        .send({message: err.message});
    }
});

//update the order status
router.patch("/order/:id", async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).send({message: "Order not found"});
        }
        order.status = req.body.status;
        await order.save();
        res.status(200).send(order);
    }
    catch(err){
        res
        .status(500)
        .send({message: err.message});
    }
});

//delete the order
router.delete("/order/:id", async (req, res)=>{
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).send({message: "Order not found"});
        }
        res.status(200).send({message: "Order deleted successfully"});
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
})

module.exports = router;