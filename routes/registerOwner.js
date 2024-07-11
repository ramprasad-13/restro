const express = require('express');
const router = express.Router();
require('../connection');

const worker = require('../models/worker');

router.post('/register', async (req, res) => {
    try {
        const { mobilenumber, name, restaurantname, pincode, workertype } = req.body;

        // Validate and sanitize req.body fields here if needed

        const existingWorker = await worker.findOne({ mobilenumber });
        if (existingWorker) {
            return res.status(400).json({ error: "Mobile Number is already registered" });
        }

        const newWorker = new worker({
            mobilenumber,
            workertype,
            associateddata: { name, restaurantname, pincode }
        });

        await newWorker.save();

        return res.status(201).json({ success: newWorker });
    } catch (error) {
        console.error("Error in registration:", error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.mobilenumber) {
            return res.status(400).json({ error: 'Duplicate Mobile Number. Please choose a different Mobile Number.' });
        } else {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = router;
