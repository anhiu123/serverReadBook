var md = require('../../modal/taikhoan.modal');

exports.getUsers = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };
               
        try{
        objRes.data = await md.tkModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes);
}

exports.addUs = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
       
        if(req.body.username.length<5){
            objRes.msg = "Username phải nhập ít nhất 5 ký tự";
        return res.json(objRes); // thoát khỏi hàm
        }
        if(req.body.passwd.length ==0 || req.body.email.length ==0 || req.body.role.length ==0){
            objRes.msg = "Không Được Để Trống";
        return res.json(objRes); // thoát khỏi hàm
        }
        try {
            
            let objTK = new  md.tkModal();
            objTK.username = req.body.username;
            objTK.passwd = req.body.passwd;
            objTK.email = req.body.email; 
            objTK.role = req.body.role;
           
            objRes.data = await objTK.save();

            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}
exports.dltUS = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };  
    let id_tk = req.params.id;

    try {

     await md.tkModal.findByIdAndDelete(id_tk);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;  
    } catch (error) {
        objRes.msg = error.message;
    }
    res.json (objRes);  
}

exports.putUS = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        try {

            let id_tk = req.params.id;
            let dieuKien = {_id:id_tk};
            let validate = true;

            if(req.body.username.length<5){
                objRes.msg = "Username phải nhập ít nhất 5 ký tự";
                validate = false;
            }
            if(req.body.passwd.length ==0 || req.body.email.length ==0 || req.body.role.length ==0){
                objRes.msg = "Không ĐƯợc Để Trống";
                validate = false;
            }   

            if(validate){
                let objTK = {};
                objTK.username = req.body.username;
                objTK.email = req.body.email;
                objTK.passwd = req.body.passwd;
                objTK.role = req.body.role;
               
                await md.tkModal.findByIdAndUpdate(id_tk,objTK);
                objRes.msg = "Cập nhật thành công";
                objRes.status = 1;

            }
            objRes.data = await md.tkModal.findById(dieuKien);
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}