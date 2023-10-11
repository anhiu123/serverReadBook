var md = require('../../modal/sanpham.modal');
const { param } = require('../../routes');

exports.getSP = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.spModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}
exports.addSP = async (req,res,next)=>{
    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        if(req.body.name.length<5){
            objRes.msg = "Name phải nhập ít nhất 5 ký tự";
        return res.json(objRes); // thoát khỏi hàm
        }
        if(req.body.mota.length ==0 || req.body.price.length ==0 || req.body.loai.length ==0){
            objRes.msg = "Không ĐƯợc Để Trống";
        return res.json(objRes); // thoát khỏi hàm
        }
      
        try {
            
            let objSP = new  md.spModal();
            objSP.name = req.body.name;
            objSP.image = req.body.image;
            objSP.mota = req.body.mota;
            objSP.price = req.body.price;
            objSP.loai = req.body.loai;

            objRes.data = await objSP.save();

            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}

exports.dltSP = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        
    let id_sp = req.params.id;

    try {
     await md.spModal.findByIdAndDelete(id_sp);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;    
    } catch (error) {
        objRes.msg = error.message;
    }

    res.json (objRes);
}
exports.putSP = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        try {

            let id_sp = req.params.id;
            let dieuKien = {_id:id_sp};
            let validate = true;

            if(req.body.name.length<5){
                objRes.msg = "Username phải nhập ít nhất 5 ký tự";
                validate = false;
            }
            if(req.body.mota.length ==0 || req.body.price.length ==0 || req.body.loai.length ==0){
                objRes.msg = "Không ĐƯợc Để Trống";
                validate = false;
            }           

            if(validate){
                let objSP = {};
                objSP.name = req.body.name;
                objSP.image = req.body.image;
                objSP.mota = req.body.mota;
                objSP.price = req.body.price;
                objSP.loai = req.body.loai;

                await md.spModal.findByIdAndUpdate(id_sp,objSP);
                objRes.msg = "Cập nhật thành công";
                objRes.status = 1;
            }
            objRes.data = await md.spModal.findById(dieuKien);

        } catch (error) {
            objRes.msg = error.message;
        }  
        return res.json(objRes);
}

exports.xemct1SP = async(req,res,next)=>{


    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        let id_sp = req.params.id;

        try{
            objRes.data = await md.spModal.findById(id_sp);
            objRes.msg = "Lấy dữ liệu thành công";
            }catch(err){
            console.log(err);
            objRes.msg = err.message;
            }
            res.json(objRes);

}