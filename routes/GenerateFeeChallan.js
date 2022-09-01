const router = require("express").Router();
const FeeHistory = require("../models/FeeHistory");
const Student = require("../models/Student")
const Shobajaat = require('../models/Shobajaat');
const Scholarship = require('../models/Scholarship');
const fetchuser = require("../middleware/fetchuser");

//Auto Generate Challans
router.get("/", fetchuser, async (req, res) => {
    var yy = new Date().toISOString().split('-')[0], mm = new Date().toISOString().split('-')[1];
    var startingMonth = yy + "-" + mm + "-01T00:00:00.001Z";
    var endingMonth = yy + "-" + mm + "-" + new Date(yy, mm, 0).getDate().toString() + "T23:59:59.999Z"; //Month Range

    try {
       
        const FeeHistoryList = await FeeHistory.findOne({ createdAt: { $gte: startingMonth, $lte: endingMonth } }); //if monthly challan exist        

        if (FeeHistoryList === null) {
            var allStudentRecord = await Student.find({ isActive: "student" }); //total active students   
            var newChallan = new FeeHistory();
            var challanlist = [];
            var temp;            

            for (var i = 0; i < allStudentRecord.length; i++) {
                newChallan.rollNo = allStudentRecord[i].rollno;
                newChallan.name = allStudentRecord[i].name;

                temp = await Shobajaat.findOne({ $and: [{ isActive: 'Active' }, { shobaName: allStudentRecord[i].shobaName }] }).select({ fee: 1 })
                newChallan.totalFee = newChallan.Fee = temp.fee;


                if (!(allStudentRecord[i].scholarship === "NA")) //If Scholarship is guaranted    
                {
                    temp = await Scholarship.findOne({ scholarshipTitle: allStudentRecord[i].scholarship }).select({ stipendPercent: 1 });
                    //console.log(temp.stipendPercent);
                    newChallan.Discount = newChallan.totalFee * (temp.stipendPercent / 100.0);
                    newChallan.totalFee -= newChallan.Discount; //totalFee = totalFee - scholarship

                    if (newChallan.totalFee === 0) //if total fee is 0
                        newChallan.isPaid = 'Paid';
                }

                challanlist[i] = await newChallan.save(); //save the data into db
                newChallan = new FeeHistory();  //flash the object

            }
            res.status(200).json(challanlist);
        }
        else {
            // alert("Already Generated this month( "+ (FeeHistoryList.createdAt.getMonth() + 1) + " ) challans");
            res.status(200).json("Already Generated this month challans");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;