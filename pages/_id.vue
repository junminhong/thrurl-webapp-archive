<template>
  <el-container>
    <el-main style="margin: auto; padding-top: 5%">
      <el-card style="width: 50%; margin: auto" body-style="margin: auto;">
        <el-row type="flex" justify="center">
          <div style="font-size: 40px; padding-top: 30px; padding-bottom: 5%">
            Thrurl網站安全檢查
          </div>
        </el-row>
        <el-row style="padding-bottom: 2%">
          您將前往：{{ this.sourceUrl }}
        </el-row>
        <el-row style="padding-bottom: 2%">
          檢查結果：
          <el-tag :type="urlStatus" effect="dark">{{
            this.maliceResult
          }}</el-tag>
        </el-row>
        <el-row style="padding-bottom: 2%">
          <el-collapse>
            <el-collapse-item title="詳細資訊">
              <div>為保障用戶的資訊安全，本平台將會自動檢查短網址安全性</div>
              <div>檢測結果僅代表該網站『可能』含有惡意成分</div>
            </el-collapse-item>
          </el-collapse>
        </el-row>
        <el-row type="flex" justify="center" style="padding-bottom: 2%">
          <el-button @click="gotoHomePage()" style="margin-right: 10px">返回Thrurl</el-button>
          <a :href="this.sourceUrl"><el-button :type="urlStatus" @click="gotoShortUrl">繼續前往</el-button></a>
        </el-row>
        <el-row type="flex" justify="center" style="padding-bottom: 2%">
          This protection is provided by Thrurl
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'CheckUrlPage',
  data() {
    return {
      sourceUrl: '',
      malice: false,
      maliceResult: 'PASS',
      urlStatus: 'success',
    }
  },
  mounted() {
    this.checkUrlSafe()
  },
  methods: {
    async checkUrlSafe() {
      await this.$axios
        .get('/api/v1/check-url?shorten_id=' + this.$route.params.id)
        .then((result) => {
          if (result.data.data.malice) {
            this.maliceResult = 'FAILED'
            this.urlStatus = 'danger'
          }
          this.sourceUrl = result.data.data.source
          if (this.sourceUrl === '') {
            this.$router.push('/')
          }
        })
    },
    gotoHomePage() {
      this.$router.push('/')
    },
    gotoShortUrl(){
        this.$axios
        .get('/api/v1/goto-url?shorten_id=' + this.$route.params.id)
    }
  },
}
</script>
