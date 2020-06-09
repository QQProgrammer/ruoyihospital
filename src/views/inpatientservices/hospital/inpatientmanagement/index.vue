<template>
<!-- 住院管理
 -->
  <div class="everypage">
    <!-- 筛选 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索条件</span>
      </div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-width="85px">
          <el-form-item label label="科室筛选" prop="deptId">
            <el-select v-model="ruleForm.deptId" clearable size="mini" placeholder="请选择">
            <el-option
              v-for="item in selectAllHospDeptArr"
              :key="item.id"
              :label="item.deptName"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="状态"  prop="visitState">
            <el-select v-model="ruleForm.visitState" placeholder="请选择" size="mini">
              <el-option label="排队" value="1"></el-option>
              <el-option label="在院" value="2"></el-option>
              <el-option label="出院" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="search" icon="el-icon-search">搜索</el-button>
            <el-button @click="resetForm('ruleForm')" icon="el-icon-refresh" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
<!-- 统计汇总 -->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总住院人数</span>
            <el-button style="float: right; padding: 3px 0" type="text">个</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="visitCount.ddtCount" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>总出院人数</span>
            <el-button style="float: right; padding: 3px 0" type="text">个</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="visitCount.patCount" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>排队人数</span>
            <el-button style="float: right; padding: 3px 0" type="text">个</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="visitCount.checkFailCount" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 列表表格 -->
    <div class="tablemain">
      <el-table
        class="tablecss"
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="patName" label="患者姓名" width="74" align="center"></el-table-column>
        <el-table-column prop="linkPhone" label="患者电话" min-width="52" align="center"></el-table-column>
        <el-table-column prop="age" label="患者年龄" width="74" align="center"></el-table-column>
        <el-table-column prop="hospName" label="医院名称" min-width="52" align="center"></el-table-column>
        <el-table-column prop="deptName" label="科室名称" min-width="52" align="center"></el-table-column>
        <el-table-column prop="bedCode" label="病床编号" width="74" align="center"></el-table-column>
        <el-table-column prop="authStatus" label="状态" width="74" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.authStatus | capitalizeisauthStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="入院时间" min-width="52" align="center"></el-table-column>
        <el-table-column prop="admCondition" label="入院病情" min-width="52" align="center"></el-table-column>
        <el-table-column prop="ddtTime" label="出院时间" min-width="52" align="center"></el-table-column>
        <el-table-column prop="treatResult" label="治疗结果" min-width="52" align="center"></el-table-column>
        <el-table-column prop="treatDays" label="治疗天数" min-width="52" align="center"></el-table-column>
        <el-table-column prop="diagnosisDesc" label="诊断描述" min-width="52" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="seeDetail(scope.row)" size="mini">查看</el-button>
          </template>
        </el-table-column>
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
    <!-- 详情弹窗 -->
    <el-dialog title="查看详情" :visible.sync="dialogVisible" width="60%">
      <div>
        <div class="twocolumn">
          <p>医院详情</p>
          <div class="twocolumnlist">
            <div>
              <p>患者姓名：{{inpatientservicesdetail.patName}}</p>
              <p>患者电话：{{inpatientservicesdetail.linkPhone}}</p>
            </div>
            <div>
              <p>患者年龄：{{inpatientservicesdetail.age}}</p>
              <p>医院名称：{{inpatientservicesdetail.hospName}}</p>
            </div>
            <div>
              <p>科室名称：{{inpatientservicesdetail.deptName}}</p>
              <p>病床编号：{{inpatientservicesdetail.bedCode}}</p>
            </div>
            <div>
              <p>入院病情：{{inpatientservicesdetail.admCondition}}</p>
              <p>状态：{{inpatientservicesdetail.authStatus | capitalizeisauthStatus}}</p>
            </div>
            <div>
              <p>入院时间：{{inpatientservicesdetail.addTime}}</p>
              <p>出院时间：{{inpatientservicesdetail.ddtTime}}</p>
            </div>
            <div>
              <p>治疗结果：{{inpatientservicesdetail.treatResult}}</p>
              <p>治疗天数：{{inpatientservicesdetail.treatDays}}</p>
            </div>
            <div>
              <p>诊断描述：{{inpatientservicesdetail.diagnosisDesc}}</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getHosTypeList,selectAllHospDepts} from "@/api/hospital/hospitalmanagement";
import {getpatVisitList,getpatVisitCount} from "@/api/inpatientservices/inpatientmanagement";
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 1,
      selectAllHospInfoArr:[], //医院列表
      selectAllHospDeptArr:[], //科室列表
      tableData: [],
      dialogVisible: false,
      loading: false,
      inpatientservicesdetail:{},
      visitCount:{
        ddtCount: 0,
        checkFailCount: 0,
        patCount: 0
      },
      ruleForm: {
        deptId:'',
        hospId: '',
        datatime: [],
        visitState:'',
      }
    };
  },
  filters: {
    capitalizeisauthStatus: function(value) {
      if (value == 0) {
        return "未审核";
      } else if (value == 1) {
        return "审核通过";
      } else if (value == -1) {
        return "审核失败";
      }
    }
  },
  created() {
    this.getpatVisitList() //列表
    this.getpatVisitCount() //统计
    //查询科室下拉列表
    this.selectAllHospDept()
  },
  methods: {
    // 搜索
    search(){
      this.currentPage = 1
      this.getpatVisitList()
    },
    // 列表
    getpatVisitList(){
      this.loading = true
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        visitState:this.ruleForm.visitState,
        hospId:sessionStorage.getItem("hospId"),
        deptId: this.ruleForm.deptId,
      };
      getpatVisitList(params).then(response => {
        this.loading = false
        this.tableData = response.rows;
        this.total = response.total;
      });
    },
    getpatVisitCount(){
      getpatVisitCount({
        deptId: this.ruleForm.deptId,
        hospId: sessionStorage.getItem("hospId"),
      }).then(response => {
        this.visitCount = response.data
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getpatVisitList() //列表
    },

    selectAllHospDept(){
      var params = {
        hospId: sessionStorage.getItem("hospId")
      };
      selectAllHospDepts(params).then(response => {
        this.selectAllHospDeptArr = response.data;
      });
    },

    // 切换分页
    handleSizeChange(val) {
      this.pagesize = val
      this.getpatVisitList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getpatVisitList()
    },
    // 订单详情
    seeDetail(row) {
      this.inpatientservicesdetail = row
      this.dialogVisible = true;
    },

  }
};
</script>
