const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');


const userSchema = new Schema({
    uuid :{
        type:String,
        required:false
    },
    Name :{
        type:String,
        required:true
    },
    Rollno :{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },

    Standard:{
        type:String,
        required:true
    },
    
        English:{
            type:String,
        required:true
        },
        Tamil:{
            type:String,
        required:true
        },
        Maths:{
            type:String,
        required:true
        },
        Science:{
            type:String,
        required:true
        },
        SS:{
            type:String,
        required:true
        }

        
    
    
},

    {
        timestamps:true,
    }

);

userSchema.pre("save",function(next){
    this.uuid = "STU-" + crypto.pseudoRandomBytes(4).toString('hex').toLocaleUpperCase();
    next();
});



const User = mongoose.model("user",userSchema);

module.exports = User;