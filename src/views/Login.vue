<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Ego商城后台管理系统</span>
      </div>
      <div>
        <!-- tabs滚动标签 里面再去嵌套表单 -->
        <el-tabs v-model="currentIndex" stretch type="border-card" @tab-click="handleTabClick">
          <!-- 登录 -->
          <el-tab-pane label="登录" name="login">
            <!-- 表单 -->
            <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
              <el-form-item label="用户名" label-width="80px" prop="username">
                <el-input type="text" v-model="loginForm.username" />
              </el-form-item>
              <el-form-item label="密码" label-width="80px" prop="password">
                <el-input type="password" v-model="loginForm.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="password" @click="submitForm('loginForm')">提交</el-button>
              </el-form-item>
              <el-button @click="search">获得数据库user表信息</el-button>
            </el-form>
          </el-tab-pane>
          <!-- 注册 -->
          <el-tab-pane label="注册" name="register">
            <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm">
              <el-form-item label="用户名" label-width="80px" prop="username">
                <el-input type="text" v-model="registerForm.username" />
              </el-form-item>
              <el-form-item label="邮箱" label-width="80px" prop="email">
                <el-input type="text" v-model="registerForm.email" />
              </el-form-item>
              <el-form-item label="密码" label-width="80px" prop="password">
                <el-input type="password" v-model="registerForm.password" />
              </el-form-item>
              <!-- <el-form-item label="确认密码" label-width="80px" prop="configurePassword">
                <el-input type="password" v-model="registerForm.configurePassword" />
              </el-form-item> -->
              <el-form-item>
                <el-button type="password" @click="submitForm('registerForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

  </div>

</template>

<script>
import api from '../api'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    // 验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        // 如果用户名为空，调用 callback 并传入一个错误对象，表示校验失败。
        callback(new Error('请输入姓名'))
      } else if (value.length < 4) {
        // 如果用户名长度小于 4 个字符，同样返回一个错误对象。
        callback(new Error('长度不够'))
      } else {
        // 如果用户名符合要求，调用 callback() 表示校验成功。
        callback()
      }
    }
    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        // 如果密码为空，调用 callback 并传入一个错误对象，表示校验失败。
        callback(new Error('请输入密码'))
      } else {
        // 如果密码不为空，调用 callback() 表示校验成功。
        callback()
      }
    }
    const validateCongigurePassWord = (rule, value, callback) => {
      if (value === '') {
        // 如果密码为空，调用 callback 并传入一个错误对象，表示校验失败。
        callback(new Error('请输入密码'))
      } else if (value === this.registerForm.password) {
        callback()
      } else {
        // 如果密码不为空，调用 callback() 表示校验成功。
        callback()
      }
    }
    return {
      currentIndex: 0,
      loginForm: {
        username: 'admin',
        password: '12345'
      },
      registerForm: {
        username: 'hellos',
        password: '123',
        configurePassword: '123',
        email: '123@sxt.cn'
      },
      activeTab: 'login',
      // 定义了一个 rules 对象来定义校验规则
      rules: {
        username: [
          {
            // 规则在validateUserName函数 失焦后触发
            validator: validateUserName, trigger: 'blur'
          }
        ],
        password: [
          {
            validator: validatePassWord, trigger: 'blur'
          }
        ],
        configurePassword: [
          {
            validator: validateCongigurePassWord,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    // 提交表单
    submitForm(formName) {
      // 使用 this.$refs[formName].validate 方法来触发表单的验证
      this.$refs[formName].validate((valid) => {
        // 如果验证通过（valid 为 true）
        if (valid) {
          // 输出当前活动的标签页
          // console.log('当前活动标签页:', this.activeTab);  
          // 登录逻辑
          if (this.activeTab === 'login') {
            // console.log(this.loginForm)
            // 登录
            api.login(this.loginForm).then(res => {
              if (res.data.status === 200) {
                // 成功逻辑
                // console.log(res)
                this.setUser(res.data);
                // 本地存储
                localStorage.setItem('ego', JSON.stringify(res.data))
                // 跳转至首页
                this.$router.push('/')
              } else {
                // 失败逻辑
                // Element-ui的提示框
                const h = this.$createElement;
                this.$notify({
                  title: '登录失败',
                  message: h('i', '用户名密码错误')
                });
              }
            })
          }
          // 注册逻辑
          if (this.activeTab === 'register') {
            // console.log('输出注册表单数据:', this.registerForm);
            api.register(this.registerForm).then(res => {
              if (res.data.status === 200) {
                const h = this.$createElement;
                this.$notify({
                  title: '注册成功',
                  message: h('i', '请前往登录页面登录')
                });
              } else {
                // Element-ui的提示框
                const h = this.$createElement;
                this.$notify({
                  title: '注册失败',
                  message: h('i', '请重新注册')
                });
              }
            })
          }
          // 如果验证失败（valid 为 false），则不进行任何操作。
        } else {
          return;
        }
      })
    },
    // 返回数据库数据事件
    search() {
      api.search().then(res => {
        console.log(res)
      }).catch(err => {
        console.error('获取失败:', err)
      })
    },
    // 切换登录注册选项卡的事件
    handleTabClick(tab) {
      // console.log(tab)
      // console.log(tab.name)
      // tab.name的作用 用来区分登录还是注册
      this.activeTab = tab.name
    }
  }
}

</script>

<style scoped lang="less">
.login {
  width: 1200px;
  margin: 0 auto;
  .box-card {
    width: 500px;
    margin: 100px auto;
  }
}
</style>
