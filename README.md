# ego

## 创建项目
vuecli -> element-ui -> 配置文件名出现eslint错误

## 遗留问题
-   github下载慢

-   phpmyadmin无法下载安装(已用navicat替代)

-   无法连接外围chatgpt

-   

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


