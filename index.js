


//money & girls are nothing..........ohh wise one....believe me.....KRISHNA is everything..

//......So just remove the whole garbage from inside by writing down extraordinary or optimized code (कर्मणैव हि संसिद्धि)
                 



const connectToMongoose=require('./db')

connectToMongoose();

var cors = require('cors')//to make connection between....yes i know 
const express = require('express')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())





//routes


app.use('/api/auth',require('./routes/auth')),

app.use('/api/topic',require('./routes/topic')),

app.get('/', (req, res) => {
  res.send('Hello BhaiLog!')
})

app.listen(port, () => {
  console.log(`Bhaii spardha listening on port ${port}`)
})
