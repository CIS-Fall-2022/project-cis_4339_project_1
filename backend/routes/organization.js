const express = require("express");
const router = express.Router();

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
//EX: localhost:3000/organization/id/1ad7b1c0-42c4-11ed-a805-bb9eeb9a45bd
router.get("/id/:id", (req, res, next) => {
    organizationdata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST, Make a new organization using a body request
//EX: localhost:3000/organization
//Body example for this will be included in the readme file for backend
router.post("/", (req, res, next) => { 
    organizationdata.create( 
        req.body, 
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