const mongoose = require('mongoose');
const zoneSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    zonalNumber:{
        type: Number,
        required:true,
        unique:true,
    },
    zonalLandmark:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Zone', zoneSchema);
