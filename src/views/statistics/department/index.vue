<template>
<!-- 医院科室统计 -->
  <div class="dashboard-editor-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>住院人数</span>
      </div>
      <div>
        <line-chart-one :chart-data="lineChartDataOne" />
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>出院人数</span>
      </div>
      <div>
        <line-chart-two :chart-data="lineChartDataTwo" />
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待住院人数</span>
      </div>
      <div>
        <line-chart-three :chart-data="lineChartDataThree" />
      </div>
    </el-card>
  </div>
</template>

<script>
import LineChartOne from "../components/LineChartOne";
import LineChartTwo from "../components/LineChartTwo";
import LineChartThree from "../components/LineChartThree";
import CountTo from "vue-count-to";
import { getDeptTotalInfo } from "@/api/statistics/statistics";


export default {
  name: "Index",
  components: {
    LineChartOne,
    LineChartTwo,
    LineChartThree,
    CountTo
  },
  data() {
    return {
      statisticsobj:{},
      lineChartDataOne: {
        xdatatime:[],
        expectedData:[]
      },
      lineChartDataTwo: {
        xdatatime:[],
        expectedData:[]
      },
      lineChartDataThree: {
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
    this.getDeptTotalInfo()
  },
  methods: {
    getDeptTotalInfo(){
      getDeptTotalInfo(this.params).then(response => {
        this.statisticsobj = response.data
      // 住院人数
        response.data.listVisiting.forEach(element => {
          this.lineChartDataOne.xdatatime.push(element.addTime)
          this.lineChartDataOne.expectedData.push(element.totalCount)
        });
        // 出院人数
        response.data.listVisitOut.forEach(element => {
          this.lineChartDataTwo.xdatatime.push(element.addTime)
          this.lineChartDataTwo.expectedData.push(element.totalCount)
        });
        // 待住院人数
        response.data.listReady.forEach(element => {
          this.lineChartDataThree.xdatatime.push(element.addTime)
          this.lineChartDataThree.expectedData.push(element.totalCount)
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
