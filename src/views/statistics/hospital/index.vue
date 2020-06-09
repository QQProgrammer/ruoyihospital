<template>
<!-- 医院统计 -->
  <div class="dashboard-editor-container">
    <el-row :gutter="20" class="panel-group">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>等待入院</span>
            <el-button style="float: right; padding: 3px 0" type="text">待</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="parseInt(statisticsobj.readyToService)||0" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>入院中</span>
            <el-button style="float: right; padding: 3px 0" type="text">中</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="parseInt(statisticsobj.yesTodyCount)||0" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已出院</span>
            <el-button style="float: right; padding: 3px 0" type="text">已</el-button>
          </div>
          <div class="text item">
            <count-to :start-val="0" :end-val="parseInt(statisticsobj.yesTodyMoney)||0" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
    </el-row>
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
import { getHosTotalInfo } from "@/api/statistics/statistics";


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
        // deptId: sessionStorage.getItem("deptId"),
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
