const express = require("express");
const router = express.Router();
const NotificationModel = require('../modals/Notification_Schema');

router.post('/notification',async(req,res)=>
{   try{
    const {require_id} = req.body;
    const message = await NotificationModel.find({require_id : req.body.require_id})
    // console.log(message)
    res.json(message);
}catch (err) {
    res.status(500).json({ message: err.message || 'Error in fetching Details' });
}   
})
module.exports = router;