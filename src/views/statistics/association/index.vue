<template>
<!-- 协会统计
缺少接口
数据统计显示：等待审核人数、协会总人数【协会】
走势图可以显示：最近30天申请加入协会的人数走势【协会】
 -->
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="panel-group">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>协会</span>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="parseInt(statisticsobj.readyToService)||0" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">等待审核</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>协会</span>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="parseInt(statisticsobj.yesTodyCount)||0" :duration="2600" class="card-panel-num" />
            <div class="card-panel-text">协会总人数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>加入协会</span>
      </div>
      <div>
        <line-chart-one :chart-data="lineChartDataOne" />
      </div>
    </el-card>
  </div>
</template>

<script>
import LineChartOne from "../components/LineChartOne";
import CountTo from "vue-count-to";
import { getHosTotalInfo } from "@/api/statistics/statistics";


export default {
  name: "Index",
  components: {
    LineChartOne,
    CountTo
  },
  data() {
    return {
      statisticsobj:{},
      lineChartDataOne: {
        xdatatime:[],
        expectedData:[]
      },
      params:{
       deptId: sessionStorage.getItem("deptId"),
        hospId: sessionStorage.getItem("hospId"),
      }
    };
  },
  created(){
    this.getHosTotalInfo()
  },
  methods: {
    getHosTotalInfo(){
      getHosTotalInfo(this.params).then(response => {
        this.statisticsobj = response.data
      // 住院人数
        response.data.listVisiting.forEach(element => {
          this.lineChartDataOne.xdatatime.push(element.addTime)
          this.lineChartDataOne.expectedData.push(element.totalCount)
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .box-card {
    margin-top: 20px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
