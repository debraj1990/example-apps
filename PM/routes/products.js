

var express = require('express');
var router = express.Router();

var Product = require('../model/Product')

var auth = require('../helpers/auth')

router
    .get('/new', (req, res, next) => {
        res.render('product-form');
    })
    .get('/' /*, auth.ensureAuthenticated*/, function (req, res, next) {
        Product.find({})
            .then(products => {
                res.render('products-view', { products })
            })
    })
    .delete('/:id', (req, res) => {
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
        if (action === 'delete') {
            Product.remove({ _id: id })
                .then(() => {
                    // res.status(200).json({ message: 'product deleted' })
                    res.redirect('/products')
                })
        } else {
            Product.findOne({ _id: id })
                .then(product => {
                    res.json(product)
                })
        }
    })
    .post('/', (req, res, next) => {
        let form = req.body;
        let newProdut = new Product(form);
        newProdut.save()
            .then(product => {
                //res.status(201).json(product)
                res.redirect('/products')
            })
    })
    .put('/:id', (req, res, next) => {
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