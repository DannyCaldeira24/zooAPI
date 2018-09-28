'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image/:imageFile', UserController.getImageFile);
api.get('/get-keepers', UserController.getKeepers);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;