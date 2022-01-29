<template>
  <el-row type="flex" align="bottom">
    <el-col :span="22"
      ><div style="font-size: 2em" @click="gotoHomePage()">Thrurl</div></el-col
    >
    <el-col :span="2"
      ><el-button
        icon="el-icon-unlock"
        type="primary"
        @click="gotoLoginPage()"
        style="margin-top: 5%"
        v-show="!haveToken"
        >登入</el-button
      >
      <el-dropdown v-show="haveToken" trigger="click" style="padding-top: 5%">
        <span class="el-dropdown-link">
          <el-avatar src="/assets/png/user.png"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Hi, username</el-dropdown-item>
          <el-dropdown-item @click.native="gotoUrlCenter()"
            >控制台</el-dropdown-item
          >
          <el-dropdown-item @click.native="logout()" divided>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'HeaderPage',
  data() {
    return {
      haveToken: '',
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
            this.haveToken = true
          })
          .catch(() => {
            this.haveToken = false
          })
      }
    },
    gotoHomePage() {
      this.$router.push('/')
    },
    gotoLoginPage() {
      this.$router.push('/login')
    },
    gotoUrlCenter() {
      this.$router.push('/url-center')
    },
    logout(){
      this.$cookies.remove('access_token')
      this.$router.push('/')
      this.$router.go(0)
    }
  },
}
</script>

<style scope>
* {
  margin: 0px;
}
</style>
