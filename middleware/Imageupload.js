const multer = require('multer');
import path from 'path';

var fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var path = "files";
    var dir = path.concat('/partner_' + req.params.login_id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, 'files/partner_' + req.params.login_id)
  },
  filename: function (req, file, cb) {
    // var datetime = new Date();
    // console.log(datetime);
    cb(null, file.originalname)
  }
})


let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    // if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //     return callback(new Error('Only jpg,jpeg,png  images are allowed'))
    // }
    callback(null, true)
  },
})


export {
  upload
}