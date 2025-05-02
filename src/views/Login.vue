<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Ego商城后台管理系统</span>
        <el-button type="primary" @click="gotoLayout">去登录页</el-button>
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
            </el-form>
          </el-tab-pane>
          <!-- 注册 -->
          <el-tab-pane label="注册" name="register">
            <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm">
              <el-form-item label="用户名" label-width="80px" prop="username">
                <el-input type="text" v-model="registerForm.username" />
              </el-form-item>
              <el-form-item label="密码" label-width="80px" prop="password">
                <el-input type="password" v-model="registerForm.password" />
              </el-form-item>
              <el-form-item label="确认密码" label-width="80px" prop="configurePassword">
                <el-input type="password" v-model="registerForm.configurePassword" />
              </el-form-item>
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

export default {
  name: 'Login',
  data() {
    // 验证规则
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        // 如果用户名为空，调用 callback 并传入一个错误对象，表示校验失败。
        callback(new Error('请输入姓名'))
      } else if (value.length < 6) {
        // 如果用户名长度小于 6 个字符，同样返回一个错误对象。
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
    var validateCongigurePassWord = (rule, value, callback) => {
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
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        configurePassword: ''
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
    // 去Layout页面
    gotoLayout() {
      this.$router.push('/');
    },
    // 提交表单
    submitForm(formName) {
      // 使用 this.$refs[formName].validate 方法来触发表单的验证
      this.$refs[formName].validate((valid) => {
        // 如果验证通过（valid 为 true）
        if (valid) {
          // 输出当前活动的标签页
          // console.log('当前活动标签页:', this.activeTab);  
          if (this.activeTab === 'login') {
            console.log('输出登录表单数据:', this.loginForm);
          }
          if (this.activeTab === 'register') {
            console.log('输出注册表单数据:', this.registerForm);
          }
          // 如果验证失败（valid 为 false），则不进行任何操作。
        } else {
          return;
        }
      })
    },
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
