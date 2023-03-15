const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Categoria = require('../models/categorias');
const app = express();
var nodemailer = require('nodemailer');

 
  
  app.get('/categoria', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Categoria.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, categorias) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok:true,
           msg: 'Lista de categorias obtenida con exito',
           conteo: categorias.length,
           categorias
       });
    });
  });

  app.get('/categoria/:_id', function (req, res) {

    let idcategoria = req.params._id;
  Categoria.findOne({_id: idcategoria})
  .exec((err, categorias) =>{
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
         conteo: categorias.length,
         categorias
     });
  });
});
  
  app.post('/categoria', function (req, res) {
    let body = req.body;
    let cat = new Categoria({
        //_id: req.body._id,
        nombreCat: req.body.nombreCat,
        descripcion: req.body.descripcion
    });

      
    
    cat.save((err, catDB) => {
        if(err) {
            return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
            });
        }
        res.json({
            ok: true,
            msg: 'Categoria insertada con exito',
            catDB
        });
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