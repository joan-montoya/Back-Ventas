const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Ventas = require('../models/ventas');
const app = express();
var nodemailer = require('nodemailer');

 
  
  app.get('/ventas', function (req, res) {

      let desde = req.query.desde || 0;
      let hasta = req.query.hasta || 100;

    Ventas.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, ventas) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok:true,
           msg: 'Lista de ventas obtenida con exito',
           conteo: ventas.length,
           ventas
       });
    });
  });

  app.get('/ventas/:_id', function (req, res) {

    let idventa = req.params.email;
  Venta.findOne({_id: idventa})
  .exec((err, ventas) =>{
     if(err) {
         return res.status(400).json({
             ok: false,
             msg: 'Ocurrio un error al momento de consultars',
             err 
         });
     } 

     res.json({
         ok:true,
         msg: 'venta obtenida con exito',
         conteo: ventas.length,
         ventas
     });
  });
});
  
  app.post('/ventas', function (req, res) {
    let body = req.body;
    let ven = new Ventas({
        //_id: req.body._id,
        cantProd: body.cantProd,
        totalVenta: body.totalVenta,
        cambio: body.cambio,
        ingreso: body.ingreso
    });

      
    
    ven.save((err, venDB) => {
        if(err) {
            return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
            });
        }
        res.json({
            ok: true,
            msg: 'Venta insertado con exito',
            venDB
        });
    });
  });
  
  app.put('/producto/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','cantidad','precio','cantidadMax','cantidadMed']);

    Producto.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, prdDB) =>{
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
            producto: prdDB
        });
    });
  });
  
  app.delete('/producto/:id', function (req, res) {
     let id = req.params.id;

      Producto.deleteOne({ _id: id }, (err, productoBorrado) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el prodcuto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto eliminado con exito',
            productoBorrado
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