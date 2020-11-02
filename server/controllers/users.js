/* B"H

*/

const express = require('express');
const users = require('../models/users');

const router = express.Router();

router
    .get('/', (req, res, next) => {
        users.getAll().then(x=> res.send( x ) )
        .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const id = +req.params.id;
        if(!id) return next();
        users.get(id).then(x=> res.send( x ) )
        .catch(next);
    })
    .get('/types', (req, res, next) => {
        users.getTypes().then(x=> res.send( x ) )
        .catch(next);
    })
    .get('/search', (req, res, next) => {
        users.search(req.query.q).then(x=> res.send( x ) )
        .catch(next);
    })
    .post('/', (req, res, next) => {
        users.add(
            req.body.FirstName,
            req.body.LastName, 
            req.body.DOB, 
            req.body.Password, 
            6 /* User */, 
        ).then(newUser => {
            res.send( newUser );
        }).catch(next)
    })
    .put('/:id', (req, res, next) => {
        users.update( req.params.id,
            req.body.FirstName,
            req.body.LastName, 
            req.body.DOB, 
            req.body.Password, 
            6 /* User */, 
        ).then(newUser => {
            res.send( newUser );
        }).catch(next)
    })
    .delete('/:id', (req, res, next) => {
        users.remove(req.params.id).then(msg => {
            res.send( msg );
        }).catch(next)
    })
module.exports = router;