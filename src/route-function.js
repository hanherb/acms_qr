const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mongodb = require('mongodb');
const mongo = require('./mongo-connect');
const nodemailer = require('nodemailer');

const registerPlugin = require('../plugin/register/register');
const loginPlugin = require('../plugin/login/login');

app.use(cookieParser());

exports.redirectIndex = function(req, res) {
	var currentUrl = 'https://' + req.get('host').split(":")[0];
	res.redirect(currentUrl + ':8080/')
}

exports.getUser = function(req, res) {
	res.json(1);
}

exports.getLog = function(req, res) {
	console.log("kuda");
	mongo.mongoLogger("find", {}, function(response) {
		res.json(response);
	});
}

exports.registerUser = function(req, res) {
	registerPlugin.register(req, res);
}

exports.loginUser = function(req, res) {
	loginPlugin.login(req, res);
}

exports.sendEmail = function(req, res) {
	let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'hanindyo.herbowo@gmail.com',
	    pass: 'kucisicung11'
	  }
	});

	let text = 'Full Name: ' + req.body[0].fullname + '\n' +
		'Age: ' + req.body[0].age + '\n' +
		'Sex: ' + req.body[0].sex + '\n' +
		'QR Code: ' + req.body[0].result + '.';

	let mailOptions = {
	  from: 'hanindyo.herbowo@gmail.com',
	  // to: 'daa.isme@gmail.com, ' + req.body[0].email,
	  to: req.body[0].email,
	  subject: 'This is your biodata',
	  text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	    res.json(1);
	  }
	});
}

exports.getBio = function(req, res) {
	mongo.mongoBio("find", {}, function(response) {
		res.json(response);
	});
}

exports.addBio = function(req, res) {
	if(req.body[0]) {
		mongo.mongoBio("insert", req.body, function(response) {
			res.json(response);
		});
	}
	else {
		res.end();
	}
}

exports.logout = function(req, res) {
	res.json(1);
}