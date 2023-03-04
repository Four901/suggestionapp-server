

//money & girls are nothing..........ohh wise one....believe me.....KRISHNA is everything..

//......So just remove the whole garbage from inside by writing down extraordinary or optimized code (कर्मणैव हि संसिद्धि)
                 




const mongoose =require('mongoose')

//const mongooseURI=process.env.DB_URI
const mongooseURI="mongodb://localhost:27017/suggestionapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
//adding inotebook in url to create a new db with the name of inotebook
console.log("You are entering into mongodb spaceship")
const connectToMongoose=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("mongoDb is Connected")
    })
}

module.exports=connectToMongoose