import router from './index'

// router.beforeEach((to, from, next) => {
//     if (to.meta.isLogin) {
//         let token = false;
//         next()
//         if (token) {
//             next()
//         } else {
//             next({
//                 name: 'Login'
//             })
//         }
//     } else {
//         next()
//     }
// })