"use strict";
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const db = require("./lib/dbFunctions");
const port = 3000;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({type: "application/json"}));

app.use(express.static("public"));

/**
 * @typedef student
 * @type {object}
 * @property {string} id
 * @property {string} name
 * @property {string} department
 */

/**
 * @function /insertStudent
 * @name insertStudent
 * @param {student} student
 * @return {string} result
 */

app.post("/insertStudent", (req, res) => {

    const student = req.body;
    db.insertStudent(student, (result) => {

        res.status(200).send(result);

    });

});

/**
 * @function
 * @name getStudent
 * @param {string} id 
 * @return {student} result
 */

app.get("/getStudent", (req, res) => {

    const id = req.query.id;
    db.getStudent(id, (result) => {

        res.send(result);

    });

});

app.listen(port);
