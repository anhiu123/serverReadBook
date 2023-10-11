var express = require('express');
var router = express.Router();

/* GET users listing. */

var apiTL = require('../controlers/api/theloai.api');

router.get('/', apiTL.getTL);

router.post('/', apiTL.addTL);

router.delete('/:id', apiTL.dltTL);

router.put('/:id', apiTL.putTL);

module.exports = router;
