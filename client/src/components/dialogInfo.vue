<template>
  <div class="dialogInfo">
    <el-dialog
      :title="dialogAdd.title"
      :visible.sync="dialogAdd.show"
      :close-on-click-modal="false"
      :close-press-escape="false"
      :close-append-to-body="false"
    >
      <el-form
        ref="formData"
        :model="formData"
        :rules="form_rules"
        label-width="120px"
        style="margin:10px;width:auto;"
      >
        <el-form-item label="收支类型">
          <el-select v-model=" formData.type" placeholder="请选择类型">
            <el-option
              v-for="(formtype, index) in form_type_list"
              :label="formtype"
              :value="formtype"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="describes">
          <el-input v-model=" formData.describes " autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="incomes">
          <el-input v-model="formData.incomes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expends">
          <el-input v-model="formData.expends" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户余额:" prop="cash">
          <el-input v-model="formData.cash" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="formData.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <div class="foot-button">
          <el-form-item class="btn_foot">
            <el-button @click="dialogAdd.show = false">取 消</el-button>
            <el-button type="primary" @click="submitData('formData')">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogInfo",
  props: {
    dialogAdd: {
      type: Object,
      default () {
        return {}
      }
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      form_type_list: ["提现", "优惠券", "充值", "充值优惠"],
      form_rules: {
        describes: [
          { required: true, message: "收支描述不能为空", trigger: "blur" }
        ],
        incomes: [{ required: true, message: "收入不能为空", trigger: "blur" }],
        expends: [{ required: true, message: "支出不能为空", trigger: "blur" }],
        cash: [{ required: true, message: "账户余额不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitData(form) {
      this.$refs[form].validate(valid => {
        const url =
          this.dialogAdd.option == "add" ? "add" : `edit/${this.formData.id}`;
        this.$axios
          .post(`/api/profile/${url}`, this.formData)
          .then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.dialogAdd.show = false;
            this.$emit("update")
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.foot-button {
  width: 100%;
  height: 50px;
  position: relative;
}

.btn_foot {
  position: absolute;
  right: 0;
  top: 20px;
}
</style>
