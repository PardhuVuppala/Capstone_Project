const express =  require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const OwnerModel = require('../modals/cantainer_owner_shema');
const randomize = require('randomatic');
const jwtgenerator = require("../JwtToken/jwtgenerator");
const Authorize = require("../middleware/authorization");
router.post('/register', async(req,res)=>
{
    try{
        const existingOwner = await OwnerModel.findOne({owner_email : req.body.owner_email})
        if(existingOwner)
        {
            return res.status(400).send({message  : "Email Already Exists"});
        }
        const hashedPassword = await bcrypt.hash(req.body.owner_pass,10);
        const OwnerObj = new OwnerModel({
            owner_company  : req.body.owner_company,
            owner_name : req.body.owner_name,
            owner_email : req.body.owner_email,
            owner_mobile : req.body.owner_mobile,
            owner_dob : req.body.owner_dob,
            owner_pass :hashedPassword,
            owner_gender: req.body.owner_gender,
            owner_country : req.body.owner_counter,
            owner_address : req.body.owner_address
        });
        const insertdocument = await OwnerObj.save();
        res.status(200).send('Document Inserted in MongoDB Database' + `<br/>` + insertdocument) 
    }
    catch(err)
    {
        res.status(500).send({ message: err.message || 'Error in Saving Data of User' });
   
    }
});
router.post('/login',async(req,res)=>
{
    try{
        const{owneremail,ownerpass} = req.body;
        const owner = await OwnerModel.findOne({owner_email: req.body.owneremail})
        if(!owner)
        {
            return res.status(401).json({message: "Invalid Credentials" });
        }
        const ownerPasswordMatch = await bcrypt.compare(ownerpass,owner.owner_pass)
        if(!ownerPasswordMatch)  {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwtgenerator(owner.id);
        const owner_id = owner.id;
        const ownername = owner.owner_name ;
        const role = "agent"
        body={
             token,
             owner_id,
             role,
             ownername
        }
        res.json(body)
    }
       catch(err)
       {
        res.status(500).json({ message: err.message || 'Error occurred during login' });
       }

});
router.post('/otp' ,async(req,res)=>
{    
     try
     {
        const{owneremail} = req.body;
        const present = await OwnerModel.findOne({owner_email : req.body.owneremail})
        if(present)
        {   
            const otp = randomize('0', 4);  
            const SendOtp = {
                otp
            }
            res.json(SendOtp)
        }
        else
        {
            return res.status(401).json({ message: 'User Not Exist' });   
        }
     }
     catch(err)
     {
        console.log(err.message);
     }
})

module.exports = router;
