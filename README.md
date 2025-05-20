# ego

## 知识
-   api是前端向后端请求数据的工具 接口是后端开发的

-   样式的页面是从外到内一层层写进去的 不是一会写那边 一会写那边

### 数据流通
前端 -> api -> axios配置项 -> 接口

接口 -> 后端server文件夹(node.js) -> router.js中配置接口

现在前端获取数据后将数据保存到vuex中

新增 init.js

store/modules/login.js

调式注册接口逻辑: 
1. 后端的地址postman + mysql 调试后端注册接口 

2. 前端api 注册接口 -> api的地址

### 前后端同时启动 和 单独启动的区别 和使用方法
#### 单独启动
upload文件夹会出现在server文件夹中 但是不会出现在前端文件夹中

#### 同时启动
upload文件夹会出现在前端文件夹中

配置：

npm run dev
```js
pnpm i -g concurrently
```

然后在package.json中的scirpt中添加
```js
"dev": "concurrently \"npm run serve\" \"nodemon server index.js\""
```




## 学习方法记录
-   不仅需要学习 还需要复习 在学完之后不懂的地方及时左笔记和复习

-   每做一个项目 当项目越来越大的时候 需要些项目结构 

    不懂的地方需要及时复习 不要区做思维导图 重要是要过脑

-   面对工作量巨大是懈怠的解决方法：1. 分解任务 2. Deadline 3. 阶段性目标

-   很多时候代码能跑就不要去改动 和过度解读 没有意义

-   也就是说等先找高薪工作 等老板需求、和ui需求下来了 
    我再找对应的项目复现改动细节是这样的 还是从零创造

## 创建项目
vuecli -> element-ui -> 配置文件名出现eslint错误 

解决方案 最好使用 csdn创建cli 那样不会自定义配置 不会下载一些乱七八糟的

### 后端使用mysql黑窗口 + navicat软件
不要去下phpstudy配置太麻烦

然后使用navicat访问数据库 不要去用phpmyadmin 问题很多
### 80端口被占用
多点两下启动即可 有时候抽风

### eslint错误解决方案直接使用以下命令
删除
.eslintrc.js
.eslintrc.json
.eslintrc.yaml
.eslintignore

pnpm remove eslint eslint-plugin-vue  

pnpm uninstall @vue/cli-plugin-eslint

### 进入文件夹操作
PS D:\CodeProgram\PaceMate\vue项目\vue2\ego> cd server
PS D:\CodeProgram\PaceMate\vue项目\vue2\ego\server> 

## 项目结构
使用前后端分离架构 后端封装好数据后 前端使用Axios请求数据

### 1. 项目根目录
-   .gitignore：定义 Git 忽略的文件和目录，如 nodemodules、dist 等。
-   package.json：项目的配置文件，包括项目名称、版本、依赖、脚本等。
-   README.md：项目的说明文件，通常包含项目的简介和使用方法。
-   node_modules：存放项目依赖的第三方库文件，通常不会手动修改。
-   package-lock.json：锁定项目依赖的具体版本，确保安装一致性。

### 2. public 公共资源目录
-   index.html：项目的入口 HTML 文件，包含 `<div id"app"></div>` 作为 Vue 应用的挂载点。
-   favicon.ico：项目的图标文件。
-   其他静态资源：如图片、字体文件等，这些资源会被直接复制到构建后的 dist 目录中。
-   这里还放入了百度的富文本编辑器文件

### 3. server后端文件夹
-   config.js 数据库配置 账号密码
-   index.js 后端配置
-   router文件夹 配置注意事项
    1. ../config 
    2. 在index.js中引入 然后app.use
    -   user.js 用户接口
    -   goodsctrl.js 商品接口
    -   specs.js 规格参数接口
    -   imgupload.js 图片上传接口

### 4. src 源代码目录五角星
-   api文件夹 配置接口url(base.js)、封装axios请求(index.js)
-   assets：存放静态资源文件，如图片、样式文件等。
-   router：路由配置文件
-   store：Vuex 状态管理文件（如果使用了 Vuex）。
-   utils文件夹 存放事件总线配置、vuex配置、axios配置
-   App.vue：根组件，包含 <router-view> 或其他视图组件。
-   main.js 项目的入口文件，用于初始化 Vue 实例并挂载到 #app。
-   components：存放可复用的组件文件。
    -   HeaderNav.vue 顶部导航栏组件
    -   HomePage文件夹
        -   counter.vue 计数器组件
        -   types.vue 下拉框组件
        -   timer.vue 时间标签组件
    -   PubHeader.vue 规格参数搜索框组件
    -   PubPagination.vue  规格参数分页器
-   views：存放视图文件
    -   Login.vue 登录页面
    -   Layout.vue 布局页面 包含HeaderNav.vue ❗注意这个是组件 不是视图
        因为这个顶部区是哪里都有的 所以是组件
    -   main文件夹
        -   HomePage文件夹 首页
            -   Home.vue 首页组件 包含 HomeNav.vue 
                HomeProductList.vue HomeSwiper.vue的根组件
                -   HomeNav.vue 全部产品导航栏
                -   HomeProductList.vue 从这里跳转到各自的产品详情页
                -   HomeSwiper.vue 轮播图
            -   sub 商品详情文件夹
                -   Details.vue 左侧导航栏 后面四个为右侧区
                -   openproduct.vue 引入了三个组件
                    -   counter 计数器组件
                    -   types 下拉框组件
                    -   timer 时间标签组件
                -   golife.vue 空
                -   heigh.vue 空
                -   heigh.vue 空
        -   Product文件夹 商品管理
            -   index 商品管理根组件
                -   ProductHeader.vue 输入框区和查询添加按钮
                -   ProductList.vue 主表格区域
                -   ProductPagination.vue 分页器
                -   ProductAdd.vue 这是添加对话框  这个引入了四个组件
                    -   ProductBaiduUEditor.vue 这个引入了没有使用 
                        不使用 换成了wangEditor
                    -   ProductWangEditor.vue 富文本编辑器正在使用这个
                    -   ProductTree.vue 这是一个类目选择
                    -   ProductUpload.vue 图片上传 没有使用前端api 
                        直接对接3000后端接口
                -   ProductEditor.vue 编辑对话框 复制添加对话框改的 所以也有添加对话框的三个组件
                    -   ProductWangEditor.vue 富文本编辑器正在使用这个
                    -   ProductTree.vue 这是一个类目选择
                    -   ProductUpload.vue 图片上传 没有使用前端api 
        -   Params文件夹 规格参数
            -   index.vue 规格参数根组件 引入了
                PubHeader.vue ParamsList.vue PubPagination.vue 三个组件
            -   PubHeader.vue 规格参数搜索框组件
            -   ParamsList.vue 规格参数表格页面
            -   ParamsAdd.vue 规格参数添加对话框
            -   ParamsEditor.vue 规格参数编辑对话框
            -   PubPagination.vue  规格参数分页器
        -   ADCategory.vue 广告分类(有待开发，包括要设计什么，然后再是搭建页面，后端，前端)

## 遗留问题
-   github下载慢 -> 使用git命令行克隆就会快

-   phpmyadmin无法下载安装(已用navicat替代)

-   无法连接外网chatgpt

## 错误记录 
### 当出现类似于axios请求成功 但是还是显示登录/注册失败的时候
可能就是前端的代码 或者 后端的代码 没有写好

建议先 调试后端代码 + postman 的方式的vs终端中检查 获取的变量

然后再检查前端代码注入到api的参数有没有

# 后续自己添加的任务

## 规格参数的删除✅
### 逻辑链条: mysql -> 后端 -> 前端api -> 前端视图

### 为什么接口最好都使用get因为在浏览器输入可以使用
如果需要获取参数可以用直接在url中拿 用post可能浏览器url无法访问

## 规格参数的添加✅
PubHeader.vue 发送true给ParamsAdd.vue 触发对话框

### 第一个坑 进入PubHeader.vue 的时候
ParamsAdd.vue 没有加载 后来发现是没有在index.vue中引入

## 规格参数的编辑✅

## 整理接口和api✅
先整理一个接口出去 不要一次性写太多 写一个就封装一个 ✅

一个个整理接口的名字 修改前端api 调用

在创建接口的时候 要想想用户能否如此操作 如果不行 其实也可以不写 或者作为调试使用

### 改接口名字的顺序
1. 后端代码 => base.js

2. 将老接口放在 ctrl + f上 改

    base.js index.js 用 ctrl + f 查找后修改api

## 抽离复用的组件







