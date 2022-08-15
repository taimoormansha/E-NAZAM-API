const router = require("express").Router();
const fetchuser = require("../middleware/fetchuser");

//ALL Routes
const MaddarasaInfo = require('../models/MaddarasaInfo');           //Maddarasa
const Student = require('../models/Student');                       //Student
const StudentAttendance = require('../models/StudentAttendance');
const StudentContacts = require('../models/StudentContacts');
const FeeHistory = require('../models/FeeHistory');
const Scholarship = require('../models/Scholarship');
const MonthlyExamsResult = require('../models/MonthlyExamsResults');
const TerminalExamsResults = require('../models/TerminalExamsResults');
const Teacher = require('../models/Teacher');                        //Teacher
const TeacherAttandance = require('../models/TeacherAttendance');
const Shobajaat = require('../models/Shobajaat');                    //Departments
const Courses = require('../models/Courses');
const Darjaat = require('../models/Darjaat');
const Donations = require('../models/Donations');                    //Others
const Requesters = require('../models/Requesters');
const Expendetures = require('../models/Expendetures');


router.get("/", fetchuser, async (req, res) => {
    var dashboard = [];
    var data, temp, temp1 = [], Sum = 0;
    var yy = new Date().toISOString().split('-')[0], mm = new Date().toISOString().split('-')[1];

    var startingDate = new Date().toISOString().split('T')[0] + "T00:00:00.001Z";  //  Day time range
    var endingDate = new Date().toISOString().split('T')[0] + "T23:59:59.999Z";

    var startingMonth = yy + "-" + mm + "-01T00:00:00.001Z";
    var endingMonth = yy + "-" + mm + "-" + new Date(yy, mm, 0).getDate().toString() + "T23:59:59.999Z"; //Month Range

    var startingYear = yy + "-01-01T00:00:00.001Z";
    var endingYear = yy + "-12-" + new Date(yy, 12, 0).getDate().toString() + "T23:59:59.999Z"; //Year Range

    try {
        //Student  
        temp = await Student.find({ isActive: "student" }); //total active student
        dashboard[0] = temp.length; //sum 
        dashboard[1] = temp;        //data

        temp = await StudentAttendance.find({ $and: [{ isPresent: "Present" }, { createdAt: { $gte: startingDate, $lte: endingDate } }] }); //Today present student
        dashboard[2] = temp.length;

        for (var i = 0; i < temp.length; i++) //Today present student data
            temp1[i] = await Student.findOne({ rollno: temp[i].rollNo });
        dashboard[3] = temp1;        //data
        temp1 = []; //flash the array

        temp = await StudentAttendance.find({ $and: [{ isPresent: "Absent" }, { createdAt: { $gte: startingDate, $lte: endingDate } }] }); //Today Absent student
        dashboard[4] = temp.length; //sum         

        for (var i = 0; i < temp.length; i++)                            //Today absent student data
            temp1[i] = await Student.findOne({ rollno: temp[i].rollNo });
        dashboard[5] = temp1;
        temp1 = []; //flash the array

        //Teacher and staff
        temp = await Teacher.find({ isActive: "Yes" }) //total active Teacher
        dashboard[6] = temp.length; //sum 
        dashboard[7] = temp;        //data

        temp = await TeacherAttandance.find({ $and: [{ isPresent: "Present" }, { createdAt: { $gte: startingDate, $lte: endingDate } }] });//Today present staff
        dashboard[8] = temp.length; //sum

        for (var i = 0; i < temp.length; i++) //Today present staff data
            temp1[i] = await Teacher.findOne({ teacherID: temp[i].teacherID });
        dashboard[9] = temp1;        //data
        temp1 = []; //flash the array

        temp = await TeacherAttandance.find({ $and: [{ isPresent: "Absent" }, { createdAt: { $gte: startingDate, $lte: endingDate } }] }); //Today Absent staff
        dashboard[10] = temp.length; //sum         

        for (var i = 0; i < temp.length; i++) //Today absent staff data
            temp1[i] = await Teacher.findOne({ teacherID: temp[i].teacherID });
        dashboard[11] = temp1;
        temp1 = []; //flash the array

        //Quranic Request
        temp = await Requesters.find({ createdAt: { $gte: startingDate, $lte: endingDate } }); //today all requests
        dashboard[12] = temp.length; //Sum
        dashboard[13] = temp //Data

        temp = await Requesters.find({ createdAt: { $gte: startingMonth, $lte: endingMonth } }); //this month
        dashboard[14] = temp.length; //Sum
        dashboard[15] = temp //Data

        temp = await Requesters.find({ createdAt: { $gte: startingYear, $lte: endingYear } });  //this year
        dashboard[16] = temp.length; //Sum
        dashboard[17] = temp //Data

        //Expendetures
        temp = await Expendetures.find({ createdAt: { $gte: startingDate, $lte: endingDate } });//this day        
        temp.map((n) => Sum += n.totalPrice);
        dashboard[18] = Sum; Sum = 0;  //this day Expendetures sum
        dashboard[19] = temp; ////this day Expendetures data

        temp = await Expendetures.find({ createdAt: { $gte: startingMonth, $lte: endingMonth } });//this month
        temp.map((n) => Sum += n.totalPrice);
        dashboard[20] = Sum; Sum = 0; ////this month Expendetures sum
        dashboard[21] = temp; ////this month  Expendetures data

        temp = await Expendetures.find({ createdAt: { $gte: startingYear, $lte: endingYear } }) //this year
        temp.map((n) => Sum += n.totalPrice);
        dashboard[22] = Sum; Sum = 0; ////This Year Expendetures Sum
        dashboard[23] = temp; ////this year Expendetures data

        //Donations
        temp = await Donations.find({ createdAt: { $gte: startingDate, $lte: endingDate } });//this day        
        temp.map((n) => Sum += n.donateRS);
        dashboard[24] = Sum; Sum = 0;  //this day Donations sum
        dashboard[25] = temp; ////this day Donations data

        temp = await Donations.find({ createdAt: { $gte: startingMonth, $lte: endingMonth } });//this month
        temp.map((n) => Sum += n.donateRS);
        dashboard[26] = Sum; Sum = 0; ////this month Donations sum
        dashboard[27] = temp; ////this month  Donations data

        temp = await Donations.find({ createdAt: { $gte: startingYear, $lte: endingYear } }) //this year
        temp.map((n) => Sum += n.donateRS);
        dashboard[28] = Sum; Sum = 0; ////This Year Donations Sum
        dashboard[29] = temp; ////this year Donations data

        temp = await FeeHistory.find({ createdAt: { $gte: startingMonth, $lte: endingMonth } });//this month                
        if (temp === null) {
            dashboard[30] = 0; ////this month TotalFee 0            
        }
        else{
            temp.map((n) => Sum += n.totalFee);
            dashboard[30] = Sum; Sum = 0; ////this month TotalFee sum
        }

        temp = await FeeHistory.find({$and: [{ createdAt: { $gte: startingMonth, $lte: endingMonth } },{isPaid:'Paid'}]});//this month  fee paid data          
        if (temp === null) {
            dashboard[31] = 0; ////this month received fee if 0            
        }
        else{
            temp.map((n) => Sum += n.paidFee);
            dashboard[31] = Sum; Sum = 0; ////this month Received Fee sum
        }
        dashboard[32] = temp;  //paid fee challan data


        temp = await FeeHistory.find({$and: [{ createdAt: { $gte: startingMonth, $lte: endingMonth } },{isPaid:'UnPaid'}]});//this month unpaid fee data           
        if (temp === null) {
            dashboard[33] = 0; ////this month receiveable fee if 0            
        }
        else{
            temp.map((n) => Sum += n.totalFee);
            dashboard[33] = Sum; Sum = 0; ////this month Receiveable Fee sum
        }        
        dashboard[34] = temp;  // unpaid fee challan data


        data = {
            //Student
            "totalStudentSum": dashboard[0],
            "totalStudentData": dashboard[1],

            "presentStudentSum": dashboard[2],
            "presentStudentData": dashboard[3],

            "absentStudentSum": dashboard[4],
            "absentStudentData": dashboard[5],

            //Teacher
            "totalStaffSum": dashboard[6],
            "totalStaffData": dashboard[7],

            "totalPresentStaffSum": dashboard[8],
            "totalPresentStaffData": dashboard[9],

            "totalAbsentStaffSum": dashboard[10],
            "totalAbsentStaffData": dashboard[11],

            //Quranic Requests
            "todayRequestsSum": dashboard[12],
            "todayRequestsData": dashboard[13],

            "monthlyRequestsSum": dashboard[14],
            "monthlyRequestsData": dashboard[15],

            "anuallyRequestsSum": dashboard[16],
            "anuallyRequestsData": dashboard[17],

            //Expendetures
            "dailyExpendeturesSum": dashboard[18],
            "dailyExpendeturesData": dashboard[19],

            "monthlyExpendeturesSum": dashboard[20],
            "monthlyExpendeturesData": dashboard[21],

            "anuallyExpendeturesSum": dashboard[22],
            "anuallyExpendeturesData": dashboard[23],

            //Donations
            "dailyDonationSum": dashboard[24],
            "dailyDonationData": dashboard[25],

            "monthlyDonationSum": dashboard[26],
            "monthlyDonationData": dashboard[27],

            "anuallyDonationSum": dashboard[28],
            "anuallyDonationData": dashboard[29],

            //Fee
            "expectedFeeSum": dashboard[30],

            "receivedFeeSum": dashboard[31],
            "receivedFeeSData": dashboard[32],

            "remainingFeeSum": dashboard[33],
            "remainingFeeData": dashboard[34],

        };
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;