<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单</span>
        </div>
        <div class="text item">
          <count-to :start-val="0" :end-val="countData.readyToService" :duration="2600" class="card-panel-num" />
          <div class="card-panel-text">待接诊</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单</span>
        </div>
        <div class="text item">
          <count-to :start-val="0" :end-val="countData.yesTodyCount" :duration="2600" class="card-panel-num" />
          <div class="card-panel-text">昨日支付订单数</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>交易</span>
        </div>
        <div class="text item">
          <count-to :start-val="0" :end-val="Number(countData.yesTodyMoney)||0" :duration="2600" class="card-panel-num" :decimals="2"  />
          <div class="card-panel-text">昨日交易额</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>待提现</span>
        </div>
        <div class="text item">
          <count-to :start-val="0" :end-val="Number(countData.extractTalMoney)||0" :duration="2600" class="card-panel-num" :decimals="2" />
          <div class="card-panel-text">待提现</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo
  },
    props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          readyToService: '',
          yesTodyCount: '',
          yesTodyMoney: '',
          extractTalMoney: ''
        }
      }
    }
  },
  data(){ 
    return{
        countData: {}
    }
  },
  watch:{
    chartData: {
          immediate: true,
          handler(val) {
            this.countData = val
          }
    },
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-num {
    font-size: 20px;
  }
  .card-panel-text {
    font-size: 14px;
    padding: 10px 0 0;
  }
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
