<template>
  <!-- // 日程管理
  新增接口报错
  删除接口报错
  编辑接口报错
  缺少指定人接口（isDept（是否为科室通用消息 0不是 指定人的；1是））
-->
  <div class="schedule">
    <!-- 筛选 -->
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>搜索条件</span>
      </div>
      <div>
        <el-form ref="queryParams"
                 :model="queryParams"
                 :inline="true"
                 label-width="75px">
          <el-form-item prop="title">
            <el-input v-model="queryParams.title"
                      size="mini"
                      placeholder="请输入标题"
                      style="width:100%"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-search"
                       @click="handleQuery">搜索</el-button>
            <el-button type="primary"
                       @click="clickAdd"
                       size="mini"
                       icon="el-icon-plus">新增</el-button>
            <el-button icon="el-icon-refresh"
                       size="mini"
                       @click="resetForm('queryParams')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 列表表格 -->
    <div>
      <el-table v-loading="loading"
                :data="tableData"
                style="width: 100%">
        <el-table-column type="index"
                         width="50"
                         label="序号"
                         align="center" />
        <el-table-column prop="title"
                         label="标题"
                         align="center" />
        <!-- <el-table-column prop="content"
                         label="内容"
                         align="center" /> -->
        <el-table-column prop="deptName"
                         label="协会名称"
                         align="center" />
        <el-table-column prop="note"
                         label="注意事项"
                         align="center" />
        <!-- <el-table-column prop="cityName"
                         label="城市"
                         align="center" /> -->
        <el-table-column prop="beginTime"
                         label="开始时间"
                         align="center" />
        <el-table-column prop="endTime"
                         label="结束时间"
                         align="center" />
        <el-table-column prop="sendTime"
                         label="发送时间"
                         align="center" />
        <!-- <el-table-column prop="organizer"
                         label="主办单位"
                         align="center" />
        <el-table-column prop="coOrganizer"
                         label="协办单位"
                         align="center" /> -->
        <el-table-column prop="isDept"
                         label="通用消息"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.isDept=='0'?'不是':scope.row.isDept=='1'?'是':''}}
          </template>
        </el-table-column>
        <el-table-column prop="isOpen"
                         label="类型"
                         align="center">
          <template slot-scope="scope">
            {{scope.row.isOpen=='0'?'本部门公开':scope.row.isOpen=='1'?'所有公开':''}}
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="操作"
                         align="center"
                         width="320">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-view"
                       @click="clickInfo(scope.row)"
                       size="mini">详细</el-button>
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="clickEdit(scope.row)"
                       size="mini">编辑</el-button>
            <el-button type="text"
                       icon="el-icon-delete"
                       @click="clickDelete(scope.row)"
                       size="mini">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0"
                  :total="total"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getHosMeetList" />
    </div>

    <!-- 新增 -->
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="780px"
               append-to-body>
      <el-card shadow="always">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题"
                            prop="title">
                <el-input v-model="form.title"
                          clearable
                          size="small"
                          placeholder="请输入标题"
                          maxLength='30' />
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    style='margin-bottom:60px'>
              <el-form-item label="内容" prop="content">
                <Editor v-model="form.content" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="通用消息" prop="isDept">
                <el-select v-model="form.isDept"
                           placeholder="请选择"
                           clearable
                           size="small"
                           style="width:100%">
                  <el-option :key="1"
                             label="是"
                             :value="1"></el-option>
                  <el-option :key="0"
                             label="否"
                             :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24"
                    v-if='form.isDept==0'>
              <el-form-item label="指定人"
                            prop="account">
                <el-select v-model="form.account"
                           placeholder="请选择"
                           clearable
                           style="width:100%">
                  <el-option v-for="item in options"
                             :key="item.label"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="城市"
                            prop="cityId">
                <el-select v-model="form.cityName"
                           placeholder="请选择"
                           style="width:100%">
                  <el-option v-for="item in cityOptions"
                             :key="item.cityId"
                             :label="item.name"
                             :value="item.cityId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="通知类型"
                            prop="isOpen">
                <el-select v-model="form.isOpen"
                           placeholder="请选择"
                           clearable
                           size="small"
                           style="width:100%">
                  <el-option label="所有公开"
                             :value="1"></el-option>
                  <el-option label="本部门公开"
                             :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开始时间"
                            prop="beginTime">
                <el-date-picker size="small"
                                style='width:100%'
                                v-model="form.beginTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="结束时间"
                            prop="endTime">
                <el-date-picker style='width:100%'
                                v-model="form.endTime"
                                size="small"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
             </el-col>
            <el-col :span="24">
              <el-form-item label="发送时间"
                            prop="sendTime">
                <el-date-picker style='width:100%'
                                v-model="form.endTime"
                                size="small"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="注意事项"
                            prop="note">
                <el-input v-model="form.note"
                          clearable
                          type="textarea"
                          size="small"
                          placeholder="请输入注意事项"
                          maxLength='30' />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="主办单位"
                            prop="organizer">
                <el-input v-model="form.organizer"
                          type="textarea"
                          clearable
                          size="small"
                          placeholder="请输入主办单位,以，间隔" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="协办单位"
                            prop="coOrganizer">
                <el-input v-model="form.coOrganizer"
                          type="textarea"
                          clearable
                          size="small"
                          placeholder="请输入协办单位,以，间隔" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible=false"
                   size="mini">取 消</el-button>
        <el-button type="primary"
                   @click="submitForm"
                   size="mini">确 定</el-button>
      </div>
    </el-dialog>

  <!-- 详情公告对话框 -->
  
    <el-dialog title="详情"
               :visible.sync="dialogVisibleInfo"
               width="780px"
               append-to-body>
      <el-card shadow="always">
        <el-form ref="form"
                 :model="infoData"
                 label-width="80px">
          <el-row>
              <el-col :span="12">
              <el-form-item label="标题:">
                <span>{{infoData.title}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="协会名称:">
                <span>{{infoData.deptName}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="注意事项:">
                <span>{{infoData.note}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类型:">
                <span> {{infoData.isOpen=='0'?'本部门公开':infoData.isOpen=='1'?'所有公开':""}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="通用消息:">
                <span> {{infoData.isDept=='0'?'不是':infoData.isDept=='1'?'是':""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始时间:">
                <span>{{infoData.addTime}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="结束时间:">
                <span>{{infoData.beginTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发送时间:">
                <span>{{ infoData.sendTime}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="主办单位:">
                <span>{{ infoData.organizer}}</span>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="协办单位:">
                <span>{{ infoData.coOrganizer}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="内容:"
                            prop="content">
                <span>{{infoData.content}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div slot="footer"
           class="dialog-footer"
           style="padding-top:20px">
        <el-button @click="dialogVisibleInfo=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { getHosMeetList, addMeeting, getListProvince, deleteMeeting, updateMeeting } from "@/api/schedule/scheduleManagement.js";
import Editor from '@/components/Editor';
export default {
  components: {
    CountTo,
    Editor
  },
  data () {
    return {
      tableData: [{}],
      title: '',
      total: 0,
      infoData:{},
      dialogVisible: false,
      dialogVisibleInfo: false,
      loading: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined
      },
      // 表单校验
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        note: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        cityId: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        beginTime: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        organizer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        coOrganizer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        isOpen: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        isDept: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      form: {
        deptId: sessionStorage.getItem("deptId"),
        hospId: sessionStorage.getItem("hospId"),
      },
      options: [{
        value: 0,
        label: '111'
      }, {
        value: 1,
        label: '222'
      }, {
        value: 2,
        label: '333'
      }],
      cityOptions: []
    }
  },
  created () {
    //查询用户列表
    this.getHosMeetList();
    this.getListProvince();

  },

  methods: {
    /** 获取列表 */
    getHosMeetList () {
      this.loading = true
      getHosMeetList(this.queryParams).then(response => {
        this.loading = false
        this.tableData = response.rows;
        this.total = response.total;
      });
    },

    // 查询所有的省（市
    getListProvince () {
      getListProvince().then(response => {
        this.cityOptions = response.data
      });
    },

    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getHosMeetList();
    },

    /** 新增按钮操作 */
    clickAdd () {
      this.dialogVisible = true;
      this.title = "新增日程"
    },

  /** 编辑按钮操作 */
    clickEdit(row) {
      this.dialogVisible = true;
      this.title="编辑日程";
      this.form=row
      this.form.beginTime= Date.parse(row.beginTime);
      this.form.endTime= Date.parse(row.endTime);
    },

    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },

 /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.uid != undefined) {
            updateMeeting(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.dialogVisible = false;
                this.getHosMeetList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addMeeting(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.dialogVisible = false;
                this.getHosMeetList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },


     /** 删除按钮操作 */
    clickDelete(row) {
      this.$confirm("此操作将删除该日程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            deleteMeeting(row.uid).then(response => {
              this.$message({
              type: "success",
              message: "删除成功!"
          });
          this.getHosMeetList();
        });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
        /** 详情按钮操作 */
    clickInfo(row) {
      this.dialogVisibleInfo = true;
      this.infoData= row
    },

  }
}
</script>

<style lang="scss">
.schedule {
  .box-card {
    margin-bottom: 20px;
  }
  padding: 15px;
  label {
    font-weight: inherit;
  }
  .dialog-info {
    .column {
      .el-card__header {
        background: #e3e3e3;
      }
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.schedule {
  padding: 30px;
}
</style>
