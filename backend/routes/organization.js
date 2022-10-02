const express = require("express");
const router = express.Router();

let { organization } = require("../models/models"); 

router.get("/", (req, res, next) => { 
    organization.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});