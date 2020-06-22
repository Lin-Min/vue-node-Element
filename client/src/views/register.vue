<template>
  <div class="register">
    <section class="form_container">
      <div class="man_tip">
        <span class="title">小智后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerUser"
          label-width="80px"
          class="regise_form"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入你的email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="toPassword">
            <el-input type="password" v-model="registerUser.toPassword" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item label="选择身份" prop="idCart">
            <el-select v-model="registerUser.idCart" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="emplay"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerUser')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  data() {
    const verifyPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.registerUser.toPassword !== "") {
          this.$refs.registerUser.validateField("checkPass");
        }
        callback();
      }
    };
    const verifyPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        toPassword: "",
        idCart: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "email不能为空", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        password: [
          { required: true, validator: verifyPass, trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在 6 到 16 之间", trigger: "blur" }
        ],
        toPassword: [
          { required: true, validator: verifyPass2, trigger: "blur" }
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
           this.$axios.post('/api/user/register',this.registerUser)
           .then(res => {
             this.$message({
               message: '账号注册成功',
               type: 'success'
             })
             this.$router.push('/login')
           })
           .catch(err => {
             console.error(err); 
           })
           
          } else {
            console.log('error submit!!');
            return false;
          }

        });
      }
  }
};
</script>

<style scoped>
.register {
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

.regise_form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.submit_btn {
  width: 100%;
}
</style>