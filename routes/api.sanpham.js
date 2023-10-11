var express = require('express');
var router = express.Router();

var apiSP = require('../controlers/api/sanpham.api');


router.get('/', apiSP.getSP);

router.post('/', apiSP.addSP);

router.delete('/:id', apiSP.dltSP);

router.put('/:id', apiSP.putSP);

router.get('/:id', apiSP.xemct1SP);

module.exports = router;
