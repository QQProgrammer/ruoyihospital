<template>
  <div class="everypage">
    <!-- 筛选 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索条件</span>
      </div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-width="75px">
          <el-form-item label="医护账号" prop="account">
            <el-input v-model="ruleForm.account" size="mini" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="医护姓名" prop="realName">
            <el-input v-model="ruleForm.realName" size="mini" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-search" @click="searchmaillist">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetForm('ruleForm')" size="mini">重置</el-button>
            <!-- <el-button type="warning" icon="el-icon-download" @click="handleExport" size="mini">导出</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 列表表格 -->
    <div class="tablemain">
      <el-table
        class="tablecss"
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column prop="account" label="医护账号" min-width="50" align="center"></el-table-column>
        <el-table-column prop="realName" label="医护姓名" min-width="52" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="52" align="center"></el-table-column>
        <el-table-column prop="jobTitle" label="职称" min-width="52" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.jobTitle | capitalizejobTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hospName" label="所属医院" min-width="52" align="center"></el-table-column>
        <el-table-column prop="deptName" label="所属科室" min-width="52" align="center"></el-table-column>
        <el-table-column prop="authStatus" label="认证状态" min-width="60" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.authStatus | capitalizeauthStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="认证时间" min-width="85" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

import {getaddressList} from "@/api/hospital/maillist";

export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 1,
      ruleForm: {
        realName:'',
        account:''
      },
      tableData: [],
      loading: false,
    };
  },
  filters: {
    capitalizejobTitle: function(value) {
      if (value == 0) {
        return "其他";
      } else if (value == 1) {
        return "药师";
      } else if (value == 2) {
        return "住院医师";
      } else if (value == 3) {
        return "主治医师";
      } else if (value == 4) {
        return "副主任医师";
      } else if (value == 5) {
        return "正主任医师";
      } else if (value == 6) {
        return "护士";
      } else if (value == 7) {
        return "护士长";
      } else if (value == 8) {
        return "管理人员";
      }
    },
    capitalizeauthStatus: function(value) {
      if (value == 0) {
        return "未认证";
      } else if (value == 1) {
        return "已认证";
      } else if (value == -1) {
        return "认证失败";
      } else if (value == -2) {
        return "认证失效";
      }
    }
  },
  created() {
    this.getaddressList()
  },
  methods: {
     // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 表格列表
    getaddressList(){
      this.loading = true
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        account: this.ruleForm.account,
        realName: this.ruleForm.realName,
        hospId: sessionStorage.getItem("hospId"),
      };
      getaddressList(params).then(response => {
        this.loading = false
        this.tableData = response.rows;
        this.total = response.total;
      });

    },
    // 切换分页
    handleSizeChange(val) {
      this.pagesize = val
      this.getaddressList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getaddressList()
    }
  }
};
</script>
