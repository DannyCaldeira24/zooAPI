'use strict'

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var app = require('./app');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
  
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/zoo_db';
// var PORT = process.env.PORT || 0;
app.set('port', process.env.PORT || 3000);
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, { useNewUrlParser: true })
		.then(()=>{
			console.log('La conexión a la base de datos zoo se ha realizado correctamente..');
			let server = app.listen(app.get('port'), () => {
			    var host = server.address().address;
			    var port = server.address().port;
			    console.log('http://localhost:%s', port);
			}); 
		})
		.catch(err => console.log(err));
