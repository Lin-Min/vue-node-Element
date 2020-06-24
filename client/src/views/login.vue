<template>
  <div class="login">
    <section class="form_container">
      <div class="man_tip">
        <span class="title">小民后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginUser"
          label-width="80px"
          class="login_form"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入你的email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份" prop="idCart">
            <el-select v-model="loginUser.idCart" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="emplay"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginUser')">登录</el-button>
          </el-form-item>
          <div class="foot_zh">
            <p>还没有账号? 现在<router-link to="/register">注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// 解析token
import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
        idCart: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入email", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        password: [
          { required: true,message: "请输入密码", trigger: "blur" }
        ],
        idCart: [{ required: true, message: "请选择身份", trigger: "change" }]
      }
    };
  },
  computed: {},
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$axios.post('/api/user/login',this.loginUser)
           .then(res => {
            //  console.log(res);
            // 获取token
            const { token } = res.data
            // 储存到本地
            localStorage.setItem('leToken', token)

            // 解析token
            const decode = jwt_decode(token)
            // console.log(decode);

            // token 储存到vuex中
            this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
            this.$store.dispatch('setUser',decode)
            
             this.$message({
               message: '登录成功',
               type: 'success'
             })
             this.$router.push('/index')
           })
           .catch(err => {
             console.error(err); 
           })
          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },
      isEmpty (value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        )
      }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  widows: 100%;
  height: 100%;
  background: url(../assets/base.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 468px;
  position: absolute;
  top: 10%;
  left: 35%;
  padding: 25px;
  border-radius: 6px;
  text-align: center;
}
.form_container .man_tip .title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: blod;
  color: #fff;
  font-size: 26px;
}

.login_form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 50px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.submit_btn {
  width: 100%;
}

.foot_zh {
  text-align: right;
  /* text-decoration: none; */
  font-size: 14px;
  color: #333;
}

.foot_zh p a {
  color: #409cff;
}
</style>