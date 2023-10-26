var express = require('express');
var router = express.Router();

/* GET home page. */
//nhúng controler 
var tk = require('../controlers/taikhoan.controler')


//http://localhost:3000/ trang chủ 
router.get('/', tk.tkList);
router.post('/', tk.tkList);

router.get('/add', tk.tkAdd);
router.post('/add', tk.tkAdd);

router.get('/delete/:id_u', tk.tkDel);
router.post('/delete/:id_u', tk.tkDel);

router.get('/update/:id_u', tk.tkUp);
router.post('/update/:id_u', tk.tkUp);

module.exports = router;