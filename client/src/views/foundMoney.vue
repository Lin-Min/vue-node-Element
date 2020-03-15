<template>
  <div class="funMoney">
    <div>
      <el-form :inline="true" ref="searchData" :model="searchData">
        <el-form-item label="按时间筛选:">
          <el-date-picker v-model="searchData.startTime" type="datetime" placeholder="选择开始日期"></el-date-picker>
          --
          <el-date-picker v-model="searchData.endTime" type="datetime" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnAdd">
          <el-button type="primary" v-if="user.idCart === 'manager'" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_content">
      <el-table
        :row-style="{height:'20px', fontSize:'13px'}"
        max-height="460"
        border
        v-if="tableData.length >0 "
        :default-sort="{prop: 'date'}"
        :data="tableData"
        style="width:100%;"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column sortable prop="date" label="创建时间" align="center" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="140"></el-table-column>
        <el-table-column prop="describes" label="收支描述" align="center" width="153"></el-table-column>
        <el-table-column prop="incomes" label="收入" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.incomes }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expends" label="支出" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expends }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户余额" align="center" width="140">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" align="center" width="160"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" width="160" v-if="user.idCart === 'manager'">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-pagination
              v-if="pageLayout.total > 0"
              :page-sizes="pageLayout.page_sizes"
              :page-size="pageLayout.page_size"
              :layout="pageLayout.layout"
              :total="pageLayout.total"
              :current-page.sync="pageLayout.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <dialog-Info :dialogAdd="dialogAdd" :formData="formData" @update="getProfile()"></dialog-Info>
  </div>
</template>

<script>
import dialogInfo from "@c/dialogInfo"
export default {
  name: "foundMoney",
  components: {
    dialogInfo
  },
  data() {
    return {
      searchData:  {
        startTime: '',
        endTime: ''
      },
      // 查询的过滤
      filterData: [],
      tableData: [],
      allTableData: [],
      pageLayout: {
        page_index: 1,
        total: 10,
        page_size: 5,
        page_sizes: ["5", "10", "15", "20"],
        layout: "total, sizes, prev,  pager, next, jumper"
      },
      formData: {
        type: "",
        describes: "",
        incomes: "",
        expends: "",
        cash: "",
        remarks: ""
      },
      dialogAdd: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  created() {
    this.getProfile();
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          this.allTableData = res.data;
          this.filterData = res.data
          this.setPaginations();
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.dialogAdd = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describes: row.describes,
        incomes: row.incomes,
        expends: row.expends,
        cash: row.cash,
        remarks: row.cash,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profile/delete/${row._id}`)
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getProfile();
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleAdd() {
      (this.dialogAdd = {
        show: true,
        title: "添加信息",
        option: "add"
      }),
        (this.formData = {
          type: "",
          describes: "",
          incomes: "",
          expends: "",
          cash: "",
          remarks: "",
          id: ""
        });
    },
    setPaginations() {
      this.pageLayout.total = this.allTableData.length;
      this.pageLayout.page_index = 1;
      this.pageLayout.page_size = 5;

      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pageLayout.page_size;
      });
    },
    handleCurrentChange(page) {
      console.log(page);
      let index = this.pageLayout.page_size * (page - 1);
      console.log(index);
      let nums = this.pageLayout.page_size * page;

      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSizeChange(page_size) {
      // 切换size
      this.pageLayout.page_index = 1;
      this.pageLayout.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleSearch () {
      console.log(this.searchData.startTime);
      
      if (!this.searchData.startTime || !this.searchData.endTime) {
        this.$message ({
          type: 'warnimg',
          message: '请选择时间区'
        })
        this.getProfile()
        return;
      }

      const startTime = this.searchData.startTime.getTime()
      const endTime = this.searchData.endTime.getTime()

      this.allTableData  = this.filterData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= startTime && time <= endTime
      })

    // 分页数据
    this.setPaginations()
    }
  }
};
</script>

<style scoped>
.funMoney {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnAdd {
  float: right;
}

.el-table--border::after {
  width: 0px !important;
}

.block {
  margin-top: 10px;
  text-align: right;
}
</style>