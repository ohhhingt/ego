//  引入依赖
const express = require('express')
const router = express.Router();
// 配置进去的账号密码的
const sqlClient = require('./config')
// 加固安全性
const jwt = require('jsonwebtoken')
// 引入url对象
const url = require('url')
// 文件对象
const fs = require('fs')
// 上传图片的处理方案
const multer = require('multer')

// 根目录路由
// http://localhost:3000/api/
router.get('/', (req, res) => {  
    res.send('欢迎来到 API');  
});

// 查询(查) GET
// http://localhost:3000/api/users
router.get('/users', (req, res) => {  
    // 定义 SQL 查询语句
    const sql = 'SELECT username, password, email FROM user';
    // 调用 sqlClient 函数执行查询
    sqlClient(sql, [], (result) => {  
        // 如果存在，返回状态 200 和用户数据
        if (result) {  
            res.send({  
                status: 200,  
                data: result  
            });  
        // 如果不存在，返回状态 404 和错误消息
        } else {  
            res.send({  
                status: 404,  
                msg: '没有找到用户'  
            });  
        }  
    });  
}); 

// 注册(增) POST
// http://localhost:3000/api/register
router.post('/user-register', (req, res) => {
    console.log('成功启动注册接口')
    // ❗有的时候req不输出接口输出是因为没有连通性
    // 需要在上面打印一行成功启动 不要打印数字
    // 在postman中body的 x-www-form中输出参数 或者 参数
    // 注意输入后 或者 更改这里代码后需要重启生效
    const { username, password, email } = req.body
    // console.log(username, password, email)
    //  SQL 插入语句
    const sql = 'insert into user values(null,?,?,?)'
    // 将用户输入的数据放入数组中
    const arr = [username, password, email]
    // console.log(sql)
    // console.log(arr)
    // 调用 sqlClient 函数执行 SQL 查询，并处理结果
    sqlClient(sql, arr, result => {
        console.log(result)
        // 检查是否成功插入数据
        // ❗插入成功后在mysql黑窗口/navicat检查数据是否插入
        if (result.affectedRows > 0) {
            console.log('注册成功'); // 输出成功信息 
            // 一旦调用 res.send()，请求的响应就会结束，后续的代码不会再执行
            res.send({
                status: 200,
                msg: '注册成功'
            })
        } else {
            console.log('注册失败'); // 输出失败信息
            res.send({
                status: 401,
                msg: '注册失败'
            })
        }
    })
})
// 注意网页url中默认可以使用get但不能使用post接口

// 删除用户(删) DELETE
// /user-delete/:id 这个要在postman中 路径变量中输入
// 不然就是用查询参数
router.delete('/user-delete', (req, res) => {  
    console.log('成功启动删除用户接口');  
    // 路径参数版本
    // const userId = req.params.id; // 从 URL 参数中获取用户 ID  
    // const sql = 'DELETE FROM user WHERE id = ?'; // SQL 删除语句  
    // const arr = [userId]; // 将用户 ID 放入数组中 
    // 查询参数版本(最好用这个 上面那个可能删除失败)
    const username = req.query.username; // 从查询参数中获取用户名  
    const sql = 'DELETE FROM user WHERE username = ?'; // SQL 删除语句  
    const arr = [username]; // 将用户名放入数组中

    sqlClient(sql, arr, result => {  
        console.log(result);  
        if (result.affectedRows > 0) {  
            console.log('用户删除成功'); // 输出成功信息  
            res.send({  
                status: 200,  
                msg: '用户删除成功'  
            });  
        } else {  
            console.log('用户删除失败'); // 输出失败信息  
            res.send({  
                status: 404,  
                msg: '用户未找到或删除失败'  
            });  
        }  
    });  
});

// 更新用户信息(改) PUT 
// http://localhost:3000/api/user-update
// 注意navicat要点下面的 刷新标志 才会更新数据库数据
// 有点刷新是刷新表结构 不会更新数据
router.put('/user-update', (req, res) => {  
    console.log('成功启动更新用户接口');  
    // 从请求体中获取新的用户信息
    const { username, password, email } = req.query;
    console.log(username, password, email)
    // SQL 更新语句
    const sql = 'UPDATE user SET password = ?, email = ? WHERE username = ?'; 
    // 将新的用户信息放入数组中  
    const arr = [password, email, username]; 

    sqlClient(sql, arr, result => {  
        console.log(result);  
        if (result.affectedRows > 0) {  
            console.log('用户更新成功'); // 输出成功信息  
            res.send({  
                status: 200,  
                msg: '用户更新成功'  
            });  
        } else {  
            console.log('用户更新失败'); // 输出失败信息  
            res.send({  
                status: 404,  
                msg: '用户未找到或更新失败'  
            });  
        }  
    });  
}); 

// 登录接口
// http://localhost:3000/api/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    const sql = 'select * from user where username=? and password=?'
    const arr = [username, password]
    sqlClient(sql,arr,result => {
        if (result.length > 0) {
            // jwt.sign()用于生成JWT方法
            // 接受一个 有效载荷 和 密钥
            let token = jwt.sign({
                username,
                id: result[0].id
            }, 'soomekeys')

            res.send({
                status: 200,
                token,
                username
            })
        } else {
            res.send({
                status: 401,
                msg:'登陆失败'
            })
        }
    })
})

// 商品查询
router.get('/backend/item/selectTbItemAllByPage', (req, res) => {
    // 分页 从请求的 URL 中解析出 page 参数，如果没有提供，则默认为 1。
    const page = url.parse(req.url,true).query.page || 1;
    // 
    const sql = `select * from project order by id desc limit 10 offset ${(page - 1) * 10}`;  
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 401,
                msg: '暂无数据'
            })
        }
    })
})

// 商品总条数
router.get('/total', (req, res) => {
    const sql = 'select count(*) from project where id';
    sqlClient(sql,null,result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无更多数据'
            })
        }
    })
})

// 模糊查询接口
router.get('/search', (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "SELECT * FROM project WHERE CONCAT(`title`, `sellPoint`, `descs`) LIKE '%" + search + "%'";
    console.log(sql, search)
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

// 类目选择
router.get('/backend/itemCategory/selectItemCategoryByParentId', (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = 'select * from category where id=?';
    const arr = [id]
    sqlClient(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '暂无数据'
            })
        }
    })
})

// 图片上传接口
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
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
var upload = multer({ storage: storage});

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


// 导出
module.exports = router