<template>
  <el-card shadow="always" body-style="width: 80%; margin: auto; height: 100%;">
    <el-row type="flex" justify="center">
      <div style="font-size: 40px; padding-top: 30px; padding-bottom: 5%">
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
        <div class="el-upload__text">將照片拖曳到此處，或<em>點擊上傳</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上傳jpg/png文件，且不超過10MB
        </div>
      </el-upload>
    </el-row>
    <el-form
      style="margin: auto; width: 50%; padding-bottom: 5%; padding-top: 5%"
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
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'ShortPicPage',
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scope>
* {
  margin: 0px;
}
</style>
