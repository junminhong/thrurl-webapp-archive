<template>
  <el-container>
    <el-header style="background-color: #87cefa"><Header></Header></el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane label="縮短網址">
          <el-card
            shadow="always"
            body-style="width: 80%; margin: auto; height: 100%;"
          >
            <el-row type="flex" justify="center">
              <div
                style="font-size: 40px; padding-top: 30px; padding-bottom: 5%"
              >
                輕鬆產生屬於你的短網址
              </div>
            </el-row>
            <el-input
              placeholder="請輸入你的網址"
              v-model="sourceUrl"
              style="font-size: 1.5em"
            >
              <template slot="prepend">https://</template>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="shortUrlHandler()"
                >縮址</el-button
              >
            </el-input>
            <el-alert
              title="登入會員可使用更多豐富的功能"
              type="success"
              :closable="false"
            ></el-alert>
            <el-form
              v-show="false"
              style="
                margin: auto;
                width: 50%;
                padding-bottom: 5%;
                padding-top: 5%;
              "
              :label-position="labelPosition"
            >
              <el-form-item label="A/B測試：">
                <el-row>
                  <el-col :span="16"
                    ><el-input placeholder="B指向網址"></el-input
                  ></el-col>
                  <el-col :span="8">
                    <el-input placeholder="出現機率">
                      <template slot="append">%</template>
                    </el-input></el-col
                  >
                </el-row>
              </el-form-item>
              <el-form-item label="點擊成效：">
                <el-switch
                  v-model="value1"
                  active-text="開啟"
                  inactive-text="不開啟"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="有效期限：">
                <el-date-picker
                  type="date"
                  placeholder="選擇有效期限"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-form> </el-card
        ></el-tab-pane>
        <el-tab-pane label="開發者的話">
          您好，我是<a
            href="https://www.cakeresume.com/me/junminhong1110"
            target="_blank"
            >洪鈞閔(junmin.hong)</a
          >，是這個平台的開發者。
          <p>如果你也喜歡本平台提供的服務，可以透過贊助的方式支持我！</p>
        </el-tab-pane>
      </el-tabs>
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
  name: 'IndexPage',
  data() {
    return {
      sourceUrl: '',
      value1: true,
      labelPosition: 'top',
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
    async shortUrlHandler() {
      await this.$axios
        .$post(
          '/api/v1/short-url',
          {
            source_url: this.sourceUrl,
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$cookies.get('access_token'),
            },
          }
        )
        .then((result) => {
          console.log(result)
          if (result.data !== '') {
            // 有資料
            this.$notify({
              title: '已成功生成短網址',
              message: result.data.short_url,
              type: 'success',
              duration: 0,
            })
          } else {
            this.$notify({
              title: '短網址生成失敗',
              message: result.data.message,
              type: 'error',
              duration: 0,
            })
          }
        })
        .catch((error) => {
          let msg = ''
          switch (error.response.data.message) {
            case '無效的網址連結':
              msg = '請確定你的網址是有效連結'
              break
            default:
              msg = error.response.data.message
              break
          }
          this.$notify({
            title: '短網址生成失敗',
            message: msg,
            type: 'error',
            duration: 0,
          })
        })
      this.sourceUrl = ''
    },
    testUpload(file) {
      if (file.size / 1000000 > 1) {
        this.$notify({
          title: '照片上傳錯誤',
          message: '目前只能上傳最大10MB的照片',
          type: 'error',
        })
        return false
      }
      if (this.imageUploadAmount > 0) {
        this.$notify({
          title: '照片上傳錯誤',
          message: '只能上傳一張圖片喔',
          type: 'error',
        })
        return false
      }
      this.imageUploadAmount += 1
    },
    removeUpload(file, fileList) {
      this.imageUploadAmount = fileList.length
    },
    successUpload(response, file, fileList) {
      this.$notify({
        title: '已成功上傳圖片並生成短網址',
        message: '圖片的url',
        type: 'success',
        duration: 0,
      })
    },
    gotoLoginPage() {
      this.$router.push('/login')
    },
    gotoUrlCenter() {
      console.log('a')
      this.$router.push('/url-center')
    },
  },
}
</script>
<style scope>
* {
  margin: 0px;
}
.el-footer {
  padding-top: 30px;
}
</style>
