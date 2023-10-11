var md1 = require('../modal/theloai.modal');

exports.addSP = async (req, res, next) => {

    listloai = await md1.tlModal.find();
    let objU = req.session.userLogin;
    // Kiểm tra nếu req.session.addSP tồn tại và có trường name
        if(req.body.name.length<5){
            msg = "Tên Sản Phẩm phải nhập ít nhất 5 kí tự ";
            return  res.render('sanpham/add',{msg:msg,list:listloai,objU:objU});
        }
        if(req.body.mota.length ==0 || req.body.price.length ==0 || req.body.loai.length ==0){
            msg = "Không Được Để Trống";
            return  res.render('sanpham/add',{msg:msg,list:listloai,objU:objU});
        }
    next();
};

