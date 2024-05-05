const Notification_Mongoose = require('mongoose');
const NotificationScheme = Notification_Mongoose.Schema(
    {
           require_id : {type:String},
           message : {type:String},
           date  : {type : Date,default : Date.now}

    },
    {
        timestamps:true
    }
)
module.exports  =  Notification_Mongoose.model('Notification_details', NotificationScheme)