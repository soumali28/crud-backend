const mongoose = require('mongoose');
const zoneSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    zonalNumber:{
        type: Number,
        required:false,
    },
    zonalLandmark:{
        type:String,
        required:false,
    }
});

module.exports = mongoose.model('Zone', zoneSchema);
