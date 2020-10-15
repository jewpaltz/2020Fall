/* B"H

*/

const express = require('express');
const users = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
        res.send( users.getAll() );
    })
    .get('/search', (req, res) => {
        res.send( users.search(req.query.q) );
    })
    .post('/', (req, res) => {
        const newUser = users.add(req.query.name, req.query.age );
        res.send( newUser );
    })

module.exports = router;