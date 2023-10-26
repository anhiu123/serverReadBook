// var md = require('../modals/sanpham.modal');
var md = require('../modal/sanpham.modal');
var md1 = require('../modal/theloai.modal');
var fs = require('fs'); 
const { db } = require("./firebaseconfig");
const { set, ref } = require("firebase/database");
const { log } = require('console');


  const newData = {
    name: "John1235646",
    age: 45,
  };

exports.spList = async (req,res,next) =>{

    // render ra view 
    const loaiChon = req.query.loai;
    const role1 = req.query.role;
    let listloai = null;
    let msg =''; 
    let list = null;
    let sl =  await md.spModal.find().count();
    listloai = await md1.tlModal.find();
    let objU = req.session.userLogin;
    let dataList = [];

    try {

        db.ref('sach').once('value')
        .then(function(snapshot) {
          const data = snapshot.val();
      
          if (data) {
            // Lặp qua các thuộc tính của đối tượng dữ liệu và thêm vào danh sách
            Object.keys(data).forEach(function(key) {
              dataList.push(data[key]);
            });
      
            // dataList bây giờ chứa dữ liệu từ Firebase
            // console.log(dataList);
      
            // Render trang sau khi có dữ liệu
            res.render('sanpham/list', { listsp: list, msg: msg, sl: sl, role: role1, listloai: listloai, objU: objU, listsach: dataList });
          } else {
            console.log('Không có dữ liệu trong đường dẫn cụ thể.');
            
            // Render trang sau khi có dữ liệu (trường hợp không có dữ liệu)
            res.render('sanpham/list', { listsp: list, msg: msg, sl: sl, role: role1, listloai: listloai, objU: objU, listsach: dataList });
          }
        })
        .catch(function(error) {
          console.error('Lỗi khi lấy dữ liệu từ Firebase:', error);
      
          // Render trang sau khi có lỗi
          res.render('sanpham/list', { listsp: list, msg: msg, sl: sl, role: role1, listloai: listloai, objU: objU, listsach: dataList });
        });
      
       
        // Nếu loaiChon không được chọn, lấy toàn bộ danh sách sản phẩm
        if (!loaiChon) {
          list = await md.spModal.find();
          // console.log(list  + "Dữ liệu");
        } else {
          // Nếu có loaiChon, lọc danh sách sản phẩm theo loại chọn
          list = await md.spModal.find({ loai: loaiChon });
        }
        msg = 'Lấy Dữ Liệu Thành CÔng';
      } catch (error) {
        console.log(error);
        msg = err.message;
      }
   
    // res.render('sanpham/list',{listsp : list,msg :msg,sl:sl,role:role1,listloai:listloai,objU:objU,listsach:dataList});
   
}

  
    exports.spAdd = async(req,res,next) =>{
    // render ra view 



    console.log(req.body);
    let msg = ''; 
    let listloai = null;

    listloai = await md1.tlModal.find();

    let objU = req.session.userLogin;
    // console.log( req.session  );

    let dataList = [];


    db.ref('theloai').once('value')
    .then(function(snapshot) {
      const data = snapshot.val();
  
      if (data) {
        // Lặp qua các thuộc tính của đối tượng dữ liệu và thêm vào danh sách
        Object.keys(data).forEach(function(key) {
          dataList.push(data[key]);
        });
  
        // dataList bây giờ chứa dữ liệu từ Firebase
        // console.log(dataList);
  
        // Render trang sau khi có dữ liệu
        res.render('sanpham/add',{msg:msg,list:listloai,objU:objU,listl:dataList});
      } else {
        console.log('Không có dữ liệu trong đường dẫn cụ thể.');
        
        // Render trang sau khi có dữ liệu (trường hợp không có dữ liệu)
        res.render('sanpham/add',{msg:msg,list:listloai,objU:objU,listl:dataList});
      }
    })
    .catch(function(error) {
      console.error('Lỗi khi lấy dữ liệu từ Firebase:', error);
  
      // Render trang sau khi có lỗi
      res.render('sanpham/add',{msg:msg,list:listloai,objU:objU,listl:dataList});
    });

   
    if(req.method == 'POST'){

      try {
        if (!req.file) {
          msg = "Chưa chọn ảnh";
          return res.send("Chưa Chọn Ảnh");
        }
      } catch (error) {
        
      }

      if(req.body.name.length<1 || req.body.loai.length<1 || req.body.tieude.length<1){
        return res.send("Chưa  Nhập Đủ Thông Tin");
      }
   
      fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{

        if(err){
            console.log(err);
        }else{
            console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
        }

    });

   

  

     let anh = "http://localhost:3000/uploads/" + req.file.originalname;
     let name = req.body.name;
     let loai = req.body.loai;
     let tieude = req.body.tieude;

     db.ref("sach/" + new Date().getTime()).set({
      id : new Date().getTime(),
      name: name,
      image: anh,
      theloai : loai,
      tieude : tieude
    }, (error) => {
      if (error) {
        console.error("Lỗi khi đặt dữ liệu:", error);
      } else {
        console.log("Dữ liệu đã được đặt thành công!");
      }
    });



        

    }
    // console.log( req.session  );

  

}

exports.spSearch = async (req,res,next) =>{
    // render ra view 

    let msg = '';
    let list = null;

    let objU = req.session.userLogin;

    try {
        let timKiem = req.query.name; // Lấy từ query parameter
        let query = {}; // Đây là đối tượng truy vấn MongoDB trống ban đầu
    
        // Nếu có tìm kiếm sản phẩm theo tên
        if (timKiem && timKiem.trim() !== '') {
          // Sử dụng toán tử $regex của MongoDB để tìm kiếm sản phẩm theo tên
          query.name = { $regex: new RegExp(timKiem, 'i') };
        }
    
        // Tìm kiếm sản phẩm dựa trên query
        list = await md.spModal.find(query);
    
        msg = 'Lấy Dữ Liệu Thành CÔng';
      } catch (error) {
        console.log(error);
        msg = err.message;
      }
    


    res.render('sanpham/search',{msg:msg,list:list,objU:objU});

}

exports.spDel = async (req,res,next) =>{

    let id_sp = req.params.id_sp;
   

    if(req.method=='POST'){
      const ref = db.ref('sach/' + id_sp); // Tạo đường dẫn tới mục bạn muốn xóa
        // Xóa 
        try {
          ref.remove()
  .then(() => {
    
    console.log('Xóa dữ liệu thành công.');
   
  })
  .catch((error) => {
    console.error('Lỗi khi xóa dữ liệu:', error);
  });

        } catch (error) {
            res.send(err.message);
        }
    }

    res.render('sanpham/delete');

}


exports.spUpdate = async (req,res,next) =>{

    let id_sp = req.params.id_sp;

    let dataList = [];
    db.ref('theloai').once('value')
    .then(function(snapshot) {
      const data = snapshot.val();
  
      if (data) {
        // Lặp qua các thuộc tính của đối tượng dữ liệu và thêm vào danh sách
        Object.keys(data).forEach(function(key) {
          dataList.push(data[key]);
        });
  
        // dataList bây giờ chứa dữ liệu từ Firebase
        // console.log(dataList);
  
        // Render trang sau khi có dữ liệu
        res.render('sanpham/update',{listl:dataList});
      } else {
        console.log('Không có dữ liệu trong đường dẫn cụ thể.');
        
        // Render trang sau khi có dữ liệu (trường hợp không có dữ liệu)
        res.render('sanpham/update',{listl:dataList});
      }
    })
    .catch(function(error) {
      console.error('Lỗi khi lấy dữ liệu từ Firebase:', error);
  
      // Render trang sau khi có lỗi
      res.render('sanpham/update',{listl:dataList});
    });

   
    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){

            fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{

                if(err){
                    console.log(err);
                }else{
                    console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                }
    
            })

            const ref = db.ref('sach/' + id_sp);

            let name = req.body.name;
            let image = "http://localhost:3000/uploads/" + req.file.originalname;
            let tieude = req.body.tieude;
            let loai = req.body.loai;
            
            const newData = {
              name: name,
              image: image,
              theloai : loai,
              tieude : tieude
              // Các thuộc tính khác của sách
            };
            ref.update(newData)
            .then(() => {
              console.log('Cập nhật dữ liệu thành công.');
            })
            .catch((error) => {
              console.error('Lỗi khi cập nhật dữ liệu:', error);
            });
               
            
        };  
     
    } catch (error) {
        msg = error.message;
    }
    // res.render('sanpham/update');

}



exports.spTl = async (req,res,next) =>{
    // render ra view 

    let msg =''; 
    let list = null;
    let sl =  await md1.tlModal.find().count();
    let dataList = [];
    let objU = req.session.userLogin;
    
    try {

        db.ref('theloai').once('value')
        .then(function(snapshot) {
          const data = snapshot.val();
      
          if (data) {
            // Lặp qua các thuộc tính của đối tượng dữ liệu và thêm vào danh sách
            Object.keys(data).forEach(function(key) {
              dataList.push(data[key]);
            });
      
            // dataList bây giờ chứa dữ liệu từ Firebase
            // console.log(dataList);
      
            // Render trang sau khi có dữ liệu
            res.render('sanpham/listloai',{listtl : list,msg :msg,sl:sl,objU:objU,list1:dataList});
          } else {
            console.log('Không có dữ liệu trong đường dẫn cụ thể.');
            
            // Render trang sau khi có dữ liệu (trường hợp không có dữ liệu)
            res.render('sanpham/listloai',{listtl : list,msg :msg,sl:sl,objU:objU,list1:dataList});
          }
        })
        .catch(function(error) {
          console.error('Lỗi khi lấy dữ liệu từ Firebase:', error);
      
          // Render trang sau khi có lỗi
          res.render('sanpham/listloai',{listtl : list,msg :msg,sl:sl,objU:objU,list1:dataList});
        });



        list = await md1.tlModal.find();
       msg = 'Lấy Dứ Liệu Thành CÔng';
   } catch (error) {
       console.log(error);
       msg = err.message;
   }

    // res.render('sanpham/listloai',{listtl : list,msg :msg,sl:sl,objU:objU});

}

exports.spTl1 = async (req,res,next) =>{
    // render ra view 
    let msg = ''; 
    let objU = req.session.userLogin;

    if(req.method == 'POST'){

      if(req.body.name.length<1){
        console.log("Phải Nhập Tên");
        msg = "Phải Nhập Đủ Thông Tin"
       return res.render('sanpham/addloai',{msg:msg,objU:objU});
      }
  
      let name = req.body.name;
      db.ref("theloai/" + new Date().getTime()).set({
       id : new Date().getTime(),
       name: name,
     }, (error) => {
       if (error) {
         console.error("Lỗi khi đặt dữ liệu:", error);
       } else {
        msg = "Thêm Thành Công";
         console.log("Dữ liệu đã được đặt thành công!");
       }
     });
    }

  
    res.render('sanpham/addloai',{msg:msg,objU:objU});

}

exports.tlDel = async (req,res,next) =>{

    let id_tl = req.params.id_tl;


 
    

    if(req.method=='POST'){
      const ref = db.ref('theloai/' + id_tl); // Tạo đường dẫn tới mục bạn muốn xóa
      // Xóa 
      try {
        ref.remove()
.then(() => {
  
  console.log('Xóa dữ liệu thành công.');
 
})
.catch((error) => {
  console.error('Lỗi khi xóa dữ liệu:', error);
});

      } catch (error) {
          res.send(err.message);
      }
      
    }

    res.render('sanpham/deletel');


}


exports.tlUp = async (req,res,next) =>{

    let id_tl = req.params.id_tl;
    let msg = 'A';

    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){

          if(req.body.name.length<1 ){
            console.log("Phải Nhập Tên");
            msg = "Phải Nhập Đủ Thông Tin";
           return res.render('sanpham/updatel',{msg:msg});
          }
          

          const ref = db.ref('theloai/' + id_tl);

          let name = req.body.name;
    
          
          const newData = {
            name: name,

          };
          ref.update(newData)
          .then(() => {
            console.log('Cập nhật dữ liệu thành công.');
          })
          .catch((error) => {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
          });


        }  
      
    } catch (error) {
     
    }


    res.render('sanpham/updatel');
}