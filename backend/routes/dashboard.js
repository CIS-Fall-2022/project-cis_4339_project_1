const express = require("express");
const router = express.Router();
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 
let { organizationdata } = require("../models/models"); 

// GET, this route gets all events of a company as well as how many attendees are attending
// Source https://stackoverflow.com/questions/21387969/mongodb-count-the-number-of-items-in-an-array
//Route Link: localhost:3000/dashboard/
//Example Body: {"id":"OrganizationID"}
// date functionality will be inplemented in the frontend since we could not get it to work in the backend
router.get("/", (req, res, next) => {
    eventdata.aggregate([
    {$match: {organization: req.body.id}},
    {$project: { _id: 1, eventName: 1, date: 1, services: 1, address: 1, count: { $size:"$attendees" }}}],
    (error, data) =>{
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;