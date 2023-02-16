const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Correo = require('../models/email');
const app = express();
var nodemailer = require('nodemailer');

 
  
  app.get('/email', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Correo.find({})
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

  app.get('/usuario/:email', function (req, res) {

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
  
  app.post('/email', function (req, res) {
    let body = req.body;
    let usr = new Correo({
        email: body.email,
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
            from: "Aplicacion Login de Joan Montoya",
            to: usrDB.email,
            subject: "Se Requiere confirmacion de correo",
            text: "ingresa al siguiente enlace para confirmar",
            html: "<a  href='https://login-repo-villa.vercel.app/registro'>Clic aqui para confirmar</a></li>",
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
    let body = _.pick(req.body,['nombre','apellidos','email']);

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