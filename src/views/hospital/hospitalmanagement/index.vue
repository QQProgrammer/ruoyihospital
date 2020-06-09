<template>
  <div class="everypage">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>医院信息</span>
          <el-button @click="edit" style="float: right; padding: 3px 0" type="text">修改</el-button>
        </div>
        <div class="twocolumn">
          <div class="twocolumnlist">
            <div>
              <p>医院名称：{{hospitalDetail.hospName}}</p>
              <p>医院别名：{{hospitalDetail.hospAliaName }}</p>
            </div>
            <div>
             <p>医院类型：{{hospitalDetail.hospType | capitalizeishospType}}</p>
              <p>医院等级：{{hospitalDetail.hospGrade | capitalizeishospGrade}}</p>
            </div>
            <div>
              <p>医院科室：{{hospitalDetail.depts}}</p>
              <p>医院电话：{{hospitalDetail.hospTel}}</p>
            </div>
            <div>
              <p>乘车线路：{{hospitalDetail.route}}</p>
              <p>添加人：{{hospitalDetail.addUser}}</p>
            </div>
            <div>
              <p>最后修改人：{{hospitalDetail.updateUser}}</p>
              <p>医院地址：{{hospitalDetail.address}}</p>
            </div>
            <div>
              <p>医院简介：{{hospitalDetail.introduction}}</p>
            </div>
            <div>
              <p>医院备注：{{hospitalDetail.remark}}</p>
            </div>
            <div>
              <p>医院网址：{{hospitalDetail.hospUrl}}</p>
            </div>
            <div>
              <p  style="display:flex">
                <span>医院图片：</span>
                <img v-if="hospitalDetail.imgSize == 1" :src="item" v-for="(item,index) in hospitalDetail.hospImg" :key="index" style="width:200px;height:200px;object-fit: scale-down;">
                <span v-if="!hospitalDetail.imgSize == 1">暂无</span>
              </p>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 修改医院信息 -->
    <el-dialog class="ruleselform" title="修改医院信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="医院名称">
          <el-input v-model="form.hospName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院别名">
          <el-input v-model="form.hospAlias" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="特色科室">
          <el-input v-model="form.depts" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="医院类型" prop="hospType">
          <el-select v-model="form.hospType" placeholder="请选择">
            <el-option
              v-for="item in hosTypeList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hospGrade">
          <el-select v-model="form.hospGrade" placeholder="请选择">
            <el-option
              v-for="item in hosGreateList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院简介">
          <el-input v-model="form.introduction" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="乘车路线">
          <el-input v-model="form.route" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" type="textarea" :rows="2"  placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitedit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHospatilDetail,
  updateHospInfo,
  getHosTypeList,
  getHosGreateList,
  selectAllHospDept
 } from "@/api/hospital/hospitalmanagement";
export default {
  data() {
    return {
      hospitalDetail:{},
      hosTypeList:[], // 医院类型
      hosGreateList:[], // 医院等级
      allHospDeptList:[], //根据当前医院查科室
      form:{
        hospName:'',
        hospAlias:'',
        depts:'',
        hospType:'',
        hospGrade:'',
        introduction:'',
        route:'',
        address:'',
      },
      dialogFormVisible:false,
    };
  },
  filters: {
    capitalizeishospType: function(value) {
      if (value == 1) {
        return "骨科医院";
      } else if (value == 2) {
        return "妇产科医院";
      }else if (value == 3) {
        return "老年人医院";
      }
    },
    capitalizeishospGrade(value){
      if (value == 1) {
        return "二级甲等";
      } else if (value == 2) {
        return "三级甲等";
      }
    }
  },
  created() {
    this.getHospatilDetail()
    this.getHosTypeList() // 获取医院类型
    this.getHosGreateList() // 查询医院等级
    this.selectAllHospDept()//根据当前医院查科室
  },
  methods: {
    // 查询医院详情
    getHospatilDetail(){
      getHospatilDetail({
        hospId:sessionStorage.getItem("hospId")
      }).then(res => {
        this.hospitalDetail = res.data
      })
    },
    // 获取医院类型
    getHosTypeList(){
      getHosTypeList({
        hospId:sessionStorage.getItem("hospId")
      }).then(res => {
        this.hosTypeList = res.data
      })
    },
    // 查询医院等级
    getHosGreateList(){
      getHosGreateList({
        hospId:sessionStorage.getItem("hospId")
      }).then(res => {
        this.hosGreateList = res.data
      })
    },
    // 根据当前医院查科室
    selectAllHospDept(){
      selectAllHospDept({
        hospId:sessionStorage.getItem("hospId")
      }).then(res => {
        this.allHospDeptList = res.data
      })
    },
    // 修改医院信息
    edit(){
      this.dialogFormVisible = true
      this.form.hospName = this.hospitalDetail.hospName
      this.form.hospAlias = this.hospitalDetail.hospAliaName
      this.form.depts = this.hospitalDetail.depts
      this.form.hospType = this.hospitalDetail.hospType.toString()
      this.form.hospGrade = this.hospitalDetail.hospGrade.toString()
      this.form.introduction = this.hospitalDetail.introduction
      this.form.route = this.hospitalDetail.route
      this.form.address = this.hospitalDetail.address

    },
    // 提交修改信息
    submitedit(){
      var params = {
        id:13,
        hospName:this.form.hospName,
        hospAlias:this.form.hospAlias,
        depts:this.form.depts,
        hospType:this.form.hospType,
        hospGrade:this.form.hospGrade,
        introduction:this.form.introduction,
        route:this.form.route,
        address:this.form.address,
      }
      updateHospInfo(params).then(res => {
        this.getHospatilDetail()
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      })
    },




    // 列表
    gethospInfoList() {
       this.loading = true
      var params = {
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        hospName: this.ruleForm.hospName,
      };
      gethospInfoList(params).then(response => {
        this.loading = false
        this.tableData = response.rows;
        this.total = response.total;
      });
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

