var express = require('express');
var router = express.Router();

/* GET home page. */
//nhúng controler 
var sp = require('../controlers/sanpham.controler')
var checkLG = require('../middleware/check-Login');
var checkSP = require('../middleware/check-AddSP');

var multer = require('multer');
var objUpload = multer({dest:'./tmp'})

//http://localhost:3000/ trang chủ 
router.get('/',checkLG.yeu_cau_login, sp.spList);
// router.post('/', sp.spList);

router.get('/add', sp.spAdd);
// router.post('/add', objUpload.single('anh') , checkSP.addSP, sp.spAdd)
router.post('/add', objUpload.single('anh'), sp.spAdd)

router.get('/search', sp.spSearch);

router.get('/listloai', sp.spTl);

router.get('/addloai', sp.spTl1);
router.post('/addloai', sp.spTl1);

router.get('/delete/:id_sp', sp.spDel);
router.post('/delete/:id_sp', sp.spDel);

router.get('/update/:id_sp', sp.spUpdate);
router.post('/update/:id_sp',objUpload.single('anh'), sp.spUpdate);

router.get('/deletel/:id_tl', sp.tlDel);
router.post('/deletel/:id_tl', sp.tlDel);

router.get('/updatel/:id_tl', sp.tlUp);
router.post('/updatel/:id_tl', sp.tlUp);




module.exports = router;