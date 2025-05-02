const mysql = require('mysql')

// 创建数据库连接
const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    // 数据库名
    database: 'ego'
})
// 定义 SQL 执行函数
// sql: 要执行的 SQL 查询语句
// arr: 一个数组，包含 SQL 查询中使用的参数（用于防止 SQL 注入）
// callback: 一个回调函数，用于处理查询结果
const sqlClient = (sql, arr, callback) => {
    // client.query 方法用于执行 SQL 查询：
    // 如果查询出错，错误信息会被打印到控制台。
    // 如果查询成功，结果会通过回调函数返回。
    client.query(sql, arr, (error, result) => {
        if (error) {
            console.log(error)
            return;
        }
        callback(result)
    })
}
// 导出模块
module.exports = sqlClient