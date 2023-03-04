

//money & girls are nothing..........ohh wise one....believe me.....KRISHNA is everything..

//......So just remove the whole garbage from inside by writing down extraordinary or optimized code (कर्मणैव हि संसिद्धि)
                 





const  mongoose=require('mongoose')
const { Schema } = mongoose;
const TopicSchema=new Schema({
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
    description:{
     type:String,
     required:true
     },
    date:{
        type:Date,
        default:Date.now
    },
    isDone:{
        type:Boolean,
        default:false
    }
  

});

module.exports=mongoose.model('topic',TopicSchema);
//to create the schema we need to first include the mongoose for mongodb after that from the mongoose
//we need to include the schema to create that one 
//now for creating schema just use the new keyword and then javascript object 
//after that using the mongoose need to export this schema using the model
