





const  mongoose=require('mongoose')
const { Schema } = mongoose;
const UserSchema=new Schema({
   code:{
       type:String,
       required:true
   },
    password:{
        type:String,
        required:true
    },
    dateOfAdding:{
        type:Date,
        default:Date.now
    },
    adminPassword:{
         type:String,
         required:true
    }

    
});
const User=mongoose.model('user',UserSchema);
//to create the keys for unique one which is email
//User.createIndexes()
module.exports=User