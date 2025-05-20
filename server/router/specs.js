// logincrud.js  
const express = require('express');  
const router = express.Router();  
const sqlClient = require('../config'); // 假设你有一个数据库配置文件
const url = require('url');

// 规格参数查询
router.get('/params/search', (req, res) => {
    const page = url.parse(req.url, true).query.page || 1;
    const sql = 'select * from params order by id desc limit 10 offset ' + (page - 1) * 10;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: '查询失败'
            })
        }
    })
})

// 这样什么都不填可以查询全部
// http://localhost:3000/api/params/search?search=
// 规格参数模糊查询
router.get('/params/vaguesearch', (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "SELECT * FROM params WHERE CONCAT(`paramData`) LIKE '%" + search + "%'";
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

// 添加商品(规格参数)✅
router.get('/params/add', (req, res) => {  
    // console.log('req.query数据',req.query)
    // console.log('req.query.itemCatId:', req.query.itemCatId); 
    // 从请求体获取数据
    const itemCatId = req.query.itemCatId || '';  
    const productName = req.query.productName || '';  
    const productOne = req.query.productOne || '';  
    const productTwo = req.query.productTwo || ''; 

    // console.log('各项数据', itemCatId, productName, productOne, productTwo);  

    // 如果需要自动生成 id，可以省略 id 字段  
    const sql = "INSERT INTO params (itemCatId, paramData) VALUES (?, ?)";
    // 包装paramData然后推入
    const paramData = {  
        productName,  
        productOne,  
        productTwo  
    };  

    // 确保 paramData 是 JSON 字符串   
    const arr = [itemCatId, JSON.stringify(paramData)];  
    // console.log('输出arr', arr);  

    sqlClient(sql, arr, result => {  
        if (result.affectedRows > 0) {  
            res.send({  
                status: 200,  
                msg: '添加成功'  
            });  
        } else {  
            res.send({  
                status: 500,  
                msg: '添加失败'  
            });  
        }  
    });  
}); 

// 规格参数删除
router.get('/params/delete', (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = 'delete from params where id=?'
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

// 规格参数预更新(编辑查询)
router.get('/params/preeditor', (req, res) => {
    const id = url.parse(req.url, true).query.id;
    console.log('我是id', id)
    const sql = 'SELECT * FROM params WHERE id = ?';  
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

// 规格参数编辑
router.get('/params/editor', (req, res) => {
    // 比添加接口多一个id字段
    const id = req.query.id || '';
    const itemCatId = req.query.itemCatId || '';  
    const productName = req.query.productName || '';  
    const productOne = req.query.productOne || '';  
    const productTwo = req.query.productTwo || '';

    console.log('各项数据', id, itemCatId, productName, productOne, productTwo);  

    const sql = `  
    UPDATE params   
    SET   
        itemCatId = ?,   
        paramData = JSON_SET(paramData, '$.productName', ?, '$.productOne', ?, '$.productTwo', ?)   
    WHERE id = ?`;
    const arr = [itemCatId, productName, productOne, productTwo, id]
    console.log('输出arr', arr)
    console.log('执行sql语句', sql)

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