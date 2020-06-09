<template>
  <!-- 住院管理
   无编辑接口
   列表接口报错
   -->
  <div class="everypage">
    <!-- 筛选 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索条件</span>
      </div>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :inline="true" label-width="85px">
          <el-form-item label="状态"  prop="visitState">
            <el-select v-model="ruleForm.visitState" clearable placeholder="请选择" size="mini">
              <el-option label="排队" value="1"></el-option>
              <el-option label="在院" value="2"></el-option>
              <el-option label="出院" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label label="时间段筛选" prop="datatime" deptIdlabel-width="95px">
            <el-date-picker
              v-model="ruleForm.datatime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="mini"
            ></el-date-picker>
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
<!--        <el-table-column prop="admCondition" label="入院病情" min-width="52" align="center"></el-table-column>-->
        <el-table-column prop="ddtTime" label="出院时间" min-width="52" align="center"></el-table-column>
<!--        <el-table-column prop="treatResult" label="治疗结果" min-width="52" align="center"></el-table-column>-->
        <el-table-column prop="treatDays" label="治疗天数" min-width="52" align="center"></el-table-column>
<!--        <el-table-column prop="diagnosisDesc" label="诊断描述" min-width="52" align="center"></el-table-column>-->
        <el-table-column prop="address" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="seeDetail(scope.row)" size="mini">详情</el-button>
            <el-button type="text" icon="el-icon-guide" v-if="scope.row.authStatus == 0"  @click="changeStatus(scope.row)" size="mini">审核</el-button>
            <el-button type="text" icon="el-icon-edit" @click="clickEdit(scope.row)" size="mini">编辑</el-button>
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
          <p>住院信息</p>
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


    <!-- 审核弹窗 -->
    <el-dialog title="审核" :visible.sync="dialogVisibleCheck" width="500px">
      <el-form :model="checkData" ref="checkForm">
        <el-form-item  prop="authStatus">
          <el-radio v-model="checkData.authStatus" label="1">同意</el-radio>
          <el-radio v-model="checkData.authStatus" label="-1">拒绝</el-radio>
        </el-form-item>
        <el-form-item  prop="authMsg" v-show='this.checkData.authStatus==-1'>
          <el-input   v-model="checkData.authMsg" type="textarea" :rows="4" size="small" placeholder="请输入原因"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCheck = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitCheck" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisibleUpdate" width="600px" :close-on-click-modal="false">
      <el-card shadow="always">
        <el-form ref="form" :model="inpatientservicesdetail" :rules="rules" label-width="110px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="患者姓名"  prop="patName" :disabled="true">
                <el-input v-model="inpatientservicesdetail.patName" clearable  size="small" placeholder="请输入患者姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="患者电话"  prop="linkPhone">
                <el-input v-model="inpatientservicesdetail.linkPhone" clearable  size="small" placeholder="请输入患者电话"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="患者年龄"  prop="age">
                <el-input v-model="inpatientservicesdetail.age" clearable  size="small" placeholder="请输入患者年龄"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="医院名称"  prop="hospName">
                <el-input v-model="inpatientservicesdetail.hospName" clearable  size="small" placeholder="请输入医院名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="科室名称"  prop="deptName">
                <el-input v-model="inpatientservicesdetail.deptName" clearable  size="small" placeholder="请输入科室名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="病床编号"  prop="bedCode">
                <el-input v-model="inpatientservicesdetail.bedCode" clearable  size="small" placeholder="请输入病床编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="入院病情"  prop="admCondition">
                <el-input v-model="inpatientservicesdetail.admCondition" clearable  size="small" placeholder="请输入入院病情"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="状态" prop="authStatus">
                <el-select v-model="inpatientservicesdetail.authStatus" placeholder="请选择"  size="small" style="width:100%">
                    <el-option label="未审核" :value="0"></el-option>
                    <el-option label="同意" :value="1"></el-option>
                    <el-option label="拒绝" :value="-1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="入院时间"  prop="addTime">
                  <el-date-picker
                    size="small"
                    style="width:100%"
                    v-model="inpatientservicesdetail.addTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="出院时间"  prop="ddtTime">
                  <el-date-picker style="width:100%"
                    size="small"
                    v-model="inpatientservicesdetail.ddtTime"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="治疗结果"  prop="treatResult">
                <el-input v-model="inpatientservicesdetail.treatResult" clearable  size="small" placeholder="请输入治疗结果"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="治疗天数"  prop="treatDays">
                <el-input v-model="inpatientservicesdetail.treatDays" clearable  size="small" placeholder="请输入治疗天数"/>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="诊断描述"  prop="diagnosisDesc">
                <el-input type="textarea" v-model="inpatientservicesdetail.diagnosisDesc" clearable  size="small" placeholder="请输入诊断描述"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdate = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="mini">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>

  import {getpatVisitListDept,getpatVisitCount,checkPatState} from "@/api/inpatientservices/inpatientmanagement";
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
        tableData: [],
        dialogVisible: false,
        dialogVisibleCheck: false,
        dialogVisibleUpdate: false,
        loading: false,
        inpatientservicesdetail:{},
        visitCount:{
          ddtCount: 0,
          checkFailCount: 0,
          patCount: 0
        },
        ruleForm: {
          datatime: [],
          visitState:'',
        },
        checkData:{
          authStatus:'1',
          authMsg:'',
          id:""
        },
      // 表单校验
      rules: {
        patName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
      };
    },
    filters: {
      capitalizeisauthStatus: function(value) {
        if (value == 0) {
          return "未审核";
        } else if (value == 1) {
          return "同意";
        } else if (value == -1) {
          return "拒绝";
        }
      }
    },
    created() {
      this.getpatVisitList() //列表
      this.getpatVisitCount() //统计
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
          deptId: sessionStorage.getItem("deptId"),
          hospId: sessionStorage.getItem("hospId"),
        };
        getpatVisitListDept(params).then(response => {
          this.loading = false
          this.tableData = response.rows;
          this.total = response.total;
        });
      },
      getpatVisitCount(){
        getpatVisitCount({
          hospId: sessionStorage.getItem("hospId"),
          deptId: sessionStorage.getItem("deptId"),
        }).then(response => {
          this.visitCount = response.data
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.getpatVisitList() //列表
      },

      /** 编辑按钮操作 */
      clickEdit(row) {
        this.inpatientservicesdetail={}
        this.inpatientservicesdetail = row
        this.dialogVisibleUpdate = true;
      },
       /** 编辑提交 */
      submitForm(){
        alert('无接口')
      },
      /** 审核提交 */
      submitCheck(){
        if(this.checkData.authStatus==-1){
          if( this.checkData.authMsg==''){
            this.msgError('请输入理由');
            return;
          }
        }
        checkPatState(this.checkData).then(response => {
          if (response.code === 200) {
            this.msgSuccess("成功");
            this.getpatVisitList();
            this.resetForm("checkForm");
            this.dialogVisibleCheck = false;
          } else {
            this.msgError(response.msg);
          }
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
      seeDetail(row) {
        this.inpatientservicesdetail = row
        this.dialogVisible = true;
      },

      /** 审核按钮 */
      changeStatus(row){
        this.dialogVisibleCheck = true;
        this.checkData.id=row.id;
      },


    }
  };
</script>
