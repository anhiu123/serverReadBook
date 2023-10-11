var db = require('./db');


var tkSchema = new db.mongoose.Schema(
    {
        username : {type : String ,require:true},
        passwd  : {type : String,require:true},
        email :{ type :String, require:true},
        role : { type : String ,require:true}
    },
    {
        collection :'user'
    }
);

let tkModal = db.mongoose.model("tkModal",tkSchema);
module.exports = {tkModal};