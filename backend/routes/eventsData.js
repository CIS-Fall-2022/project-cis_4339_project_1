const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 
const { route } = require("./primaryData");

//GET all entries depending on organization
//Example Route Link: localhost:3000/eventdata
//Example Body: {"id":"(EventID)" }
router.get("/", (req, res, next) => { 
    eventdata.find( {organization: req.body.id},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single event by its ID
//Example Route Link: localhost:3000/eventdata/(EventID)
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET events based on search query
//Example Route Link: localhost:3000/eventdata/search/?eventName=Food&searchBy=name' 
//Request body Example {"id":"0acad70-42ae-11ed-9419-f17976354230"}
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" }, organization: req.body.id }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"], organization: req.body.id
        }
    };
    eventdata.find( 
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

//GET events for which a client is signed up
//Route Link: localhost:3000/eventdata/client/(ClientID)
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST, Create a new Event
//// Body example will be included in the readme of the backend
//Example Route Link: localhost:3000/eventdata/
router.post("/", (req, res, next) => { 
    eventdata.create( 
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

//PUT, Updates the event via a body request
// Body example will be included in the readme of the backend - dont include event id in body
//Example Route Link: localhost:3000/eventdata/(EventID)
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
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

//PUT add attendee to event
//Example Route Link: localhost:3000/eventdata/addAttendee/event_id_goes_here
//Example Body: {"id":"(attendeeID)"}
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed up
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                console.log(error)
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//Delete an event based on event id using body request
//Route Link: localhost:3000/eventdata/delete
//Example Body: {"id":"EventID"}
router.delete("/delete", (req, res, next) => {
    eventdata.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({ "status": "Event has been deleted" });
        }
    });
});


// remove a client from an event, uses params since body does not work in this route
//user client id in the link
//Route Link: localhost:3000/eventdata/removeuser/User_ID_goes_here
router.put("/removeuser/:id", (req, res, next) => {
    console.log(req.params.id)
    eventdata.updateOne({_id: req.params.id},
     { $pull: { attendees: req.body.id } }, 
     (error, data) =>{
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

//remove a client from all events, used in conjunction with delete client
// will deal with both requests in frontend but for now this request should go first and then the delete client
//Route Link: localhost:3000/eventdata/removeclient
//Example Body: {"id":"UserID"}
router.delete("/removeclient", (req, res, next) => {
    console.log(req.body.id)
    eventdata.updateMany({},
     { $pull: { attendees: req.body.id } }, 
     (error, data) =>{
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});





module.exports = router;