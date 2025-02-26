const User = require('../models/user.model');
const { createToken } = require('../middlewares/auth');

const userHome = (req, res)=>{

        res.send("These are the user routes")
    
}

const userLogin =  async (req, res)=>{
     
 
    try{

        //extract the information that would be used to authenticate the user
    const { username, password } = req.body;
  
    //mongoose has CRUD operations defined as methods of the User object 
    //findOne -> finds the first document that matches the query
    const user = await User.findOne({username});
    console.log(user);

   const token = createToken(email);
   //  if(!token){
   //      return res.status(400).send("Token not generated");
   //  }
    //if the user is not found we will send a 404 status code
    if(!user){
        return res.status(404).send("User not found!");
    }

    //if the password is incorrect we will send a 400 status code
   //  if(user.password !== password){
   //      return res.status(400).send("Invalid Password!");
   //  }

   const isMatch = await user.matchPassword(password);
   if(!isMatch){
       return res.status(400).send("Invalid Password!");
   }


    //if the user is found and the password is correct we will send a 200 status code
    res.status(200).send({user, token});

    }catch(err){
        res.status(400).send(err.message);
    }
}



const userSignup= async (req, res)=>{
    try{
        const user = await User.create(req.body);

        const token = createToken(user.email);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 30*24*60*60*1000});



        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    }
    catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

module.exports = { userHome, userLogin, userSignup };