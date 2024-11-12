const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    planNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Plan', planSchema);