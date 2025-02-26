const jwt = require('jsonwebtoken');


const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //boolean -> true or false
        console.log(decoded);
        next();
    }
    catch(err){
        res.status(401).json({
            status: "failed",
            message: "Unauthorized"
        })
    }
}
//Authorisation : Bearer 9y04yohflhlghlh
//json-> header, body 


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}




module.exports = { auth, createToken };


//login -> create Token 