<template>
  <div class='show_info'>
   <el-row type="flex" class="row-bg" justify="center">
     <el-col :span="10" >
       <div class="user">
         <img :src="user.avatar" alt="" />
         </div>
     </el-col>
     <el-col  :span="18">
       <div class="user_info">
         <div class="user-item">
           <i class="u-vart el-icon-s-custom" ></i>
           <span>{{user.name}}</span>
         </div>
         <div class="user-item">
           <i class="u-vart u-icon el-icon-s-tools"></i>
           <span>{{user.idCart === 'manager' ? '管理员' : '普通员工'}}</span>
         </div>
       </div>
     </el-col>
   </el-row>
  </div>
</template>

<script>
  export default {
   name: 'info',
    computed:  {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style scoped>
.show_info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.user_info {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>