'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var md_auth = require('../middlewares/auth');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal', md_auth.ensureAuth, AnimalController.saveAnimal);
api.get('/get-animals', AnimalController.getAnimals);
api.get('/get-animal/:id', AnimalController.getAnimals);

module.exports = api;