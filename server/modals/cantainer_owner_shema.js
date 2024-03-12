const schema_mongoose = require('mongoose');

const ContainerOwnerSchema = schema_mongoose.Schema(
    {
      owner_company  : {type : String},
      owner_name  : {type : String},
      owner_email  : {type : String},
      owner_mobile  : {type : String},
      owner_dob  : {type  : String},
      owner_pass  : {type : String},
      owner_gender : {type : String},
      owner_country  : {type  :String},
      owner_address  : {type : String},
      ownerregdatetime  : {type : Date,default : Date.now}
    },
    {
        timestamps  : true
    }
);
 module.exports = schema_mongoose.model('owner_schema',ContainerOwnerSchema);