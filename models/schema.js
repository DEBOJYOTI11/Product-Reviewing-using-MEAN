var mongoose = require('mongoose');
var sha1 = require('sha1');
// mongoose.connect('mongodb://localhost:27017/cortex');
var schemaDesign = { 
    name : { type:String  , trim: true , require : true } , 
    type : {type: String  , require : true} ,
    added : {type:Date  , default: Date.now },
    picture : {type:String , required: true},
    interested : [{
        email : {type:String , match: /.+@.+\..+/, lowercase:true , required:true}
    }],
    comments : [{
        email: {type:String ,required:true} , comment: {type:String , required:true} , stars:{type:Number , default:0 , max:5 , min:0}
     }],
}

var userschema  = {
    username: { type:String , require:true ,trim:true} , 
    email : { type: String , match: /.+@.+\..+/ , lowercase:true , require:true },
    password : { type:String , required:true },
    set encode(pass) {
        this.password = sha1(pass);
    }
}


module.exports.schemaDesign = schemaDesign;
module.exports.userschema = userschema; 
module.exports = new mongoose.Schema(schemaDesign);
