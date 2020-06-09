<template>
  <div class="everypage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>科室详情</span>
          <el-button @click="edit" style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div class="twocolumn">
          <div class="twocolumnlist">
            <div>
              <p>科室名称：{{departmentDetail.deptName}}</p>
              <p>所在城市：{{departmentDetail.cityName }}</p>
            </div>
            <div>
              <p>所属医院名称：{{departmentDetail.hospName}}</p>
              <p>科室描述：{{departmentDetail.deptInfo}}</p>
            </div>
            <div>
              <p>内存空间：{{departmentDetail.memSize}}</p>
              <p>已使用空间：{{departmentDetail.memUsed}}</p>
            </div> 
            <div>
              <p>病房地址信息：{{departmentDetail.roomInfo}}</p>
              <p>门诊地址信息：{{departmentDetail.clinicInfo}}</p>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 修改科室信息 -->
    <el-dialog class="ruleselform" title="修改科室信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="科室编号">
          <el-input v-model="form.hospCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="科室简介">
          <el-input v-model="form.deptInfo" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="门诊地址信息">
          <el-input v-model="form.clinicInfo" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="病房地址信息">
          <el-input v-model="form.roomInfo" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitedit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeptDetail, updateHospDept } from "@/api/department/departmentmanagement";
export default {
  data() {
    return {
      departmentDetail:{},
      hosTypeList:[], // 医院类型
      hosGreateList:[], // 医院等级
      allHospDeptList:[], //根据当前医院查科室

      form:{
        id:'',
        remark:'',
        deptInfo:'',
        hospCode:'',
        clinicInfo:'',
        roomInfo:'',
      },
      dialogFormVisible:false,
    };
  },
  // filters: {
  //   capitalizeishospType: function(value) {
  //     if (value == 1) {
  //       return "骨科医院";
  //     } else if (value == 2) {
  //       return "妇产科医院";
  //     }else if (value == 3) {
  //       return "老年人医院";
  //     }
  //   },
  //   capitalizeishospGrade(value){
  //     if (value == 1) {
  //       return "二级甲等";
  //     } else if (value == 2) {
  //       return "三级甲等";
  //     }
  //   }
  // },
  created() {
    this.getDeptDetail()
    // this.getHosTypeList() // 获取医院类型
    // this.getHosGreateList() // 查询医院等级
    // this.selectAllHospDept()//根据当前医院查科室
  },
  methods: {
    // 查询医院详情
    getDeptDetail(){
      getDeptDetail({
        hospId:13,
        deptId:11
      }).then(res => {
        this.departmentDetail = res.data
      })
    },
    // // 获取医院类型
    // getHosTypeList(){
    //   getHosTypeList({
    //     hospId:13
    //   }).then(res => {
    //     this.hosTypeList = res.data
    //   })
    // },
    // // 查询医院等级
    // getHosGreateList(){
    //   getHosGreateList({
    //     hospId:13
    //   }).then(res => {
    //     this.hosGreateList = res.data
    //   })
    // },
    // 根据当前医院查科室
    // selectAllHospDept(){
    //   selectAllHospDept({
    //     hospId:13
    //   }).then(res => {
    //     this.allHospDeptList = res.data
    //   })
    // },
    // 修改医院信息
    edit(){
      this.dialogFormVisible = true
      this.form.remark = this.departmentDetail.remark
      this.form.deptInfo = this.departmentDetail.deptInfo
      this.form.hospCode = this.departmentDetail.hospCode
      this.form.clinicInfo = this.departmentDetail.clinicInfo
      this.form.roomInfo = this.departmentDetail.roomInfo
    },
    // 提交修改信息
    submitedit(){
      var params = {
        // hospId:13,
        id:11,
        remark:this.form.remark,
        deptInfo:this.form.deptInfo,
        hospCode:this.form.hospCode,
        clinicInfo:this.form.clinicInfo,
        roomInfo:this.form.roomInfo
      }
      updateHospDept(params).then(res => {
        this.getDeptDetail()
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .everypage {
    .twocolumn {
      border:none;
      .twocolumnlist {
        div{
          // border-bottom:1px solid #ccc;
          p{
            border-bottom:none;
            line-height: 30px;
          }
        }
        div:nth-child(odd){
          background: #dddddd80;
        }
      }
    }
  }
  
</style>

