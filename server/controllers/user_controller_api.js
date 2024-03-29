const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const randomize = require('randomatic');
const userModel = require('../modals/user_schema');
const jwtgenerator = require("../JwtToken/jwtgenerator");
const Authorize = require("../middleware/authorization");


router.post('/register', async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ useremail: req.body.useremail });
        if (existingUser) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(req.body.userpass, 10);
        const userObj = new userModel({
            username: req.body.username,
            useremail: req.body.useremail,
            usermobile: req.body.usermobile,
            userdob: req.body.userdob,
            userpass: hashedPassword,
            usergender: req.body.usergender,
            usercountry: req.body.usercountry,
            useraddress: req.body.useraddress,
        });
        const insertdocument = await userObj.save();
        res.status(200).send(true);
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error in Saving Data of User' });
    }
});


router.post('/login',async(req,res) =>
{
    try{ 
        const{useremail, userpass} = req.body;
        const user = await userModel.findOne({useremail : req.body.useremail});
        if(!user)
        {
         return res.status(401).json({message: "Invalid Credentials" });
        }
        const passwordMatch = await bcrypt.compare(userpass, user.userpass);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
       
        const token = jwtgenerator(user.id)
        const user_id = user.id;
        const username = user.username;
        const role = "user"
        const body={
            token,
            user_id,
            role,
            username
        }
        res.json(body);
    }
    catch(err)
    {
        res.status(500).json({ message: err.message || 'Error occurred during login' });
    }
});


router.post('/otp',async(req,res) =>
{
   try{
        const {useremail} = req.body;
        const user  = await userModel.findOne({useremail : req.body.useremail});
        if(!user)
        {
             const otp = randomize('0',4);
             const body = {
                otp
             }
             res.json(body)

        }
        else
        {
         return res.status(401).json({message :  "email is not present"})
        }
   }
   catch(err)
   {
    console.log(err.message);
   }
})
module.exports = router;
