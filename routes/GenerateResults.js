const router = require("express").Router();
const FeeHistory = require("../models/FeeHistory");
const Student = require("../models/Student")
const Shobajaat = require('../models/Shobajaat');
const Scholarship = require('../models/Scholarship');

const result = require('../models/Result');
const courses = require('../models/Courses')

const fetchuser = require("../middleware/fetchuser");

//Auto Generate Challans
router.get("/", fetchuser , async (req, res) => {
    var yy = new Date().toISOString().split('-')[0], mm = new Date().toISOString().split('-')[1];
    var startingMonth = yy + "-" + mm + "-01T00:00:00.001Z";
    var endingMonth = yy + "-" + mm + "-" + new Date(yy, mm, 0).getDate().toString() + "T23:59:59.999Z"; //Month Range

    try {

        const response = await result.findOne({ createdAt: { $gte: startingMonth, $lte: endingMonth } }); //if monthly challan exist        

        if (response === null) {
            var allStudentRecord = await Student.find({ isActive: "student" }); //total active students               
            var newResult = new result();
            var resultList = [];            
            var temp = {};

            for (var i = 0; i < allStudentRecord.length; i++) {
                newResult.rollNo = allStudentRecord[i].rollno;
                newResult.name = allStudentRecord[i].name;
                newResult.fatherName = allStudentRecord[i].fatherName;
                newResult.shobaName = allStudentRecord[i].shobaName;


                const subjects = await courses.find({ shoba: allStudentRecord[i].shobaName });
                
                for (let j = 0; j < subjects.length; j++) 
                {     
                   // newResult.StudentResults.courseTitle[j]
                    console.log(subjects[j].courseTitle) 
                    temp.courseTitle = subjects[j].courseTitle;
                    temp.totalMarks = subjects[j].totalMarks;
                   
                    newResult.StudentResults[j] = temp;
                    temp = {}; //flash the temp
                  
                }
               
               // resultList[i] = newResult;
               resultList[i] = await newResult.save(); //save the data into db              
               newResult =  new result();  //flash the object

            }
            res.status(200).json(resultList);
        }
        else {

            res.status(200).json("Already Generated Monthly Result");
        }

    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;