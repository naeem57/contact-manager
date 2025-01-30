const User = require ("../models/user.js");
const bcrypt = require ("bcrypt");
const JWT = require ("jsonwebtoken");

//generate token
async function generateToken(userId){
  const token = JWT.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}) 
  return token;
}

//User Signup
const signup = async (req, res) => {

  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({message: 'All fields are required.'});
}

  try{
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message: "User already existed!"});
}


  const HashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({ username, email, password: HashedPassword })
  
    await user.save();
    return res.status(201).json({ message: 'User registered successfully!' });

}catch(err){
    console.error("User registration faild!", err);
}

}

//user login
const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    //check if user exist
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json("email not found!");
    
    //validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).json("Incorrect email or password!");

    const token = await generateToken(user.id); 
      return res.status(200).json({
        message: "Login Successful",
        token:token,
        user: user
      })


  }catch(err){
     console.log("Login faild!", err);
  }
 

}



module.exports = {
    signup,
    login,
}