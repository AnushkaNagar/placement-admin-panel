var express = require('express');
var app = express();
var router = express.Router();
var conn = require('./dbconnection');
var bodyParser = require('body-parser');
var sql = require("mssql");
var Request = require('tedious').Request;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

router.get('/', function (req, res) {
    res.render('index', { layout: false });
});

router.post('/companyDetails', function (req, res) {
    //var json = req.body;
    console.log(req.body);
    var company_name = req.body.company_name;
    var job_profile = req.body.job_profile;
    var job_description = req.body.job_description;
    var package_details = req.body.package_details;
    var eligibility_criteria = req.body.eligibility_criteria;
    var eligible_branches = req.body.eligible_branches.join();
    //var open_year = req.body.open_year;
    var deadline = req.body.deadline;
    var req = new sql.Request(conn);
    req.query("INSERT INTO Company VALUES ('" + company_name + "', '" + job_profile + "', '" + job_description + "', '" + package_details + "', '" + eligibility_criteria + "', 1, '" + eligible_branches + "', '" + deadline + "')").then(function (recordset) {

    }).catch(function (err) {
        console.log(err);
    });
    //req.flash('success', 'The company drive details have been posted successfully!');
    res.redirect('/');
});

router.get('/companies', function (req, res) {
    var req = new sql.Request(conn);
    req.query("Select CompanyID,CompanyName,RoleOffered,Package,OpenBranch,Deadline from Company", function (err, recordset) {
        //req.flash('success', 'Data added successfully!')
        if (err) console.log(err)
        // render to companies.ejs
        res.render('companies', {
            title: 'Company List', 
            data: recordset.recordset,
            layout: false
        })
    })
})

router.get('/students', function (req, res) {
    var req = new sql.Request(conn);
    req.query("Select FirstName,LastName,PRN,Branch,CollegeCGPA,CompanyName from Application left join Student ON Application.StudentID=Student.StudentID left join Company ON Application.CompanyID=Company.CompanyID", function (err, recordset) {
        //req.flash('success', 'Data added successfully!')
        if (err) console.log(err)
        // render to companies.ejs
        res.render('students', {
            title: 'Student List', 
            data: recordset.recordset,
            layout: false
        })
    })
});

module.exports = router;