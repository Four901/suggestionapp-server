



//money & girls are nothing..........ohh wise one....believe me.....KRISHNA is everything..

//......So just remove the whole garbage from inside by writing down extraordinary or optimized code (कर्मणैव हि संसिद्धि)
                 






const express=require('express');

const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_KEY=process.env.jwt_key;
const fetchUser=require('../middleware/fetchUser')





router.delete('/deleteuser',fetchUser,async (req,res)=>{
   
    let Success=false
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select(-"password")
    const resi=await User.findByIdAndDelete(userId)
    Success=true
    res.send({Success,resi})
    }catch(error)
    {
      console.error(error.message)
        res.status(500).send({Success,error:"You Need to signup"})
    }
    
        
    })

router.get('/getusers',fetchUser,async (req,res)=>{
   
    let Success=false
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select(-"password")
    const users=await User.find()
     console.log(users)
    Success=true
    res.send({Success,users})
    }catch(error)
    {
      console.error(error.message)
        res.status(500).send({Success,error:"You Need to Login"})
    }
    
        
    })




router.post('/updateuser',[
  
],async (req,res)=>{
  let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
console.log("here i am ");
const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
    
      let user1=await User.findOne({code:req.body.code});
      console.log(req.body.code)
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
      const salt=await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt);
      
      const secPassAdmin= await bcrypt.hash(req.body.adminPassword,salt);
      console.log(req.body)

      //followings
    
     
     
   
      const user= await User.findOne({code:req.body.code}).updateOne({
        code: req.body.code,
       
        password: secPass,
        passwordAdmin:secPassAdmin

      })
      console.log(req.body)
      console.log(user)
      
      let Success=true
      res.json({Success,user})
    /*  var AuthToken=jwt.sign(data,JWT_KEY);
      console.log(AuthToken)
      res.json(AuthToken)
      var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})




router.post('/createuser',[
  body('code','Enter a valid code'),
  body('password','Password should be atleast of 5 chars').isLength({ min: 5 }),
  body('adminPassword','Password should be atleast of 5 chars').isLength({ min: 5 })
 

 
],async (req,res)=>{
let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
console.log("here i am ");
const errors = validationResult(req);
console.log("here i am "+req.body.code);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  try{
    console.log("here i am "+req.body.code);
    let user=await User.findOne({code:req.body.code});
    console.log(req.body.code)
    console.log(user)
    if(user)
    {
       return res.status(400).json({Success,error:"User already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);
    const secPassAdmin= await bcrypt.hash(req.body.adminPassword,salt);
    console.log(req.body)
    user= await User.create({
      code: req.body.code,
      password: secPass,
      adminPassword: secPassAdmin,
    })
    console.log(req.body)
    console.log(user)
 
    let Success=true
    res.json({Success,user})
  /*  var AuthToken=jwt.sign(data,JWT_KEY);
    console.log(AuthToken)
    res.json(AuthToken)
    var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    console.error(error.message)
    res.status(500).send({Success,error:"Some error occured 235"})
  }

    
})




router.post('/loginuser',[
  body('code',"Please Enter the code"),
  // password must be at least 5 chars long
  body('password',"Password can not be blank").exists(),
],async (req,res)=>{
  let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  const {code,password}=req.body;
  try{

    let user=await User.findOne({code:req.body.code});
    if(!user)
    {
       return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
    var passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }

    var data={
      user:{
        id:user.id
      }
    }
    var AuthToken=jwt.sign(data,JWT_KEY);//over here we are signing the jwtauth token which is containing the id of the user
    console.log(AuthToken)
    Success=true
    
   
    res.json({Success,AuthToken})
    /*var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    console.error(error.message)
    res.status(500).send({Success,error:"Internal Server Error"})
  }

    
})


router.post('/loginadminuser',[
  body('code',"Please Enter the code"),
  // password must be at least 5 chars long
  body('password',"Password can not be blank").exists(),
  body('adminPassword',"Password can not be blank").exists()
],async (req,res)=>{
  let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  const {code,password,adminPassword}=req.body;
  try{

    let user=await User.findOne({code:req.body.code});
    if(!user)
    {
       return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
    var passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
    var passwordCompare1=await bcrypt.compare(adminPassword,user.adminPassword);
    if(!passwordCompare1)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }

    var data={
      user:{
        id:user.id
      }
    }
    var AuthToken=jwt.sign(data,JWT_KEY);//over here we are signing the jwtauth token which is containing the id of the user
    console.log(AuthToken)
    Success=true
    
   
    res.json({Success,AuthToken})
    /*var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    console.error(error.message)
    res.status(500).send({Success,error:"Internal Server Error"})
  }

    
})


router.get('/getuser',fetchUser,async (req,res)=>{
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
let Success=false
try{
const userId=req.user.id;
const user=await User.findById(userId).select(-"password")
Success=true
res.send({Success,user})
}catch(error)
{
  console.error(error.message)
    res.status(500).send({Success,error:"Authtoken fail 3"})
}

    
})







module.exports=router

//the hashing is the algorithm to store the paqssword in the form of hash means rather than storing the plan text password 
//backend will put the hashed code into the table 
//salt is used to make the hashed code more compliacted to that common passwords can't be broken 
//also pepper is used to make more security by adding after salt
//for these things we are going to use bcycripts.js