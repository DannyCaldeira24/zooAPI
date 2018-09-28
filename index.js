'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var PORT = process.env.PORT || 0;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo_db', { useNewUrlParser: true })
		.then(()=>{
			console.log('La conexión a la base de datos zoo se ha realizado correctamente..');
			let server = app.listen(PORT, () => {
			    var host = server.address().address;
			    var port = server.address().port;
			    console.log('http://localhost:%s', port);
			}); 
		})
		.catch(err => console.log(err));
