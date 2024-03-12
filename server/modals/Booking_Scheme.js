const Booking_mongoose = require('mongoose');
const BookingScheme = Booking_mongoose.Schema(
{
    user_id : {type : String},
    agent_id :{type:String},
    cont_id : {type:String},
    start_time : {type: Date},
    end_time : {type : Date}

},
{
    timestamps:true
}
);
module.exports = Booking_mongoose.model('booking_details',BookingScheme)