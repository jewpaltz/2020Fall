/* B"H

*/

const express = require('express');
const users = require('../models/users');

const router = express.Router();

router.get('/', (req, res, next) => {
        users.getAll().then(x=> res.send( x ) )
        .catch(next);
    })
    .get('/search', (req, res, next) => {
        users.search(req.query.q).then(x=> res.send( x ) )
        .catch(next);
    })
    .post('/', (req, res, next) => {
        users.add(req.query.name, req.query.age ).then(newUser => {
            res.send( newUser );
        }).catch(next)
    })

module.exports = router;