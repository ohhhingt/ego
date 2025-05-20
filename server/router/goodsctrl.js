// logincrud.js  
const express = require('express');  
const router = express.Router();  
const sqlClient = require('../config'); // 假设你有一个数据库配置文件
// 引入url对象
const url = require('url')

// 商品查询
router.get('/item/search', (req, res) => {
    // 分页 从请求的 URL 中解析出 page 参数，如果没有提供，则默认为 1。
    const page = url.parse(req.url, true).query.page || 1;
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
router.get('/item/total', (req, res) => {
    const sql = 'select count(*) from project where id';
    sqlClient(sql, null, result => {
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
router.get('/item/vaguesearch', (req, res) => {
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
router.get('/item/Categorychoose', (req, res) => {
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

// 添加商品(商品管理)
router.get('/item/add', (req, res) => {
    // console.log('请求到达 insertTbItem 路由'); // 输出调试信息
    // 如果说用get请求还想获取参数 那么就要在url中获取参数
    const cid = url.parse(req.url, true).query.cid || '';
    const title = url.parse(req.url, true).query.title || '';
    const sellPoint = url.parse(req.url, true).query.sellPoint || '';
    const price = url.parse(req.url, true).query.price || '';
    const num = url.parse(req.url, true).query.num || '';
    const image = url.parse(req.url, true).query.image || '';
    const desc = url.parse(req.url, true).query.desc || '';
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    // 根据数据库字段顺序插入的
    const arr = [title, image, sellPoint, price, cid, num, desc];
    console.log(arr)
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '添加成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '添加失败'
            })
        }
    }
    )
})

// 商品删除
router.get('/item/delete', (req, res) => {
    const id = url.parse(req.url, true).query.id; 
    const sql = 'delete from project where id=?'
    const arr = [id]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '删除成功'

            })
        } else {
            res.send({
                status: 500,
                msg: '删除失败'
            })
        }
    })
})
// 场景一个错误数据被同事改对了 然后我看到错误的数据
// 我想再去改这个数据 此时就没有意义了
// 所以编辑按钮的数据必须实时从服务器拿取
// 预更新接口(其实就是数据回填)
router.get('/item/editorsearch', (req,res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = 'select * from project where id=?';
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '预更新失败'
            })
        }
    })
})

// 商品编辑
router.get('/item/editor', (req, res) => {
    // 比添加接口多一个id字段
    const id = url.parse(req.url, true).query.id || '';
    const cid = url.parse(req.url, true).query.cid || '';
    const title = url.parse(req.url, true).query.title || '';
    const sellPoint = url.parse(req.url, true).query.sellPoint || '';
    const price = url.parse(req.url, true).query.price || '';
    const num = url.parse(req.url, true).query.num || '';
    const image = url.parse(req.url, true).query.image || '';
    const desc = url.parse(req.url, true).query.desc || '';
    const sql = 'update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?'
    const arr = [title, sellPoint, cid, price, num, desc, image, id]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: '修改成功'
            })
        } else {
            res.send({
                status: 500,
                msg: '修改失败'
            })
        }
    })
})







// 导出路由  
module.exports = router;  