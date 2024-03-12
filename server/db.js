const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1/Capstone';

mongoose.connect(url).then(()=>
{
    console.log('NodeJs To MongoDB Connection Enable')
})
.catch(err =>
{
        console.log("Error in DB connection : " +JSON.stringify(err,undefined,2));
})
module.exports = mongoose;