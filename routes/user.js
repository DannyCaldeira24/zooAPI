'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/auth');

api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;