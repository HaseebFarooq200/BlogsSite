const mongoose = require ("mongoose")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
      fullName: {
            type :String,
            required:true 
      },
      email: {
            type: String, 
            required:true
      },
      password:{
            type :String,
            required:true , 
      },
      confirmPassword :{
            type :String,
            required:true
      },
      isadmin:{
            type :Boolean,
            default:false
      },
      tokens:[
            {
                token:{
                    type: String,
                    required: true        
                }
            }
        ]
})

// Generating a TOKEN
userSchema.methods.generateAuthToken= async function(){
      try {
          let gen_token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
          this.tokens = this.tokens.concat({token:gen_token})
          await this.save();
          return gen_token;
      } catch (error) {
          console.log(error)
      }
  } 

const User = mongoose.model('User',userSchema)
module.exports = User