

var express = require('express');
var router = express.Router();

var Product = require('../model/Product')

var auth = require('../helpers/auth')

router
    .get('/new', (req, res, next) => {
        res.render('product-form');
    })
    .get('/', function (req, res, next) {
        Product.find({})
            .then(products => {
                res.render('products-view', { products })
            })
    })
    .delete('/:id', auth.ensureAuthenticated, (req, res) => {
        let id = req.params.id;
        Product.remove({ _id: id })
            .then(() => {
                // res.status(200).json({ message: 'product deleted' })
                res.redirect('/products')
            })
    })
    .get('/:id', (req, res) => {
        let id = req.params.id;
        let action = req.query.action;
        console.log(action);
        if (req.ensureAuthenticated) {
            if (action === 'delete') {
                Product.remove({ _id: id })
                    .then(() => {
                        // res.status(200).json({ message: 'product deleted' })
                        res.redirect('/products')
                    })
            }
        } else {
            res.redirect('/users/login')
        }

    })
    .post('/', auth.ensureAuthenticated, (req, res, next) => {
        let form = req.body;
        let newProdut = new Product(form);
        newProdut.save()
            .then(product => {
                //res.status(201).json(product)
                res.redirect('/products')
            })
    })
    .put('/:id', auth.ensureAuthenticated, (req, res, next) => {
        let formData = req.body;
        let id = req.params.id;
        Product.findOne({ _id: id })
            .then(product => {
                product.name = formData.name;
                product.price = formData.price
                product.save()
                    .then((product) => {
                        res.json(product)
                    })
            })
    })



module.exports = router;