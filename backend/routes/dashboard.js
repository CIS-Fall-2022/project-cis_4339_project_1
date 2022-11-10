const express = require("express");
const router = express.Router();
let { eventdata } = require("../models/models"); 
const orgID = process.env.ORG_ID;


//https://bobbyhadz.com/blog/javascript-date-subtract-months
/* I found this function to subtract months online, 
it gets the number of months you want to subtract and the current date and 
returns the result as a date value to use in the aggregate query*/
function subtractMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
  
    return  date;
}


// GET, this route gets all events of a company as well as how many attendees are attending
// Source https://stackoverflow.com/questions/21387969/mongodb-count-the-number-of-items-in-an-array
//Route Link: localhost:3000/dashboard/
router.get("/", (req, res, next) => {

    // current date
    var currDate = new Date();

    // 2 months prior, Uses SubtractMonths function
    const pastDate = subtractMonths(2);

    eventdata.aggregate([
    // used a combined query only selecting the events that are from a certain company AND is between todays date and 2 months prior
    // Also added functionality to not return events that do not have attendees found in the link below
    // https://www.mongodb.com/community/forums/t/is-there-a-way-to-query-array-fields-with-size-greater-than-some-specified-value/54597
    {$match: {$and:[{organization: orgID},{date:{$gt:pastDate, $lt:currDate}}, {"attendees.0": {$exists: true}}]}},
    // projecting all fields in case they are needed in the frontend along with count of attendees
    {$project: { _id: 1, eventName: 1, count: { $size:"$attendees" }}}],
    (error, data) =>{
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;