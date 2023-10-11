var db = require('./db');
// định nghĩa khuôn mẫu 
var tlSchema = new db.mongoose.Schema(

        {
            name : { type:String, require:true },
         
        },
        {
            collection: 'theloai'
        }      
);


// tạo modal 
let tlModal = db.mongoose.model("tlModal",tlSchema);
module.exports = {tlModal};