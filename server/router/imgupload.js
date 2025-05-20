// logincrud.js  
const express = require('express');  
const router = express.Router();  
// 文件对象
const fs = require('fs')
// 上传图片的处理方案
const multer = require('multer')


// 图片上传接口
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var createFolder = function (folder) {
    try {
        fs.accessSync(folder)
    } catch (e) {
        fs.mkdirSync(folder)
    }
}
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file
    if (!file) {
        return res.status(400).json({ res_code: '1', message: '文件上传失败' });
    }
    console.log('文件类型： %s', file.mimetype);
    console.log('原始文件名： %s', file.originalname);
    console.log('文件大小： %s', file.size);
    console.log('文件保存路径： %s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path })
})
// 注意如果前端和后端各自启动 并且后端使用node启动 修改了后端代码后要重启

// 导出路由  
module.exports = router;  