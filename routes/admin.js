var express = require("express");
var router = express.Router();
var db = require("../dbconnector/connection");



// SELECT login.*,AWS01.date FROM login inner join AWS01 ON AWS01.empi_id=login.emp_id WHERE login.emp_id=1