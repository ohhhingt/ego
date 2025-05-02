//  引入依赖
const express = require('express')
const router = express.Router();
// 配置进去的账号密码的
const sqlClient = require('./config')

// 根目录路由
// http://localhost:3000/api/
router.get('/', (req, res) => {  
    res.send('欢迎来到 API');  
});

// 查询(查) GET
// http://localhost:3000/api/users
router.get('/users', (req, res) => {  
    // 定义 SQL 查询语句
    const sql = 'SELECT username FROM user';
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
                result
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


// 导出
module.exports = router