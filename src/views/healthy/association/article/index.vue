<template>
<!-- 文章管理 
无接口
-->
  <div class="article">
  
      <!-- 列表表格 -->
      <el-table  class="tablecss" v-loading="loading" :data="tableData"   style="width: 100%">
        <el-table-column type="index" width="50" align="center"/>
        <el-table-column prop="title" label="文章标题" align="center" />
        <el-table-column prop="columnName" label="所属栏目" align="center" />
        <el-table-column prop="readCount" label="阅读量" align="center" />
        <el-table-column prop="price" label="价格" align="center" />
        <el-table-column prop="uid" label="添加人" align="center" />
        <el-table-column prop="addTime" label="创建时间" align="center" />
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
                @change='changeStatus($event,scope.row)'>
              </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getArticleList"
        />
  </div>
</template>

<script>
import CountTo from "vue-count-to";

import { getArticleList,setEffect} from "@/api/healthy/newsInfo.js";
//
export default {
  components: {
    CountTo
  },
  data() {
    return {
      tableData: [],
      articleDetailData:{},
      total: 0,
      loading: false,
        // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      form: {
        columnId: "",
        title: "",
        newsInfo: "",
        price: "",
        imgUrl:"",
        id:undefined
      }
    };
  },
  created() {
    //查询文章列表
    this.getArticleList();
  },
  methods: {

   /** 获取列表 */
    getArticleList() {
      this.loading = true
      getArticleList(this.queryParams).then(response => {
        this.loading = false
        this.tableData = response.rows;
        this.total = response.total;
      });
    },


    /** 设置有效无效 */
    changeStatus: function($event,row){
      const id=row.id
        if($event===1){
          setEffect(id,1).then(response => {
          this.$message({
          type: 'success',
          message: '设置成功!'
        });
      });
        }else{
          setEffect(id,0).then(response => {
          this.$message({
          type: 'success',
          message: '设置成功!'
        });
      });
        }
			}
  }
};
</script>
<style lang="scss">
.article {
  .box-card {
    margin-bottom: 20px;
  }
  padding: 15px;
  label {
    font-weight: inherit;
  }
  .dialog-info{
  .column {
    .el-card__header {
      background: #e3e3e3;
      }
      .el-form-item{
        margin-bottom:0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.article {
  padding:30px;
}
</style>
