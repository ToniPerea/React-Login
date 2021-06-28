const User = require("../models/user");
const jwt = require('jsonwebtoken')
// sendgrid
//const sgMail = require('@sendgrid/mail')
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)



 exports.signup = (req, res) => {
   //console.log('REQ BODY ON SIGNUP', req.body);
   const { name, email, password } = req.body;

   User.findOne({ email: email }).exec((err, user) => {
     if (user) {
       return res.status(400).json({
         error: "Email is taken"
       });
     }
   });

   let newUser = new User({ name, email, password });

   newUser.save((err, success) => {
     if (err) {
       console.log("SIGNUP ERROR", err);
       return res.status(400).json({
         error: err
       });
     }

     res.json({
       message: 'Signup success! Please signin'
     })
   });

   /*res.json({
     data: "you hit signup endpoint",
   });*/
 };


 exports.signin = (req, res) => {
   const {email, password} = req.body
   // check if user exist
   User.findOne({email}).exec((err, user) => {
     if(err || !user){
       return res.status(400).json({
         error: 'User with that email does not exist. Please signup'
       })
     }
     // authenticate
     if( !user.authenticate(password)){
      return res.status(400).json({
        error: 'Email and Password do not match'
      })
     }

     // generate a token and send to client

     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
     const {_id, name, email, role} = user

     return res.json({
       token: token,
       user: {_id, name, email, role}
     })


   })
 }

// const signup = async(req, res) => {
//
//}
// module.exports = {signup}
