const router = require("express").Router();

const Review = require("../models/reviews.model");

//create a review
router.post("/reviews", async (req, res) => {
    try{
        const review = await new Review(req.body);
        await review.save();
        res.status(201).send(review);


    }catch(err){
        res.status(500).send({message: err.message});
    }
})

//get all reviews
router.get("/reviews", async (req, res) => {
    try{
        const reviews = await Review.find();
        res.status(200).send(reviews);
    }catch(err){
        res.status(500).send({message: err.message});
    }
});

//get all reviews of a product
router.get("/reviews/:productId", async (req, res)=>{
    try{
        const reviews = await Review.find({productId: req.params.productId});
        res.status(200).send(reviews);
    }catch(err){
        res.status(500).send({message: err.message});
    }
})

//get all reviews of a user
router.get("/reviews/user/:userId", async (req, res)=>{
    try{
        const reviews = await Review.find({userId: req.params.userId});
        res.status(200).send(reviews);
    }catch(err){
        res.status(500).send({message: err.message});
    }
});

//get a review
router.get("/review/:reviewId", async (req, res)=>{
    try{
        const review = await Review.findById(req.params.reviewId);
        res.status(200).send(review);
    }catch(err){
        res.status(500).send({message: err.message});
    }
});

//delete a review
router.delete("/reviews/:reviewId", async (req, res)=>{
    try{
        const review = await Review.findByIdAndDelete(req.params.reviewId);
        res.status(200).send(review);
    }catch(err){
        res.status(500).send({message: err.message});
    }
});


module.exports = router;