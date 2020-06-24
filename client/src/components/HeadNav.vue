<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img class="logo" src="@a/logo.png" />
        <span class="title">小民后台管理系统</span>
      </el-col>
      <el-col :span="6" class="i-user">
        <div class="userinfo">
          <el-avatar  class="avatar" :size="40" :src="user.avatar"></el-avatar>
          <!-- <img class="avatar" :src="user.avatar" alt="" /> -->
          <div class="i-welcome">
            <p class="name come_name">欢迎</p>
            <p class="name avatar_name">{{user.name}}</p>
          </div>
          <span class="user_name">
            <el-dropdown trigger="click" @command="setDaInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import x from ''
export default {
  name: "head-nav",
  components: {},
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    setDaInfo (comment) {
      switch (comment) {
        case 'info':
          this.showInfoList()
          break;
        default:
          this.logout()
          break;
      }
    },
      showInfoList () {
        this.$router.push('/info')
      },
      logout () {
        localStorage.removeItem('leToken')
        this.$store.dispatch('clearStatus')
        this.$router.push('/login')
      }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}

.logo-container {
  line-height: 60px;
  min-width: 400px;
}

.logo{
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}

.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 3px;
}
.i-user {
  line-height: 40px;
  text-align: right;
  float: right;
  padding: 10px;

}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.i-welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.come_name {
  font-size: 12px;
}


.avatar_name {
  color: #409eff;
  font-weight: bolder;
}

.user_name {
  cursor: pointer;
  margin-right: 5px;
}

.el-dropdown {
  color: #fff;
}
</style>