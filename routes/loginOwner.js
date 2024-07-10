const express = require('express');
const worker = require('../models/worker');
const router = express.Router();
require('../connection')

router.post('/login',async(req,res)=>{
    try {
        const {mobilenumber} = req.body;
        const findworker =await worker.findOne({mobilenumber});
        if(findworker){
            return res.status(200).json(findworker);
        }
        return res.status(200).json({"Error":"This mobile number is not registered"})
        
    } catch (error) {
        console.error({"Error":error});
        res.status(500).json({"Error":error});
    }
})

module.exports = router;