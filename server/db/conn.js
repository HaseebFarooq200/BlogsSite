const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB).then(()=>{
    console.log("Your Database is Connected to Server")
}).catch((err)=>{
    console.log("Something went wrong! Connection Unsuccessfull")
})