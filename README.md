# ego

## 创建项目
vuecli -> element-ui -> 配置文件名出现eslint错误

## 项目结构
使用前后端分离架构 后端封装好数据后 前端使用Axios请求数据

前端api base是基地址 index是封装axios请求


## 遗留问题
-   github下载慢

-   phpmyadmin无法下载安装(已用navicat替代)

-   无法连接外围chatgpt

## 文件夹用处
api 是用来处理前端Axios请求的

router 是处理路由跳转 同时设置守卫

utils 是axios的请求设置

src外面的server是后端文件夹

## eslint错误解决方案直接使用以下命令
删除
.eslintrc.js
.eslintrc.json
.eslintrc.yaml
.eslintignore

pnpm remove eslint eslint-plugin-vue  

pnpm uninstall @vue/cli-plugin-eslint

## 进入文件夹操作
PS D:\CodeProgram\PaceMate\vue项目\vue2\ego> cd server
PS D:\CodeProgram\PaceMate\vue项目\vue2\ego\server> 

## 后端使用mysql黑窗口 + navicat软件
不要去下phpstudy配置太麻烦

然后使用navicat访问数据库 不要去用phpmyadmin 问题很多
### 80端口被占用
多点两下启动即可 有时候抽风

## 前后端一同启动 配置自定义dev启动命令
npm run dev
```js
pnpm i -g concurrently
```

然后在package.json中的scirpt中添加
```js
"dev": "concurrently \"npm run serve\" \"nodemon server index.js\""
```

## api是前端向后端请求数据的工具 接口是后端开发的

## 当出现类似于axios请求成功 但是还是显示登录/注册失败的时候
可能就是前端的代码 或者 后端的代码 没有写好

建议先 调试后端代码 + postman 的方式的vs终端中检查 获取的变量

然后再检查前端代码注入到api的参数有没有

## 第六集 数据流通
前端 -> api -> axios配置项 -> 接口

接口 -> 后端server文件夹(node.js) -> router.js中配置接口

现在前端获取数据后将数据保存到vuex中

新增 init.js

store/modules/login.js

注册逻辑: 
后端的地址postman + mysql 调试后端注册接口 

前端api 注册接口 -> api的地址

## 第七集
明天的任务 在主手机注册19098074868的微信号

然后用主手机 辅助验证

## 第十集
样式的页面是从外到内一层层写进去的

不是一会写那边 一会写那边

## 开始爆肝

