const express = require('express');
const router = express.Router();
require('../connection');

const worker = require('../models/worker');

router.post('/register',async(req,res)=>{
    try {
        const {mobilenumber,name,restaruantname,pincode,workertype} = req.body;
        const findworker =await worker.findOne({mobilenumber});
        if(findworker){   
            return res.status(200).send({"Error":"Mobile Number is already registered"});
        }
        const data = new worker({mobilenumber,workertype,associateddata:{name,restaruantname,pincode}});
        // Modify data if needed
        await data.save();
        return res.status(201).json({ success: data });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.mobilenumber) {
        // Duplicate mobileNumber error
        res.status(400).json({ error: 'Duplicate Mobile Number. Please choose a different Mobile Number.' });
      } else {
        // Other errors
        res.status(500).json({ error: 'Internal server error' });
      }
      console.error(error);
    }
})

module.exports = router;