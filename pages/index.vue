<template>
  <el-container>
    <el-header style="background-color: #87cefa">
      <el-row type="flex" align="middle">
        <el-col :span="19"><div style="font-size: 2em">Thrurl</div></el-col>
        <el-col :span="3"
          ><el-button
            icon="el-icon-chat-dot-round"
            type="primary"
            @click="aboutDeveloper()"
            >開發者的話</el-button
          ></el-col
        >
        <el-col :span="2"
          ><el-button
            v-show="false"
            icon="el-icon-unlock"
            type="primary"
            @click="gotoLoginPage()"
            >登入</el-button
          >

          <el-dropdown trigger="click" style="padding-top: 5%">
            <span class="el-dropdown-link">
              <el-avatar src="/assets/png/user.png"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Hi, username</el-dropdown-item>
              <el-dropdown-item divided></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
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
            <el-form
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
        <el-tab-pane label="縮短圖片">
          <el-card
            shadow="always"
            body-style="width: 80%; margin: auto; height: 100%;"
          >
            <el-row type="flex" justify="center">
              <div
                style="font-size: 40px; padding-top: 30px; padding-bottom: 5%"
              >
                簡單分享你的有趣照片
              </div>
            </el-row>
            <el-row type="flex" justify="center">
              <el-upload
                class="upload-demo"
                drag
                action=""
                :before-upload="testUpload"
                :on-remove="removeUpload"
                :on-success="successUpload"
                accept=".png, .jpg, .jpeg"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  將照片拖曳到此處，或<em>點擊上傳</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  只能上傳jpg/png文件，且不超過10MB
                </div>
              </el-upload>
            </el-row>
            <el-form
              style="
                margin: auto;
                width: 50%;
                padding-bottom: 5%;
                padding-top: 5%;
              "
              :label-position="labelPosition"
            >
              <el-form-item label="密碼保護">
                <el-input placeholder="密碼保護"></el-input>
              </el-form-item>
              <el-form-item label="密碼提示">
                <el-input placeholder="密碼提示"></el-input>
              </el-form-item>
              <el-form-item label="有效期限">
                <el-date-picker
                  type="date"
                  placeholder="選擇有效期限"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-form> </el-card
        ></el-tab-pane>
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
      imageUploadAmount: 0,
      value1: true,
      labelPosition: 'top',
      haveToken: '',
    }
  },
  mounted() {
    this.haveToken = !this.$cookies.isKey('access_token')
  },
  methods: {
    async shortUrlHandler() {
      const result = await this.$axios.$post('/api/v1/short-url', {
        source_url: this.sourceUrl,
      })
      this.$notify({
        title: '已成功生成短網址',
        message: result.data.short_url,
        type: 'success',
        duration: 0,
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
    aboutDeveloper() {
      this.$alert(
        '您好，我是<a href="https://www.cakeresume.com/me/junminhong1110" target="_blank">洪鈞閔(junmin.hong)</a>，是這個平台的開發者。<p>如果你也喜歡本平台提供的服務，可以透過贊助的方式支持我！</p>',
        '開發者的話',
        {
          confirmButtonText: '了解',
          dangerouslyUseHTMLString: true,
        }
      )
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
