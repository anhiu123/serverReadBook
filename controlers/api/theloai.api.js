var md = require('../../modal/theloai.modal');

exports.getTL = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };
     
        try{
        objRes.data = await md.tlModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes);

}

exports.addTL = async(req,res,next)=>{
    
    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        if(req.body.name.length<1){
            objRes.msg = "Name phải nhập ít nhất 1 ký tự";
        return res.json(objRes); // thoát khỏi hàm
        }

        try {
            
            let objTL = new  md.tlModal();
            objTL.name = req.body.name;
               
            objRes.data = await objTL.save();

            objRes.msg = "Thêm thành công";
            objRes.status = 1;

        } catch (error) {
            objRes.msg = error.message;
        }

        return res.json(objRes);
}

exports.dltTL = async(req,res,next)=>{  
    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        
    let id_tl = req.params.id;

    try {

     await md.tlModal.findByIdAndDelete(id_tl);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;
  
    } catch (error) {
        objRes.msg = error.message;
    }
    res.json (objRes);
}

exports.putTL = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        try {
            let id_tl = req.params.id;
            let dieuKien = {_id:id_tl};
            let validate = true;

            if(req.body.name.length<1){
                objRes.msg = "Name phải nhập ít nhất 1 ký tự";
                validate = false
            }
            if(validate){
                let objTL = {};
                objTL.name = req.body.name;       
               
                await md.tlModal.findByIdAndUpdate(id_tl,objTL);
                objRes.msg = "Cập nhật thành công";
                objRes.status = 1;

            }
            objRes.data = await md.tlModal.findById(dieuKien);

        } catch (error) {
            objRes.msg = error.message;
        }
    
        return res.json(objRes);
  
}