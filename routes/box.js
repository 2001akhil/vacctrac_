const { Console, table } = require('console');
const cons = require('consolidate');
const { resolveSoa } = require('dns');
var express = require('express');
const { response } = require('../app');
var express = require('express');
var box = express.Router();
const login = require("../box/box_login");
var db = require("../dbconnector/connection");

box.get("/login_box", (req, res) => {
  res.render("box/updated/login");
});
box.post("/login_box", async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.pasw;
    const datas = await login(name, password);
    if (datas.status == "set") {
      req.session.loggedin = true;
      req.session.datas = datas.datas;
      let names = req.session.datas.name;
      res.redirect("box/updated/home");
    } else {
      res.render("/login_box");
    }
  } catch (err) {
    console.log(err);
    res.render("box/updated/login");
  }
});

box.get("/index", (req, res) => {
  res.render("box/updated/index");
});





module.exports=box;