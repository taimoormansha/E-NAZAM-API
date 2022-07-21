const express = require('express');

const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');
let app = express();

app.get('/', ()=>res.send('hi Taimoor'));

// Database
const connection = require('./config/db.config');

connection.once('open', ()=>console.log('Database connected Successfully'));
connection.on('error',(err)=>console.log('Error', err));

//Admin Bro and Models
const Customer = require('./models/Customer')
const Admin = require('./models/Admin')
const Teacher = require('./models/teacher.model.js')
const TeacherAttendance = require('./models/teacherAttendance.model.js')
const StudentFeeHistory = require('./models/studentFeeHistory.model')
const StudentAttendance = require('./models/studentAttendance.model')
const Student = require('./models/student.model')
const Shobajaat = require('./models/shobajaat.model')
const Scholarship = require('./models/scholarship.model')
const Result = require('./models/result.model')
const Requester = require('./models/Requester.model')
const Expendetures = require('./models/Expendetues.model')
const DonationsOffline = require('./models/donations.model')
const Darjaat = require('./models/darjaat.model')
const Course = require('./models/course.model')
const test= require('./models/test')

//const Fyp = require('./models/Fyp');
const school =require('./models/School.model')

AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {
  resources: [{resource: Admin, options: {listProperties:['name' , 'email'] }}, Customer, Teacher, TeacherAttendance ,StudentFeeHistory, StudentAttendance, Student, Shobajaat, Scholarship, Result, Requester, Expendetures, DonationsOffline, Darjaat, Course, school, test],
  rootPath: '/enazam',
  branding: {
    companyName: 'E-NAZAM',
  }
}

const AdminBroOptions1 = {
  resources: [{resource: Admin, options: {listProperties:['name' , 'email'] }}, Customer, Teacher, TeacherAttendance ,StudentFeeHistory, StudentAttendance, Student, Shobajaat, Scholarship, Result, Requester, Expendetures, DonationsOffline, Darjaat, Course, school],
  rootPath: '/test',
  branding: {
    companyName: 'E-NAZAM',
  }
}

const name = "Helow World";

function StrinReverse(name)
{
   for(var i= name.length(); i>=0 ;i++)
   {
     console.log(name[i]);
   }
}


const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)

const adminBro1 = new AdminBro(AdminBroOptions1)
const router1 = expressAdminBro.buildRouter(adminBro1)



app.use(adminBro.options.rootPath, router)
app.use(adminBro1.options.rootPath, router1)

app.listen(8001, ()=>console.log('Listening at Port 8000'));


