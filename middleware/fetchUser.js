


//money & girls are nothing..........ohh wise one....believe me.....KRISHNA is everything..


//......So just remove the whole garbage from inside by writing down extraordinary or optimized code (कर्मणैव हि संसिद्धि)
                 




var jwt = require('jsonwebtoken');
const JWT_KEY="ohknoprob"

const fetchUser=async(req,res,next)=>{
    
    //console.log("i am fetching")
   
    const token=req.header('auth-token')

    if(!token)
    {
        res.status(401).send({error:"Authtoken fail 1"})
    }
    try{
        console.log(token);
        const data= await jwt.verify(token,JWT_KEY);//to verify the authtoken wiht key
        req.user=data.user;
        next();  //to call the another subsequent functions
    }catch(error)
    {
        res.status(401).send({error:"Authtoken fail 2"})
    }
  
}
module.exports=fetchUser;

//in this middleware we are using the jwt auth that's why included that 
//why we are using this middleware is to get the user from the authtoken which is comming from the request
//another one is jwt_key 
//now in the function we are accepting the req,res,next parameters
