import axios from "axios"
// 用于将对象转换为 URL 编码的字符串
import qs from "querystring-es3";
import router from "../router"
import store from "../store"

// toLogin 函数用于在发生身份验证错误时导航到登录页面
const toLogin = () => {
    router.push("/login")
}
// 错误处理函数
// errorHandle 函数用于处理不同的 HTTP 响应状态码，并根据状态码执行相应的操作
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("服务器收到客户端通过PUT或者POST请求提交的表示，表示的格式正确，但服务器不懂它什么意思");
            toLogin();
            break;
        case 401:
            console.log("客户端试图对一个受保护的资源进行操作，却又没有提供正确的认证证书");
            toLogin();
            break;
        case 403:
            console.log("客户端请求的结构正确，但是服务器不想处理它");
            toLogin();
            break;
        case 404:
            console.log("资源被围定义(网络请求地址错误)");
            break;
        case 500:
            console.log("执行请求处理代码时遇到了异常，它们就发送此响应代码");
            break;
        case 503:
            console.log("最可能的原因是资源不足：服务器突然收到太多请求，以至于无法全部处理");
            break;
        default:
            console.log(info);
            break;
    }
}

// 创建一个 Axios 实例，并设置请求超时时间为 5000 毫秒（5 秒）
const instance = axios.create({
    timeout: 5000
})
// 添加 Axios 实例的额外功能
instance.all = axios.all;
instance.spread = axios.spread
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
// 请求拦截器在发送请求之前执行。
instance.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            // 它将 POST 请求的数据转换为 URL 编码的字符串。
            config.data = qs.stringify(config.data);
        }
        // 如果需要 Token  
        // const token = store.state.loginModule.user.token; // 获取 Token  
        // if (token) {
        //     config.headers.authorization = `Bearer ${token}`;
        // }
        // 判断token是否存在，存在就添加到请求头上
        // const token = store.state.loginModule.user.token;
        // if(token){
        //     config.headers.authorization = store.state.loginModule.user.token;
        // }
        return config;
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    // 响应拦截器在收到响应后执行。如果响应状态为 200，则解析为成功；
    // 否则，调用 Promise.reject。
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        // 如果响应中存在错误，调用 errorHandle 函数处理错误状态码；
        if (response) {
            console.error('Error status:', response.status);  
            console.error('Error data:', response.data);  
            errorHandle(response.status, response.data);
            return Promise.reject(response);
            // 如果请求被中断，则输出相应的日志。
        } else {
            console.log("请求被中断");
            console.error('Error details:', error);  
        }
    }
)

// get 函数封装了 Axios 的 GET 请求，
// 接受请求的 URL 和参数，返回一个 Promise。
// export function get(url, params) {
//     return new Promise((resolve, reject) => {
//         instance.get(url, {
//             params
//         }).then(res => {
//             // 请求成功时，解析响应数据
//             resolve(res.data);
//         }).catch(err => {
//             // 请求失败时，拒绝 Promise，并返回错误数据
//             reject(err.data);
//         })
//     })
// }
// // post 函数封装了 Axios 的 POST 请求，
// // 接受请求的 URL 和参数，返回一个 Promise。
// export function post(url, params) {
//     return new Promise((resolve, reject) => {
//         instance.post(url, params).then(res => {
//             // 请求成功时，解析响应数据；
//             resolve(res.data)
//         }).catch(err => {
//             // 请求失败时，拒绝 Promise，并返回错误数据
//             reject(err.data)
//         })
//     })
// }

export function get(url, params) {  
    return instance.get(url, { params })  
        .then(res => res.data)  
        .catch(err => Promise.reject(err.response.data));  
}  

export function post(url, params) {  
    return instance.post(url, params)  
        .then(res => res.data)  
        .catch(err => Promise.reject(err.response.data));  
}

export default instance

// 这段代码实现了一个功能强大的 HTTP 请求工具，封装了 Axios 的基本功能，
// 并添加了错误处理、请求和响应拦截器。它允许应用程序通过简单的方法（get 和
// post）进行 API 调用，同时处理身份验证和错误情况。