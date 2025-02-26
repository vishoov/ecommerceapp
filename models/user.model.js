const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide your username"],
        unique: [true, "Username already exists"],
        trim:true, 
        lowercase:true,
        minLength: [4, "Username must be atleast 4 characters long"],
        maxLength: [20, "Username must be atmost 20 characters long"]
    },
    age:{
        type: Number,
        required: [true, "Please provide your age"],
        min: [0, "You must be atleast 18 years old to signup"],
        max: [100, "You must be atmost 100 years old to signup"]
    },
    email:{
        type:String, 
        required: [true, "Please provide your email"],
        unique: [true, "Email already exists"],
        trim:true,
        lowercase:true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please provide a valid email"],
        // validate:{
        //     validator:function(value){
        //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        //     }
        // }
    },
    role:{
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    password:{
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8, "Password must be atleast 8 characters long"],
    },
    address:{
        type: String,
        required: [true, "Please provide your address"],
        trim:true,
        
    },
    phone:{
        type: String,
        required: [true, "Please provide your phone number"],
        match:[/^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/, "Please provide a valid phone number"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active:{
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date


});

userSchema.pre("save", async function(next){
    const user = this;
    //this keyword-> refers to the data that is being saved during that instance 
    //this -> user object
    // idg8638teidg8rt378guiebgikrg87r
    try{

        if(user.isModified("password")){
            
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
    // hashing refers to adding something to the password to make it unrecognisable 
        user.password = hashedPassword;
        next();
        }
    }
    catch(err){
        console.log(err);
    }
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;