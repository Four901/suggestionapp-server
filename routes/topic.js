

         



const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')

const Topic=require('../models/Topic')

const { body, validationResult } = require('express-validator');
 //this will give the all the notes of a loggedin user






router.delete('/deletetopic/:id',async (req,res)=>{
    try{
       
        //console.log(req)
        const result=await Topic.findByIdAndDelete(req.params.id)
        res.json(result)
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }

})








router.post('/addtopic',fetchUser,[
    
   /* [body('title','Enter a valid title').isLength({ min: 3 })],
    [body('description','Enter a valid description').isLength({ min: 5 })],
    body('type','Enter a valid type').isLength({ min: 3 }),*/


    
],async (req,res)=>{
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        //console.log("backenmd")
       //console.log(req.body)
      const topic=new Topic({
        description:req.body.description,
        user:req.user.id,
        isDone:req.body.isDone
      })
      //console.log("set")
      //console.log(inventory)
      const savedTopic=await topic.save();
      //console.log(savedTopic)
      res.json(savedTopic)


    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
    })

   


router.put('/updatetopic/:id',fetchUser,[
    
   
        
    ],async (req,res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
       


            
     

       let topic=await Topic.findById(req.params.id)
       if(!topic){return res.status(404).send("Not Found")}
       if(topic.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
      const newTopic={}
      if(req.body.description){newTopic.description=req.body.description}
      if(req.body.isDone){newTopic.isDone=req.body.isDone}
     
  
       if(newTopic.description===null)newTopic.description=topic.description
       if(newTopic.isDone===null)newTopic.isDone=topic.isDone
      
       
       
     
       topic=await Topic.findByIdAndUpdate(req.params.id,newTopic)
       res.json({topic})
        }
        catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
        })   
        
        
/*

 router.delete('/deletepost/:id',fetchUser,async (req,res)=>{
           try{
           let post=await Posts.findById(req.params.id)
           if(!post){return res.status(404).send("Not Found")}
           if(post.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}

           post=await Posts.findByIdAndDelete(req.params.id)
           //need to delete all the attachement
           //reports table must be deleted first 
           res.json({"Success":"Note has been deleted",post:post})
 }catch(error)
 {
     //console.error(error.message)
     res.status(500).send("Some error occured")
 }
            })
            
            

router.delete('/deleteallposts',fetchUser,async (req,res)=>{
    try{
        //need to delete all the attachement fpr each
        const posts=await Posts.find({user:req.user.id})
                for(let index=0;index<posts.length;index++)
                {
                    await Post.findByIdAndDelete(posts[index]._id);
                }
               
                res.json({"Success":"posts are deleted",posts:posts})
   
    }catch(error)
    {
        //console.error(error.message)
        res.status(500).send("Some error occured")
    }
                
                 })*/     
                 
                 

module.exports=router