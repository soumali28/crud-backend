const express = require('express');
const Plan = require('../models/Plan');

// Add plan
exports.addPlan = async (req, res) => {
    try {
        const { name, planNumber, price } = req.body;
        const newPlan = new Plan({ name, planNumber, price });
        await newPlan.save();
        res.status(201).json({ message: 'Plan added successfully', plan: newPlan });
    } catch (error) {
        res.status(400).json({ message: 'Error adding plan', error: error.message });
    }
};

// Update plan

exports.updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedPlan = await Plan.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.status(200).json({ message: 'Plan updated successfully', plan: updatedPlan });
    } catch (error) {
        res.status(400).json({ message: 'Error updating plan', error: error.message });
    }
};

// Delete plan

exports.deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPlan = await Plan.findByIdAndDelete(id);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting plan', error: error.message });
    }
};

// Get all plans
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};