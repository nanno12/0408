<!--
* @author: lei
* @date: 2017/01/19
* @module:样本跟踪
* @explain:页面body部分
-->
<template>
  <div class="sampling-track-content">
      <div class="left">
        <div class="left-top">
          <table class='sample-table'>
            <thead>
            <tr>
              <th v-for="(item, index) in nodeList" :key="index">
                <span :class="item[0].achieve===1 ? '' : 'unachieve'">{{item[0].nodeType}}</span>
                <span :class="[item[0].achieve === 1? 'success' : '','state']"></span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td v-for="(item,index) in nodeList" :key="index">
                <el-popover
                  placement="bottom-start"
                  popper-class="sample-track-popper-reset"
                  :title="item[0].FLOWNODE"
                  :disabled="!item[0].achieve"
                  trigger="hover">
                  <div>
                    <ul v-for="(item2,index2) in item" :key="index2">
                      <li>
                        <b>{{item2.FLOWNODEJC}}时间：</b>
                        <span>{{item2.OPERATETIME}}</span>
                      </li>
                      <li>
                        <b>{{item2.FLOWNODEJC}}人：</b>
                        <span>{{item2.OPERATENAME}} </span>
                      </li>
                      <li>
                        <b>电话：</b>
                        <span>{{item2.TELPHONE}} </span>
                      </li>
                      <li>
                        <b>TAT规则：</b>
                        <span :class="item2.TATVOILATE==1? 'red' : ''" :title="item2.TATRULEDESC">{{item2.TATRULEDESC}}</span>
                      </li>
                      <li>
                        <b>理论{{item2.FLOWNODEJC}}时间：</b>
                        <span :class="item2.TATVOILATE==1? 'red' : ''">{{item2.IDEALTIME}}</span>
                      </li>
                      <li>
                        <b>客户端：</b>
                        <span>{{item2.OPERATEPCNAME}}</span>
                      </li>
                      <li>
                        <b>完成时间间隔：</b>
                        <span v-html="item2.TIMEDIFF == 0 ? '' : item2.TIMEDIFF+'\''">></span>
                      </li>
                    </ul>
                  </div>
                  <div slot="reference" class="slot-box">
                    <!--<span>{{item[0].NEXTNODE}}</span>-->
                    <p>{{item[0].OPERATETIME | handleNodeDate}}</p>
                    <p>{{item[0].OPERATENAME}}<span style="float:right;color:blue;" v-html="item[0].FLOWNODE == '标本采样' ? item.OPERATEPCNAME : ''"></span></p>
                    <p v-html="item[0].REMARK" :title="item[0].REMARK" class="ellipsis"></p>
                  </div>
                </el-popover>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="left-bottom">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight:bold;font-size:18px;">标本全过程</span>
              <i style="float:right;" :class="[this.timeAxisShow == true? 'icon-bige' : 'icon-shjz','iconfont']" @click="timeAxisShow = !timeAxisShow;"></i>
            </div>
            <div class="sample-status">
              <ul class="timeline" v-show="this.timeAxisShow">
                <li class="work" v-for="(item,index) in traceList" :key="index">
                  <div class="relative">
                    <span class="date" :class="[item.OPERATETIME.substring(0,10)==todayTime?'work-active':'']" v-html="formatAxisDate(item.OPERATETIME)"></span>
                    <span  :class="[item.TATVOILATE === '1' ? 'danger' : '','circle']"></span>
                  </div>
                  <div class="remark" v-if="item.FLOWNODE == '护工签收'">
                    <strong style="font-weight:600">{{item.FLOWNODEJC}}</strong>:由【{{item.OPERATENAME}}
                    <el-popover
                      placement="top-start"
                      popper-class="nurse-info"
                      title=""
                      width="250"
                      v-if="false"
                      trigger="click">
                      <div>
                        <div style="float:left;width:20%;">
                          <img src="../../assets/image/chengfang.jpg" alt="程芳" style="border:1px solid #d1d1d1;width:48px;height:48px;"/>
                          <p style="text-align: center;height:20px;line-height: 20px;">{{item.OPERATENAME}}</p>
                        </div>
                        <div style="display:table-cell;">
                          <p style="margin:0 0 5px 10px;">运送标本总量：<b style="font-weight:bold;font-size: 14px;">13.5万＋</b></p>
                          <ul class="transport-data">
                            <li>
                              <span>5%</span>
                              <p>丢失率</p>
                            </li>
                            <li>
                              <span style="color:green">80%</span>
                              <p>按时送达</p>
                            </li>
                            <li>
                              <span style="color:#E8A900">10%</span>
                              <p>温度不当</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <a href="javascipt:" style="color:#2C49E8;text-decoration: underline;" slot="reference">{{item.OPERATENAME}}</a>
                    </el-popover>
                    】通过【{{item.OPERATEPCNAME}}】进行{{item.FLOWNODE}}，{{item.REMARK}}。
                  </div>
                  <!-- <div class="remark" v-else v-html="item.TRACEDESC">
                  </div> -->
                  <div class="remark" v-else>
                    <!-- <strong style="font-weight:600">{{item.FLOWNODEJC}}</strong>:{{item.TRACEDESC}}<i v-if="item.REMARK" style="cursor:default">，原因：</i>{{item.REMARK}}。 -->
                    <strong style="font-weight:600">{{item.FLOWNODEJC}}</strong>:{{item.TRACEDESC}}
                  </div>
                </li>
              </ul>
              <el-table
                v-show="!this.timeAxisShow"
                :data="traceList"
                height="427"
                style="width: 100%;font-size: 12px;">
                <el-table-column
                  prop="FLOWNODE"
                  label="流程节点"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="OPERATETIME"
                  label="操作时间"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="OPERATENAME"
                  show-overflow-tooltip
                  label="操作人"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="REMARK"
                  show-overflow-tooltip
                  label="备注说明">
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </div><div class="right vt">
        <div style="border:1px solid #d1d1d1;padding:0 10px;height:100%;overflow:auto;" v-scroll>
          <div class="sample-info">
            <ul>
              <li class="sample-state">
                <span class="state-text" :title="nextNode">{{nextNode}}</span>
                <span class="state-icon" v-if="sampleTrackData.sampleinfo.MJZBZ === '1'">急</span>
              </li>
              <li>
                <span>预计取报告</span>
                <span style="float:right;">{{sampleTrackData.sampleinfo.REPORTNUM}}份</span>
              </li>
              <li>
                <span>{{sampleTrackData.sampleinfo.RPTRETURNDESC}}</span>
              </li>
            </ul>
          </div>
          <div class="sample-abnor">
            <div class="sample-abnor-header">
              <span style="font-weight:bold;font-size:18px;height:100%;">联系方式</span>
            </div>
            <ul class="telInfor">
              <li v-if="sampleTrackData.phonemap.PATNAME">
                <ellipsis-lable>
                  患者：
                  <span>{{sampleTrackData.phonemap.PATNAME}} </span>
                  <span v-if="sampleTrackData.phonemap.PATIENTPHONE" class="red">({{sampleTrackData.phonemap.PATIENTPHONE}})</span>
                </ellipsis-lable>
              </li>
              <li v-if="sampleTrackData.phonemap.APPLYDEPTNAME">
                <ellipsis-lable>
                  科室：
                  <span>{{sampleTrackData.phonemap.APPLYDEPTNAME}} </span>
                  <span v-if="sampleTrackData.phonemap.APPLYDEPTPHONE" class="red">({{sampleTrackData.phonemap.APPLYDEPTPHONE}})</span>
                </ellipsis-lable>
              </li>
              <li v-if="sampleTrackData.phonemap.WARDNAME">
                <ellipsis-lable>
                  病区：
                  <span>{{sampleTrackData.phonemap.WARDNAME}} </span>
                  <span v-if="sampleTrackData.phonemap.WARDPHONE" class="red">({{sampleTrackData.phonemap.WARDPHONE}})</span>
                </ellipsis-lable>
              </li>
              <li v-if="sampleTrackData.phonemap.APPLYDOCNAME">
                <ellipsis-lable>
                  医生：
                  <span>{{sampleTrackData.phonemap.APPLYDOCNAME}} </span>
                  <span v-if="sampleTrackData.phonemap.APPLYDOCPHONE" class="red">({{sampleTrackData.phonemap.APPLYDOCPHONE}})</span>
                </ellipsis-lable>
              </li>
            </ul>
          </div>
          <div class="sample-abnor">
            <div class="sample-abnor-header">
              <span style="font-weight:bold;font-size:18px;height:100%;">异常流程</span>
              <span style="float:right;height:100%;">{{abnormalList.length}}项</span>
            </div>
            <ul class="sample-abnor-body">
              <li v-for="(item,index) in abnormalList" :key="index" :class="{'is-add-height':item.DISPOSECONTENT}">
                <el-popover
                  placement="left-start"
                  popper-class="example-abnor-popper"
                  :title="item.OPERATE + '：'"
                  width="320"
                  trigger="hover">
                  <div>
                    <ul>
                      <li>
                        <b>操作时间：</b>
                        <span>{{item.OPERATETIME}}</span>
                      </li>
                      <li>
                        <b>操作人：</b>
                        <span>{{item.OPERATENAME}}（{{item.OPERATECODE}}）</span>
                      </li>
                      <li>
                        <b>计算机：</b>
                        <span :title="item.OPERATEPCNAME">{{item.OPERATEPCNAME}}</span>
                      </li>
                      <li>
                        <b>异常原因：</b>
                        <span :title="item.REASON">{{item.REASON}}</span>
                      </li>
                    </ul>
                  </div>
                  <div slot="reference">
                    <p style="color:red;"><span class="operate-span ellipsis">{{item.OPERATE}}</span>
                    <span style="float:right;color:#000;">{{item.OPERATETIME.slice(2,16)}}</span></p>
                    <p class="ellipsis">原因：{{item.REASON}}</p>
                    <p class="dispose-contnt ellipsis">{{item.DISPOSECONTENT}}</p>
                  </div>
                </el-popover>
              </li>

            </ul>
          </div>
          <div class="sample-item">
            <div class="sample-item-header">
              <span style="font-weight:bold;font-size:18px;height:100%;">检测项目</span>
              <span style="float:right;height:100%;">&yen;{{totalPrice}}</span>
            </div>
            <ul class="sample-item-body">
              <li v-for="item in orderList">
                <p class="sample-item-top"> <span style="height:100%;" class="hisorder-name ellipsis" :title="item.HISORDERCODE">{{item.HISORDERCODE}}</span>
                <span class="sample-item-price ellipsis" :title="item.PRICE">¥{{item.PRICE | handlePrice}}</span>
                <span style="float:right;height:100%;" class="txm-status-desc ellipsis" :title="item.TXMSTATUSDESC">{{item.TXMSTATUSDESC}}</span></p>
                <p class="ellipsis" :title="item.HISORDERNAME">{{item.HISORDERNAME}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import { judgeEmptyArr } from '../../utils/array'
  import {dateTimeFormat, timeFormat} from '@/app/utils/index'
  export default {
    data() {
      return {
        loadObj:{loadState:false,loadingMsg:"数据加载中"},
        timeAxisShow: true, //表格于时间轴之间的切换
        nextNode: '', //下一节点内容
        todayTime:timeFormat(new Date()),
        isActive:false
      };
    },
    created(){
      this.$nextTick(() => {
        console.log(this.todayTime)
      });
    },
    props: {
      sampleTrackData:{
        type:Object,
        default:function(){
          return {
            sampleinfo:{
              MJZBZ:''
            }
          }
        }
      },
    },
    filters: {
      //处理流程节点时间格式
      handleNodeDate:function(data){
        if(data!==undefined){
          return data.substr(2,14);
        }
      },
      //处理价格小数位数
      handlePrice(val){
        return Number(val).toFixed(2);
      },
    },
    computed:{
      //全流程数据
      traceList(){
        if(!this.sampleTrackData.tracelist) {
          return []
        }
        return judgeEmptyArr(this.sampleTrackData.tracelist)?this.sampleTrackData.tracelist:[];
      },
      //标本异常流程数据
      abnormalList(){
        return judgeEmptyArr(this.sampleTrackData.abnormallist)?this.sampleTrackData.abnormallist:[];
      },
      //标本项目信息
      orderList(){
        return judgeEmptyArr(this.sampleTrackData.orderlist)?this.sampleTrackData.orderlist:[];
      },
      //项目总价
      totalPrice(){
        let price= judgeEmptyArr(this.sampleTrackData.orderlist)?this.orderList.map(item=>item.SUMPRICE).reduce((a,b)=>{
          return Number(a)+Number(b);
        },0):0;
        return price.toFixed(2);
      },
      nodeList(){
        let data=this.sampleTrackData;
        return this.handleNodeList([data.BD,data.CY,data.QS,data.RK,data.BG,data.FB]);
      }
    },
    methods: {
      //格式化时间轴实践格式
      formatAxisDate: function(val){
        let dateTime=val.split(' ');
        let date=dateTime[0];
        let time=dateTime[1];
        // if(this.todayTime==date){
        //   this.isActive=true
        // }
        return date+'<br />'+time;

      },
      //重构流程节点数据
      handleNodeList(nodeList){
        let arr=['绑定','采样','签收','检测','审核','发布'];
        nodeList.forEach((item,index)=>{
          if(!item || item.length===0){
            item=[{}];
            this.$set(item[0],"achieve", 0);
            nodeList[index]=item;
          }else{
            this.$set(item[0],"achieve", 1);
            this.nextNode=item[0].NEXTNODE;
          }
          this.$set(item[0],"nodeType", arr[index]);
        });
        return nodeList;
      },
    }
  };
</script>
<style lang="stylus" scoped>
  .sampling-track-content{
    padding: 10px;
    height 100%
    overflow hidden
    min-width 745px
    .left{
      display inline-block
      height 100%
      width calc(100% - 240px)
      margin-right 10px
    }
    .right {
      display inline-block
      height 100%
      width 230px
      //overflow auto
    }
    .danger{
      padding 0
    }
  }

  /* 表格开始 */
  .left-top{
    height 120px
  }

  .sample-table{
    table-layout fixed
    width:100%
    overflow  auto
    white-space  nowrap
    border-spacing  0
  }

  .sample-table th{
    height 40px
    line-height 39px
    text-align left
    border 1px solid #d1d1d1
    border-left:none
    padding 0 5px
    background #F7FAFF;
    font-size 16px
    position relative
    &:first-child{
      border-left 1px solid #d1d1d1
    }
  }

  .sample-table th .unachieve{
    color #aaa
  }

  .sample-table th .time{
    padding-left 5px
    font-size 12px
  }

  .sample-table th .danger-time{
    color #E70012
  }

  .sample-table th .state{
    position absolute
    right 20px
    top 50%
    margin-top -6px
    height 12px
    width 12px
    border-radius 50%
    background  #D1D1D1
  }

  .sample-table th .success{
    background  #21AC38
  }

  .sample-table th .danger{
    background  #E70012
  }

  .sample-table th .warn{
    background  #F39600
  }

  .sample-table td{
    height: 80px;
    border 1px solid #d1d1d1
    border-left none
    border-top none
    box-sizing border-box
    position relative
    cursor pointer
    &:hover{
      background rgba(212,212,212,.25)
    }
    &:first-child{
      border-left 1px solid #d1d1d1
    }
  }

  .sample-table td .slot-box{
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    padding-left 5px
    overflow hidden
    text-overflow ellipsis
    white-space: nowrap
  }

  .sample-table td p{
    margin 10px 5px
  }
  /* 表格结束 */

  /* 时间轴开始 */
  .sampling-track-content .left-bottom{
    margin-top 10px
    overflow auto
    height calc(100% - 130px)
    .sample-status{
      height 100%
      overflow auto
    }
    .el-card{
      height 100%
      .el-table{
        height 100% !important
        border 0
        &:before{
          height 0
        }
        &:after{
          width 0
        }
      }
    }
  }

  .sampling-track-content .timeline {
    list-style: none;
    margin: 20px 20px 20px 110px;
    padding-left: 10px;
    border-left: 1px solid #eee9dc;
  }

  .sampling-track-content .timeline li {
    margin: 0 0 20px;
    position: relative;
    min-height: 40px;
    display:table;
  }
  .sampling-track-content .timeline .date.work-active{
    color #f00
  }
  .sampling-track-content .timeline .date {
    margin-top: -20px;
    top: 50%;
    left: -100px;
    font-size: 0.95em;
    line-height: 20px;
    text-align: right;
    position: absolute;
  }

  .sampling-track-content .timeline span.circle {
    margin-top: -5px;
    top: 50%;
    left: -15px;
    width: 10px;
    height: 10px;
    background: #48b379;
    border-radius: 50%;
    display: block;
    position: absolute;
  }
  .sampling-track-content .timeline span.danger{
    background  #E70012
  }

  .sampling-track-content .timeline .remark {
    max-height: 180px;
    line-height:20px;
    overflow: hidden;
    vertical-align:middle;
    display:table-cell;
  }

  /* 时间轴结束  */

  /* 异常报告开始 */
  .sample-info{
    padding 5px 0
    border-bottom 1px dotted #d1d1d1
  }

  .sample-info li{
    height 25px
    line-height 25px
  }

  .sample-info .sample-state{
    height 40px
    line-height 40px
  }

  .sample-info .sample-state .state-text {
    display inline-block
    max-width 176px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    font-size 22px
    font-weight bold
  }
  .sample-info .sample-state .state-icon{
    margin-top 10px
    float right
    color #fff
    height 20px
    width 20px
    text-align center
    line-height 20px
    border-radius 50%
    background  #E50013
  }

  .sample-abnor .sample-abnor-header,.sample-item .sample-item-header{
    height 40px
    line-height 40px
    border-bottom 1px dotted #d1d1d1
  }
  .sample-abnor .telInfor{
    border-bottom 1px dotted #d1d1d1
    padding-bottom 5px
  }
  .sample-abnor .telInfor li{
    width 100%
    line-height 24px
    .red{
      color red
    }
  }

  .sample-abnor .sample-abnor-body {
    border-bottom 1px dotted #d1d1d1
    // overflow auto
    padding-bottom 10px
  }

  .sample-abnor .sample-abnor-body li{
    padding 0 6px
    border-radius 5px
    border 1px solid #d1d1d1
    margin-top 10px
    height 50px
    &.is-add-height{
      height 70px
    }
    cursor pointer
    .operate-span{
      width: 80px;
      display: inline-block;
    }
  }
  .sample-abnor .sample-abnor-body li:hover{
    background rgba(212,212,212,.25)
  }

  .sample-abnor .sample-abnor-body li p{
    height: 22px;
    line-height: 22px;
    width 100%
  }

  .sample-item .sample-item-body{
    // overflow auto
  }

  .sample-item .sample-item-body li{
    padding 0 6px
    border-radius 5px
    border 1px solid #d1d1d1
    margin-top 10px
    height 50px
    .sample-item-top {
      display flex
      justify-content space-between
    }
    p{
      line-height 20px
      height 20px
    }
    .hisorder-name{
      width: 90px
      display: inline-block;
    }
    .txm-status-desc{
      display: inline-block;
      text-align: right;
    }
    .sample-item-price {
      display: inline-block;
      width 50px
    }
    &:hover {
      background rgba(212,212,212,.25)
    }    
  }
  /* 异常报告结束 */

  .transport-data li{
    display table-cell
    text-align center
    width 60px
    line-height 25px
  }
  .transport-data span{
    display block
    color red
    font-weight bold
    font-size 14px
  }

  .example-abnor-popper b{
    float:left;
    width:100px;
    text-align: right;
  }

  .example-abnor-popper span{
    float:left;
    width:200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sample-track-popper-reset ul{
    border-bottom 1px dotted #d1d1d1
    &:last-child{
      border none
    }
  }

  .sample-track-popper-reset li:after{
    content: '';
    display: table;
    clear: both;
  }

  .sample-track-popper-reset b{
    float:left;
    width:100px;
    text-align: right;
  }

  .sample-track-popper-reset span{
    float:left;
    width:calc(100% - 100px)
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sample-track-popper-reset span.red{
    color:#E70012;
  }

</style>
<style lang="stylus">
  .sampling-track-content .el-card__header{
    padding: 10px;
    height: 40px;
  }
  .sampling-track-content{
      height: calc(100% - 54px) !important;
  }
  .sampling-track-content .el-card__body{
    height: calc(100% - 40px);
    overflow: auto;
    padding: 0;
    .el-table{

      // .el-table__body-wrapper:hover{
      //   overflow-x hidden !important
      // }
    }
  }

  .sampling-track-content .iconfont{
    cursor: pointer;
    font-size: 24px;
    &:hover{
      color: #1b2aea;
    }
  }

  .nurse-info{
    padding: 5px !important;
  }

  .example-abnor-popper{
    line-height:25px;
    padding: 20px 5px !important;
  }

  .example-abnor-popper .el-popover__title{
    font-weight: bold;
    margin-left: 5px;
  }

  .sample-track-popper-reset{
    line-height:25px;
    padding: 20px 5px !important;
    max-height 240px
    overflow-y: auto;
  }

  .sample-track-popper-reset .el-popover__title{
    font-weight: bold;
    margin-left: 5px;
  }


  @media screen and (min-width: 1367px){
    .sampling-track-content .patient-info .txm-name>div{
      width 330px
    }
  }
</style>
