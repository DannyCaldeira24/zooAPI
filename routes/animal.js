'use strict'

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();
var md_auth = require('../middlewares/auth');
var md_admin = require('../middlewares/admin');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal', [md_auth.ensureAuth,md_admin.isAdmin], AnimalController.saveAnimal);
api.put('/animal/:id', [md_auth.ensureAuth,md_admin.isAdmin], AnimalController.updateAnimal);
api.delete('/animal/:id', [md_auth.ensureAuth,md_admin.isAdmin], AnimalController.deleteAnimal);
api.post('/upload-image-animal/:id', [md_auth.ensureAuth, md_upload, md_admin.isAdmin], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.get('/animals', AnimalController.getAnimals);
api.get('/get-animal/:id', AnimalController.getAnimal);

module.exports = api;