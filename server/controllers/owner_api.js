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
            owner_country : req.body.owner_country,
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

router.post('/Profile',async(req,res)=>
{
    try {
    const{id} = req.body;
    const details = await OwnerModel.findOne({_id : req.body.id})
    
    if (details) {
        res.json(details);
        // console.log(details)
    } else {
        res.status(404).json({ error: 'owner not found' }); // Handle case where user is not found
    }
}
catch (err) {
    console.log("Hello World")
    console.error('Error fetching owner details:', err);
    res.status(500).json({ error: 'Internal server error' }); // Handle internal server error
}

})




router.post('/Update', async (req, res) => {
    try {
        // Extract data from request body
        const { owner_id, name, email, Gender, phone, country, Address,company } = req.body;

        // Find the user by user_id and update their details
        const user = await OwnerModel.findOneAndUpdate(
            { _id: owner_id }, // Assuming your user model has '_id' as the primary key
            { 
                owner_company  : req.body.company,
                owner_name : req.body.name,
                owner_email : req.body.email,
                owner_mobile : req.body.phone,
                // owner_dob : req.body.owner_dob,
                owner_gender: req.body.Gender,
                owner_country : req.body.country,
                owner_address : req.body.Address
            },
            { new: true } // To return the updated user document
        );

        if (!user) {
            return res.status(404).json({ error: 'owner not found' });
        }

        res.status(200).json({ message: 'Owner details updated successfully', user });
    } catch (error) {
        console.error('Error updating Owner details:', error);
        res.status(500).json({ error: 'Internal server error' });
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
