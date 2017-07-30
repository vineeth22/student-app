"use strict";
const MongoClient = require("mongodb").MongoClient,
    assert = require("assert");
const url = require("./dbconfig").url;

/** @module dbFunctions */

/**
 * @typedef student
 * @type {object}
 * @property {string} id
 * @property {string} name
 * @property {string} department
 */

/**
 * @callback resultCallback
 * @param {string} result
 */

/**
 * @function insertStudent
 * @name insertStudent
 * @param {student} student
 * @param {resultCallback} func
 */

const insertStudent = (student, func) => {

    MongoClient.connect(url, (err, db) => {

        assert.equal(null, err);
        db.collection("student").find({"id": student.id}).
            toArray((err, result) => {

                assert.equal(null, err);

                if (result.length === 0) {

                    db.collection("student").insertOne(student, (err, result) => {

                        assert.equal(null, err);
                        assert.equal(1, result.insertedCount);
                        func("done");

                    });

                } else {

                    func("Student Id already used");

                }

            });

    });


};


/**
 * @function
 * @name getStudent
 * @param {string} id 
 * @param {resultCallback} func
 */

const getStudent = (id, func) => {

    const data = { id };

    MongoClient.connect(url, (err, db) => {

        assert.equal(null, err);
        db.collection("student").find(data, {"_id": 0}).
            toArray((err, result) => {

                assert.equal(null, err);

                if (result.length === 0) {

                    func("error");

                } else {

                    func(result);

                }

            });

    });

};

module.exports.insertStudent = insertStudent;
module.exports.getStudent = getStudent;
