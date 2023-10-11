var express = require('express');
var router = express.Router();
// router.use(express.urlencoded({ extended: false }));

var Login = require('../controlers/taikhoan.controler');
var checkLG = require('../middleware/check-Login');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', Login.Login);
router.post('/', Login.Login);

module.exports = router;




