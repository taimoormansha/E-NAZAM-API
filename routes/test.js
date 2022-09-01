const router = require("express").Router();

const Student = require("../models/Student")
const Courses = require("../models/Courses")
const Result = require("../models/Result")
const fetchuser = require("../middleware/fetchuser");


//Auto Generate Results
router.get("/", async (req, res) => {
    var yy = new Date().toISOString().split('-')[0], mm = new Date().toISOString().split('-')[1];
    var startingMonth = yy + "-" + mm + "-01T00:00:00.001Z";
    var endingMonth = yy + "-" + mm + "-" + new Date(yy, mm, 0).getDate().toString() + "T23:59:59.999Z"; //Month Range

    try {
        const ResultListMonthly = await Result.findOne({ createdAt: { $gte: startingMonth, $lte: endingMonth } }); //if monthly Results exist        

        if (ResultListMonthly == null) {
            console.log("No Results");
            var allStudentRecord = await Student.find({ isActive: "student" }); //total active students   
            var newResult = new Results();
            var resultList = [];
            var temp;

            for (var i = 0; i < allStudentRecord.length; i++) {

                newResult.rollNo = allStudentRecord[i].rollno;
                newResult.name = allStudentRecord[i].name;
                newResult.fatherName = allStudentRecord[i].fatherName;
                newResult.shobaName = allStudentRecord[i].shobaName;

                temp = await Courses.find({ shoba: newResult.shobaName })
                for (var j = 0; j < temp.length; j++) {
                    newResult.results[j].courseTitle = temp.courseTitle[j];
                    newResult.results[j].totalMarks = temp.totalMarks[j];
                    newResult.results[j].obtainedMarks = 0;
                }

                resultList[i] = await newResult.save(); //save the data into db
                newResult = new Results();  //flash the object

            }

            res.status(200).json(resultList);
        }
        else {
            // alert("Already Generated this month( "+ (ResultListMonthly.createdAt.getMonth() + 1) + " ) challans");
            res.status(200).json(`Already Generated this month Results`);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;