const express = require("express");
const router = express.Router();
const orgID = process.env.ORG_ID;

//importing data model schemas
let { organizationdata } = require("../models/models"); 

//GET all organizations
//EX: localhost:3000/organization
router.get("/", (req, res, next) => { 
    organizationdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});


//GET a single organization by ID
//EX: localhost:3000/organization/one
router.get("/one", (req, res, next) => {
    organizationdata.find( 
        { _id: orgID }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


module.exports = router;