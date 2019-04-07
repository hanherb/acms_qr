const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongodb = require('mongodb');
const mongo = require('./src/mongo-connect');
const rf = require('./src/route-function');

const router = express.Router();

router.route('/').get(function(req, res) {rf.redirectIndex(req, res)});

router.route('/get-user').get(function(req, res) {rf.getUser(req, res)});

router.route('/get-log').get(function(req, res) {rf.getLog(req, res)});

router.route('/register-user').post(function(req, res) {rf.registerUser(req, res)});

router.route('/login-user').post(function(req, res) {rf.loginUser(req, res)});

router.route('/send-email').post(function(req, res) {rf.sendEmail(req, res)});

router.route('/get-bio').get(function(req, res) {rf.getBio(req, res)});

router.route('/add-bio').post(function(req, res) {rf.addBio(req, res)});

router.route('/logout').get(function(req, res) {rf.logout(req, res)});

module.exports = router;