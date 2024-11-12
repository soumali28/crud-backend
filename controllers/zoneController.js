const express = require('express');
const Zone = require('../models/Zone');

// Add zone
exports.addZone = async (req, res) => {
    try {
        const { name, zonalNumber, zonalLandmark } = req.body;
        const newZone = new Zone({ name, zonalNumber, zonalLandmark });
        await newZone.save();
        res.status(201).json({ message: 'Zone added successfully', zone: newZone });
    } catch (err) {
        res.status(400).json({ message: "Error adding zone", error: err.message });
    }
};

// Update zone

exports.updateZone = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedZone = await Zone.findByIdAndUpdate(id, updatedData,{new:true});

        if(!updatedZone){
            return res.status(404).json({message:'Zone not found'});
        }
        res.status(200).json({ message: 'Zone updated successfully', zone: updatedZone });
    } catch (err) {
        res.status(400).json({ message: "Error updating zone", error: err.message });
    }
};

// Delete zone

exports.deleteZone = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedZone = await Zone.findByIdAndDelete(id);
        if(!deletedZone){
            return res.status(404).json({message:'Zone not found'});
        }
        res.status(200).json({ message: 'Zone deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: "Error deleting zone", error: err.message });
    }
};