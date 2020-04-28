var mongo = require("mongodb");
var express = require("express");
var expapp = express();
var myDB;
var req;
var res;
function testconnect(err, client) {
  myDB = client.db("kodandaramaih");
  if (err) {
    console.error(err.name);
    console.error(err.stack);
  } else console.log("Connected to db.....");
  console.log("Client info : " + client);
}
mongo.MongoClient.connect(
  "mongodb://localhost:27017/kodandaramaih?retryWrites=true&w=majority",
  testconnect
);

function querryresult(err, result) {
  var h = "<html><body>";
  //console.log('----------' + result.length);

  for (i = 0; i < result.length; i++) {
    h += "<b>First Name </b>" + result[i].name + "<BR>";
    h += "<b>Project Name </b>" + result[i].major + "<br><br>";
    //console.log(doc.First_Name + ', ' + doc.Project_Name);
  }
  h += "</body></html>";
  res.send(h);
}
function getEmployees(request, response) {
  const cursor = myDB.collection("students").find();
  //response.send(cursor);

  //console.log(cursor);
  req = request;
  res = response;
  cursor.toArray(querryresult);
}

//Handling Read operation of CRUD
expapp.get("/", getEmployees);
expapp.listen(8081);

/*const mysqlconn=mysql.createConnection
({host:'localhost', port : '3306', user:'root', password:'temp@001', database : 'mysql'});

function testconn(err){
    console.log(err);
    if(err)
        console.log('Unable to connect to the database...');
    else
        console.log('Connected sussessfully....');
}
var req;
var res;
mysqlconn.connect(testconn);
function printEmployees(err,  rows){ //Call back function

    res.send(rows);
}
function getAllEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    mysqlconn.query
        ('select * from employee', printEmployees); //Static SQL
}
function getEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    if(<condition>)
    processEmpID();
    if(<condition>)
        processMobNo();
    //?  is a substitution operator. Substitution happends in NodeJS environment
    mysqlconn.query
    ('select * from employee where emp_id = ? ', [request.params.empid], 
    printEmployees); //Static SQL
}
function getFewEmployee(request, response) //Call back function
{
    req=request;
    res=response;
    //qry='select * from employee where emp_id > ? and emp_id < ?', 
    //[request.params.empid1, request.params.empid2];

    mysqlconn.query('select * from employee where emp_id > ? and emp_id < ?', 
    [request.params.empid1, request.params.empid2], printEmployees); //Static SQL
}
function errorCheck(err){
    if(err)
        console.error('Error in procedure call');
    else
        console.log('Procedure executed successfully...');
}
function updateEmployee(request,response)
{
    req=request;
    res=response;

    mysqlconn.query('CALL UpdEmployee(?, ?)', [request.params.empid, request.params.mobno], 
    errorCheck);
    response.send("<HTML><BODY><B>Updated</B></body></html>");
}
expapp.get('/', getAllEmployee);
expapp.get('/:empid', getEmployee);
expapp.get('/:empid1/:empid2', getFewEmployee);
expapp.get('/UpdateEmployee/:empid/:mobno', updateEmployee);
expapp.listen(8081);
console.log('Server started @ port 8081');*/
