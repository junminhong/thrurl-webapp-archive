<template>
  <el-container>
    <el-header style="background-color: #87cefa"><Header></Header></el-header>
    <el-main style="width: 50%; margin: auto; padding-top: 5%">
      <transition name="el-zoom-in-center">
        <el-card body-style="margin: auto" v-show="show">
          <el-row type="flex" justify="center">
            <div style="font-size: 40px; padding-top: 30px; padding-bottom: 5%">
              Welcome to Back！
            </div>
          </el-row>
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            :label-position="labelPosition"
          >
            <el-form-item label="信箱" prop="email">
              <el-input
                type="email"
                v-model="loginForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密碼" prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button type="text" style="padding-bottom: 5%"
              >忘記密碼？</el-button
            >
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')"
                >登入</el-button
              >
            </el-form-item>
            <hr />
            <el-button type="text" @click="testShow()"
              >為自己註冊一組帳號吧！</el-button
            >
          </el-form>
        </el-card>
      </transition>
      <transition name="el-zoom-in-center">
        <el-card body-style="margin: auto" v-show="show1">
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="100px"
            :label-position="labelPosition"
          >
            <el-form-item label="信箱2" prop="pass">
              <el-input
                type="email"
                v-model="registerForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="registerForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button type="text" style="padding-bottom: 5%"
              >忘記密碼？</el-button
            >
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
            <hr />
            <el-button type="text" @click="testShow1()"
              >為自己註冊一組帳號吧！</el-button
            >
          </el-form>
        </el-card>
      </transition>
    </el-main>
    <!--<el-footer style="background-color: black; color: #fffafa">
      <el-row type="flex" justify="center">
        © 2022 Copyright: junmin.hong
      </el-row>
    </el-footer>-->
  </el-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        if (rule.field === 'email') {
          callback(new Error('請輸入信箱'))
        } else if (rule.field === 'password') {
          callback(new Error('請輸入密碼'))
        }
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: '',
        checkPass: '',
      },
      registerForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{ validator: validatePass, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
      },
      labelPosition: 'top',
      show: true,
      show1: false,
    }
  },
  mounted() {
    this.checkLogin()
  },
  methods: {
    async checkLogin() {
      if (this.$cookies.get('access_token') !== null) {
        await this.$axios
          .$post(
            '/api/v1/member/token-auth',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$cookies.get('access_token'),
              },
            }
          )
          .then((result) => {
            this.$router.push('/')
          })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      await this.$axios
        .$post('/api/v1/member/login', {
          email: this.loginForm.email,
          password: this.loginForm.password,
        })
        .then((result) => {
          this.$cookies.set('access_token', result.data.access_token, '1h')
          this.$router.push('/')
        })
        .catch((error) => {
          let msg = ''
          switch (error.response.data.message) {
            default:
              msg = error.response.data.message
              break
          }
          this.$notify({
            title: '會員登入系統訊息',
            message: msg,
            type: 'error',
            duration: 4500,
          })
        })
    },
    testShow() {
      const show = this
      this.show = !this.show
      setTimeout(function () {
        show.show1 = !show.show1
      }, 400)
    },
    testShow1() {
      const show = this
      this.show1 = !this.show1
      setTimeout(function () {
        show.show = !show.show
      }, 400)
    },
    gotoHomePage() {
      this.$router.push('/')
    },
  },
}
</script>

<style scope>
* {
  margin: 0px;
}
</style>
