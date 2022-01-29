<template>
  <el-container>
    <el-header style="background-color: #87cefa"><Header></Header></el-header>
    <el-main style="width: 80%; margin: auto; padding-top: 5%">
      <el-table
        :data="
          allUrlList.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="短網址">
                <span>{{ props.row.shorten_id }}</span>
              </el-form-item>
              <el-form-item label="原始網址">
                <span>{{ props.row.source }}</span>
              </el-form-item>
              <el-form-item label="B原始網址">
                <span>{{ props.row.source_b }}</span>
              </el-form-item>
              <el-form-item label="B網址出現機率(%)">
                <span>{{ props.row.source_b_percent }}</span>
              </el-form-item>
              <el-form-item label="點擊成效">
                <span>{{ props.row.who_click }}</span>
              </el-form-item>
              <el-form-item label="過期時間">
                <span>{{ props.row.expired }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="短網址" prop="shorten_id"> </el-table-column>
        <el-table-column label="原始網址" prop="source"> </el-table-column>
        <el-table-column label="點擊數" prop="click_count"> </el-table-column>
        <el-table-column fixed="right" label="功能">
          <template slot-scope="scope">
            <el-button
              size="medium"
              @click="handleEdit(scope.$index, scope.row)"
              >編輯</el-button
            >
            <el-button
              size="medium"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="短網址資料編輯器"
        :visible.sync="dialogFormVisible"
      >
        <el-form>
          <el-form-item label="短網址">
            <el-input
              disabled
              autocomplete="off"
              v-model="url.shorten_id"
            ></el-input>
          </el-form-item>
          <el-form-item label="原始網址">
            <el-input autocomplete="off" v-model="url.source"></el-input>
          </el-form-item>
          <el-form-item label="B原始網址">
            <el-input autocomplete="off" v-model="url.source_b"></el-input>
          </el-form-item>
          <el-form-item label="B網址出現機率(%)">
            <el-input
              autocomplete="off"
              v-model="url.source_b_percent"
            ></el-input>
          </el-form-item>
          <el-form-item label="點擊成效">
            <el-switch v-model="url.who_click"></el-switch>
          </el-form-item>
          <el-form-item label="過期時間">
            <el-date-picker v-model="url.expired" type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveData()">儲存</el-button>
        </div>
      </el-dialog>
      <el-pagination
        :hide-on-single-page="true"
        background
        layout="prev, pager, next"
        :total="page"
      >
      </el-pagination>
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
  name: 'UrlCenterPage',
  data() {
    return {
      search: '',
      dialogFormVisible: false,
      page: 0,
      allUrlList: [],
      url: {},
    }
  },
  mounted() {
    this.checkLogin()
    this.getAllUrlPage()
    this.getAllUrlList()
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
          .catch(() => {
            this.$router.push('/')
          })
      }
    },
    async getAllUrlPage() {
      await this.$axios
        .get('/api/v1/url-paginate', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('access_token'),
          },
        })
        .then((result) => {
          this.page = result.data.data
          console.log(result)
        })
    },
    async getAllUrlList() {
      await this.$axios
        .get('/api/v1/url-list', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('access_token'),
          },
        })
        .then((result) => {
          console.log(result)
          this.allUrlList = result.data.data
        })
    },
    gotoHomePage() {
      this.$router.push('/')
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogFormVisible = true
      this.url = row
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async saveData() {
      const urlData = {
        shorten_id: this.url.shorten_id,
        source_url: this.url.source,
        source_url_b: this.url.source_b,
        b_url_percent: this.url.source_b_percent,
        who_click: this.url.who_click,
        expired: this.url.expired,
      }
      await this.$axios
        .$post('/api/v1/edit-url', urlData, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('access_token'),
          },
        })
        .then((result) => {
          console.log(result)
        })
      this.dialogFormVisible = false
    },
  },
}
</script>

<style scope>
* {
  margin: 0px;
}
</style>
