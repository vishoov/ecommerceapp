const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes');

mongoose.connect(process.env.MONGO_DB_URL, {

})
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log(err);
});


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
    //res.sendFile would send the index.html as response to this route
})

app.get("/v1", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.use("/v1", userRoutes);
//versioning of the routes 
app.use("/v1", productRoutes);
app.use("/v1", cartRoutes);
app.use("/v1", orderRoutes);
app.use("/v1", reviewRoutes);


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port 3000');
})
