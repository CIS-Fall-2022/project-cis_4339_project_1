const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models"); 

//GET all entries on a certain company using body request
/*Example Route Link: localhost:3000/primarydata/

Example Body: { "id":"3c3c6e50-42c4-11ed-b715-0d8c70bb56bc"} (ID value just for example purposes) */
router.get("/", (req, res, next) => { 
    primarydata.find( {organization: req.body.id},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by client ID using parameters
// Example Route Link: localhost:3000/primarydata/id/e8320710-4418-11ed-9e07-c35f33399c12
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
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

//GET entries based on search query
//Example Route Link: 'localhost:3000/primarydata/search/?firstName=Bob&lastName=&searchBy=name' 
//Request Body Example {"id":"Organization ID"}
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" }, organization: req.body.id}
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }, organization: req.body.id
        }
    };
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events by using EventID
//Example Route Link: localhost:3000/primarydata/events/e8320710-4418-11ed-9e07-c35f33399c12
router.get("/events/:id", (req, res, next) => { 
    eventdata.find({attendees: req.params.id},
    (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    }
    );
});

//POST, Used to create a user based on the primary data model on the body section
//Example Route Link: localhost:3000/primarydata/
// Example of the body request will be in the readme for the backend
router.post("/", (req, res, next) => { 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
// update any field of a client uses same bosy as the create client api
// uses the primary data collection schema as a body request exept for not including client id in body
//Example Route Link: localhost:3000/primarydata/e8320710-4418-11ed-9e07-c35f33399c12
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id }, 
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


//Delete a client using id in a request body
// this will be linked to the remove user from all events api in the frontend
//Example Route Link: localhost:3000/primarydata/delete
//Example Body: {"id":"e8320710-4418-11ed-9e07-c35f33399c12"}
router.delete("/delete", (req, res, next) => {
    console.log(req.body.id)
    //  simple delete only one client from the collection using body id
    // this should go after the update many events in eventsData
    primarydata.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({"status": "Client has been deleted"});
        }
    });
});

module.exports = router;