const express = require('express');
let app = express();
app.use(express.json())
const mongoose = require("mongoose");
var cors = require('cors')              //used to solve api call problem with axios in react

//ALL Routes
const MaddarasaInfo = require('./routes/MaddarasaInfo');           //Maddarasa
const Student = require('./routes/Student');                       //Student
const StudentAttendance = require('./routes/StudentAttendance');
const StudentContacts = require('./routes/StudentContacts');
const FeeHistory = require('./routes/FeeHistory');
const Scholarship = require('./routes/Scholarship');
const MonthlyExamsResult = require('./routes/MonthlyExamsResult');
const TerminalExamsResults = require('./routes/TerminalExamsResults');
const Teacher = require('./routes/Teacher');                        //Teacher
const TeacherAttandance = require('./routes/TeacherAttandance');
const Shobajaat = require('./routes/Shobajaat');                    //Departments
const Courses = require('./routes/Courses');
const Darjaat = require('./routes/Darjaat');
const Donations = require('./routes/Donations');                    //Others
const Requesters = require('./routes/Requesters');
const Expendetures = require('./routes/Expendetures');
const GenerateFeeChallans = require('./routes/GenerateFeeChallan');

const DashboardApi = require('./routes/DashboardApi');              //Dashboard Api

// Database
const connection = require('./config/db.config');
connection.once('open', ()=>console.log('Database connected Successfully'));
connection.on('error',(err)=>console.log('Error', err));

app.use(cors()) // Use this after the variable declaration

//Routes path set
app.use("/student", Student);
app.use("/teacher", Teacher);
app.use("/teacherAttendance", TeacherAttandance);
app.use("/courses", Courses);
app.use("/expendetures", Expendetures);
app.use("/shobajaat", Shobajaat);
app.use("/darjaat", Darjaat);
app.use("/donations", Donations);
app.use("/requesters", Requesters);
app.use("/StdContacts", StudentContacts);
app.use("/MaddarasaInfo", MaddarasaInfo);
app.use("/StudentAttendance", StudentAttendance);
app.use("/FeeHistory", FeeHistory);
app.use("/Scholarship", Scholarship);
app.use("/MonthlyExamsResult", MonthlyExamsResult);
app.use("/TerminalExamsResults", TerminalExamsResults);
app.use("/GenerateFeeChallans" , GenerateFeeChallans);

app.use("/DashboardApi", DashboardApi);


app.listen(8001, ()=>console.log('Listening at Port 8001'));



