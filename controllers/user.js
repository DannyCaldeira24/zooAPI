'use strict'
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');

//service jwt
var jwt = require('../services/jwt');

//acciones
function pruebas(req, res){
	res.status(200).send({
		message: 'Probando el controlador de usuario y la acción pruebas',
		user:req.user
	});
}

function saveUser(req,res){
	//Crear objeto usuario
	var user = new User();
	//Recoger parametros de la petición
	var params = req.body;

	if(params.password && params.name && params.surname && params.email){
		//Asignar valores al objeto user
		user.name = params.name;
		user.surname = params.surname;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;
		//Verificar si no es usuario duplicado
		User.findOne({email: user.email.toLowerCase()}, (err, issetuser) => {
			if(err){
				res.status(500).send({message:'Error al comprobar el usuario'});
			}else{
				if(!issetuser){
					//Cifrar password
						//console.log(params);
					bcrypt.hash(params.password,null,null,function(err, hash){
						user.password = hash;
						//Guardo usuario en DB
						user.save((err,userStored) => {
							if(err){
								res.status(500).send({message: 'ERROR: No se logro guardar el Usuario'});					
							}else{
								if(!userStored){
									res.status(404).send({message: 'ERROR: No se ha registrado el Usuario'});
								}else{
									res.status(200).send({user:userStored});
								}
							}	
						});
					});
				}else{
					res.status(500).send({message: 'ERROR: Ya existe un usuario con este correo electronico'});
				}
			}
		});
	}else{
		res.status(200).send({
			message: 'Introduce los datos correctamente para poder registrar al usuario'
		});
	} 
}

function login(req,res){
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err, user) => {
		if(err){
			res.status(500).send({message:'Error al comprobar el usuario'});
		}else{
			if(user){
				bcrypt.compare(password, user.password, (err,check) =>{
					if(check){
						if(params.gettoken){
							//devolver token jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
					res.status(404).send({
						message: 'Clave invalida'
					});
					}
				});
			}else{
				res.status(404).send({
					message: 'Correo invalido'
				});
			}
		}
	});

}

function updateUser(req,res){
	var userId = req.params.id;
	var update = req.body;

	if(userId != req.user.sub){
		return res.status(500).send({message:'No tienes permiso para actualizar el usuario'});
	}

	User.findByIdAndUpdate(userId, update, {new:true}, (err,userUpdated) =>{
		if(err){
			res.status(500).send({
				message: 'ERROR: Algo malo ha ocurrido'
			});
		}else{
			if(!userUpdated){
				return res.status(404).send({message:'ERROR: No se logro actualizar su usuario'});
			}else{
				res.status(200).send({user:userUpdated});
			}
		}
	});

}

module.exports={
	pruebas,
	saveUser,
	login,
	updateUser
}