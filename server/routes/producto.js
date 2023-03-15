const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Producto = require('../models/productos');
const app = express();
var nodemailer = require('nodemailer');

 
  
  app.get('/producto', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Producto.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, productos) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok:true,
           msg: 'Lista de productos obtenida con exito',
           conteo: productos.length,
           productos
       });
    });
  });

  app.get('/producto/:_id', function (req, res) {

    let idproducto = req.params.email;
  Producto.findOne({_id: idproducto})
  .exec((err, productos) =>{
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
         conteo: productos.length,
         productos
     });
  });
});
  
  app.post('/producto', function (req, res) {
    let body = req.body;
    let pro = new Producto({
        //_id: req.body._id,
        nombre: body.nombre,
        categoriaID: req.body.categoriaID,
        precio: body.precio,
        cantidad: body.cantidad,
        cantidadMax: body.cantidadMax,
        cantidadMed: body.cantidadMed
    });

      
    
    pro.save((err, proDB) => {
        if(err) {
            return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
            });
        }
        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
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