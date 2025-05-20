// 引入依赖
const express = require('express');  
const cors = require('cors');  
const bodyParser = require('body-parser'); 

// 接口路由的引入: 
// 用户登录
const user = require('./router/user');  
// 规格参数
const specs = require('./router/specs');  
// 商品管理
const goodsctrl = require('./router/goodsctrl');  
// 图片上传
const imgupload = require('./router/imgupload')

// 创建 Express 应用
const app = express();  
const port = 3000;  

// 使用中间件
app.use(cors());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 如果你还需要处理 JSON 格式的请求 
// 注意：访问路径是这个
// http://localhost:3000/api/
// 接口路由的注入: 
app.use('/api', user);  
app.use('/api', specs)
app.use('/api', goodsctrl)
app.use('/api', imgupload)

// 引入 debug 模块，并创建一个名为 app 的调试实例。
// 可以通过设置环境变量 DEBUG=app 来启用调试信息
// const debug = require('debug')('app');  

// 
app.use(express.static('upload'))

// 启动服务器
console.log("准备启动服务器..."); 
app.listen(port, () => {  
    console.log(1)
    console.log(`服务器运行在:http://localhost:${port}`); 
    // debug("服务器运行在:http://localhost:" + port);  
});