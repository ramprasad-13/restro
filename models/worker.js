const mongoose = require('mongoose');
require('dotenv').config();

const workerSchema = mongoose.Schema({
    mobilenumber:{
        type:Number,
        unique:true,
        required:true
    },
    workertype:{
        type:String,
        required:true,
        enum: ["owner", "chef", "waiter"]
    },
    associateddata:{
        type:Object
    }

})

module.exports= mongoose.model('Worker',workerSchema);