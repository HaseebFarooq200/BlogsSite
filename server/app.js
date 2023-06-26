const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const cors = require('cors')
app.use(express.json());
app.use(require('./router/route.js'))
const PORT = process.env.PORT
require('./db/conn')
app.use(cors())
 
app.listen(PORT, () => {
  console.log(`Your app listening on port ${PORT}`)
})



