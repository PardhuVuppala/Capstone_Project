const express = require('express');
const router = express.Router();
const Transaction_mongoose = require("mongoose");
const TransactionSchema = Transaction_mongoose.Schema(
    {
        user_id : {type : String},
        agent_id :{type:String},
        cont_id : {type:String},
        payment_id : {type: String},
        order_id : {type : String},
        amount : {type:String}
    },
    {
        timestamps:true
    }

)
module.exports  =  Transaction_mongoose.model('Transaction_details', TransactionSchema)