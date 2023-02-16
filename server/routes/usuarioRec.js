const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuarioRec');
const app = express();
var nodemailer = require('nodemailer');

 
  
  app.get('/usuarior', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Usuario.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok:true,
           msg: 'Lista de usuarios obtenida con exito',
           conteo: usuarios.length,
           usuarios
       });
    });
  });

  app.get('/usuarior/:email', function (req, res) {

    let idusuario = req.params.email;
  Usuario.findOne({email: idusuario})
  .exec((err, usuarios) =>{
     if(err) {
         return res.status(400).json({
             ok: false,
             msg: 'Ocurrio un error al momento de consultars',
             err 
         });
     } 

     res.json({
         ok:true,
         msg: 'usuario obtenida con exito',
         conteo: usuarios.length,
         usuarios
     });
  });
});
  
  app.post('/usuarior', function (req, res) {
    let body = req.body;
    let usr = new Usuario({
        //_id: req.body._id,
        nombre: body.nombre,
        apellidos: req.body.apellidos,
        email: body.email,
        password: body.password,
        rol: body.rol
    });
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'joan.montoya.1c@gmail.com', // generated ethereal user
          pass: 'xyhjpsulieliqpbu', // generated ethereal password
        },
      });

      
    
    usr.save((err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB
        });
        var mailOptions = {
            from: "Aplicacion Login de joan",
            to: usrDB.email,
            subject: "Recuperacion de contraseña",
            text: "Se ha registrado una recuperacion de contraseña, su contraseña es: ",
            html: "<div> <h1>Su contraseña es: "+usrDB.password+"</h1><p><a  href='https://login-repo-villa.vercel.app/login'>Clic para iniciar secion</a></li></p> </div>"
          }
           transporter.sendMail(mailOptions, (error, info) =>{
            if(error) {
                res.status(500).send(error.message);
            }else{
                console.log("emailEnviado");
                res.status(200).jsonp(req.body);
            }
           })
    });
  });
  
  app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','apellidos','email','rol']);

    Usuario.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, usrDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Usuario actualizado con exito',
            usuario: usrDB
        });
    });
  });
  
  app.delete('/usuario/:id', function (req, res) {
     let id = req.params.id;

      Usuario.deleteOne({ _id: id }, (err, usuarioBorrado) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el usuario',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuarioBorrado
        });
      });
      /*let id =  req.params.id;

      Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el usuario',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB
        });
      });*/
  });

module.exports = app;