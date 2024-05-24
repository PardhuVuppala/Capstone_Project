const mongoose = require('mongoose');

const url = 'mongodb+srv://pardhuvuppala890:GjiEWCii7D8LSslB@cluster0.nzxmhvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url).then(()=>
{
    console.log('NodeJs To MongoDB Connection Enable')
})
.catch(err =>
{
        console.log("Error in DB connection : " +JSON.stringify(err,undefined,2));
})
module.exports = mongoose;
