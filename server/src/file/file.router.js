const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require("path");
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it


const storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'./uploads')
  },
  filename: function (req,file,cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null,file.fieldname + '-' + uniqueSuffix)
    // var filetypes = /jpeg|jpg|png/;
    // var mimetype = filetypes.test(file.mimetype);
    // var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1024 * 1024;


// // const upload = multer({limits: {fileSize: 1 * 1024 * 1024}}).single("file");

var upload = multer({
  storage: storage,
  limits: {fileSize: maxSize},
  fileFilter: function (req,file,cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null,true);
    }
    cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
  }

  // mypic is the name of file attribute
}).array("files");
// .single("files");

// router.post('/upload',(req,res) => {
//   // upload(req,res,async (err) => {
//   //   if (err) {
//   //     console.log(err)
//   //     return res.status(400).send({message: err})
//   //   }
//   //   const file = req.file;
//   //   console.log(req.file);
//   //   await fs.promises.writeFile('./upload-dir/uploaded-file.png',file.buffer);
//   //   res.send({message: "Upload success"});
//   // })

//   // Error MiddleWare for multer file upload, so if any
//   // error occurs, the image would not be uploaded!
//   upload(req,res,function (err) {

//     if (err) {

//       // ERROR occurred (here it can be occurred due
//       // to uploading image of size greater than
//       // 1MB or uploading different file type)
//       res.send(err)
//     }
//     else {

//       // SUCCESS, image successfully uploaded
//       res.send("Success, Image uploaded!")
//     }
//   })
// });


// const upload = multer({dest: "./uploads"})

router.post("/upload",upload,(req,res) => {
  // console.log(req.body);
  // console.log(req.files);
  res.json({message: "Successfully uploaded files"});
});


module.exports = router;
