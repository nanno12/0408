<template>
  <div>
    <el-dialog
      :title="`${currentReport.PATNAME}-${currentReport.SEXDESC}-${currentReport.AGEDESC}-${currentReport.APPLYNO}
        ( ${currentReport.INSTNAME ? currentReport.INSTNAME : ''}/ ${currentReport.EXECTIME}/ ${currentReport.TECHNO} )`"
      class="common-dialog default-reset-dialog common-table"
      top="20%"
      :visible.sync="reportResultShow"
      :modal-append-to-body="false"
      size="small">
      <sort-table
        ref="reportResultTable"
        :tableData="reportResultList"
        :tableTitle="tableTitle"
        :moduleCode="moduleCode"
        :moduleName="moduleName"
        :highlight="true"
        :border="false"
        :setShow="false"
        @getNewTableTitle="getNewTableTitle">
        <template v-for="(item)  in tableTitle">
          <!-- No. -->
          <vxe-table-column
            v-if="item.name == 'seq'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              {{scope.$rowIndex < 9 ? "0" + (scope.$rowIndex + 1) : scope.$rowIndex + 1 }}
            </template>
          </vxe-table-column>
          <!-- 名称 -->
          <vxe-table-column
            v-else-if="item.name == 'ITEMNAME'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            class-name="item-name"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <ellipsis-lable :content="scope.row.ITEMNAME"></ellipsis-lable>
              <i class=" table-row-btns iconfont icon-qush" title="趋势分析" @click="operateExample(scope.row)"></i>
            </template>
          </vxe-table-column>
          <!-- 结果 -->
          <vxe-table-column
            v-else-if="item.name == 'RESULT'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <ellipsis-lable>
              <span :class="[scope.row.HIGHLOWFLAG == 'H'?'result-change-H-P'
                  :scope.row.HIGHLOWFLAG == 'P'?'result-change-H-P'
                  :scope.row.HIGHLOWFLAG == 'L'?'result-change-L'
                  :scope.row.HIGHLOWFLAG == 'HH'?'result-change-HH'
                  :scope.row.HIGHLOWFLAG == 'LL'?'result-change-LL':''
                  ,scope.row.PANICFLAG == '1'?'result-panicflag':'']">{{scope.row.RESULT}}</span>
              </ellipsis-lable>
            </template>
          </vxe-table-column>

          <vxe-table-column
            v-else-if="item.name == 'HISRESULT1'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row['HISHIGHLOWFLAG1'] == 'H'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG1'] == 'P'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG1'] == 'L'?'result-change-L'
                :scope.row['HISHIGHLOWFLAG1'] == 'HH'?'result-change-HH'
                :scope.row['HISHIGHLOWFLAG1'] == 'LL'?'result-change-LL':'',
                (scope.row['LIFELIMITFLAG1'] == 'H' || scope.row['LIFELIMITFLAG1'] == 'P' || scope.row['LIFELIMITFLAG1'] == 'L') ? 'skyblue' : '',
                'isright']">
                {{scope.row['HISRESULT1']}}
                <i v-show="scope.row['LIFELIMITFLAG1'] == 'H'
                  || scope.row['LIFELIMITFLAG1'] == 'P'"
                  class="iconfont icon-arrow_up"></i>
                <i v-show="scope.row['LIFELIMITFLAG1'] == 'L' "
                  class="iconfont icon-arrow_down"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-else-if="item.name == 'HISRESULT2'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row['HISHIGHLOWFLAG2'] == 'H'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG2'] == 'P'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG2'] == 'L'?'result-change-L'
                :scope.row['HISHIGHLOWFLAG2'] == 'HH'?'result-change-HH'
                :scope.row['HISHIGHLOWFLAG2'] == 'LL'?'result-change-LL':'',
                (scope.row['LIFELIMITFLAG2'] == 'H' || scope.row['LIFELIMITFLAG2'] == 'P' || scope.row['LIFELIMITFLAG2'] == 'L') ? 'skyblue' : '',
                'isright']">
                {{scope.row['HISRESULT2']}}
                <i v-show="scope.row['LIFELIMITFLAG2'] == 'H'
                  || scope.row['LIFELIMITFLAG2'] == 'P'"
                  class="iconfont icon-arrow_up"></i>
                <i v-show="scope.row['LIFELIMITFLAG2'] == 'L' "
                  class="iconfont icon-arrow_down"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-else-if="item.name == 'HISRESULT3'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row['HISHIGHLOWFLAG3'] == 'H'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG3'] == 'P'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG3'] == 'L'?'result-change-L'
                :scope.row['HISHIGHLOWFLAG3'] == 'HH'?'result-change-HH'
                :scope.row['HISHIGHLOWFLAG3'] == 'LL'?'result-change-LL':'',
                (scope.row['LIFELIMITFLAG3'] == 'H' || scope.row['LIFELIMITFLAG3'] == 'P' || scope.row['LIFELIMITFLAG3'] == 'L') ? 'skyblue' : '',
                'isright']">
                {{scope.row['HISRESULT3']}}
                <i v-show="scope.row['LIFELIMITFLAG3'] == 'H'
                  || scope.row['LIFELIMITFLAG3'] == 'P'"
                  class="iconfont icon-arrow_up"></i>
                <i v-show="scope.row['LIFELIMITFLAG3'] == 'L' "
                  class="iconfont icon-arrow_down"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-else-if="item.name == 'HISRESULT4'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row['HISHIGHLOWFLAG4'] == 'H'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG4'] == 'P'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG4'] == 'L'?'result-change-L'
                :scope.row['HISHIGHLOWFLAG4'] == 'HH'?'result-change-HH'
                :scope.row['HISHIGHLOWFLAG4'] == 'LL'?'result-change-LL':'',
                (scope.row['LIFELIMITFLAG4'] == 'H' || scope.row['LIFELIMITFLAG4'] == 'P' || scope.row['LIFELIMITFLAG4'] == 'L') ? 'skyblue' : '',
                'isright']">
                {{scope.row['HISRESULT4']}}
                <i v-show="scope.row['LIFELIMITFLAG4'] == 'H'
                  || scope.row['LIFELIMITFLAG4'] == 'P'"
                  class="iconfont icon-arrow_up"></i>
                <i v-show="scope.row['LIFELIMITFLAG4'] == 'L' "
                  class="iconfont icon-arrow_down"></i>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            v-else-if="item.name == 'HISRESULT5'"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :field="item.name"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <!-- 表头自定义 -->
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <!-- 内容自定义 -->
            <template slot-scope="scope">
              <span :class="[scope.row['HISHIGHLOWFLAG5'] == 'H'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG5'] == 'P'?'result-change-H-P'
                :scope.row['HISHIGHLOWFLAG5'] == 'L'?'result-change-L'
                :scope.row['HISHIGHLOWFLAG5'] == 'HH'?'result-change-HH'
                :scope.row['HISHIGHLOWFLAG5'] == 'LL'?'result-change-LL':'',
                (scope.row['LIFELIMITFLAG5'] == 'H' || scope.row['LIFELIMITFLAG5'] == 'P' || scope.row['LIFELIMITFLAG5'] == 'L') ? 'skyblue' : '',
                'isright']">
                {{scope.row['HISRESULT5']}}
                <i v-show="scope.row['LIFELIMITFLAG5'] == 'H'
                  || scope.row['LIFELIMITFLAG5'] == 'P'"
                  class="iconfont icon-arrow_up"></i>
                <i v-show="scope.row['LIFELIMITFLAG5'] == 'L' "
                  class="iconfont icon-arrow_down"></i>
              </span>
            </template>
          </vxe-table-column>

          <vxe-table-column
            v-else
            :sortable="item.sortable"
            :sort-method="item.sortMethod"
            :field="item.name"
            :fixed="item.fixed"
            :title="item.label"
            :show-header-overflow="true"
            :show-overflow="true"
            :width="item.width"
            :key="item.name">
            <template slot="header" slot-scope="{ column }">
              <span>{{ column.title }}</span>
              <span class="custom-sort" v-if="item.sortable" :class="{'is-order': column.order}">
                <i class="iconfont" :class="[column.order ? `icon-Sort-${column.order}` : 'icon-sort']"></i>
              </span>
            </template>
            <template slot-scope="scope">
              <ellipsis-lable>{{scope.row[item.name]}}</ellipsis-lable>
            </template>
          </vxe-table-column>
        </template>
      </sort-table>
      <div class="footer">
        <label>项目数量：<span>{{reportResultList.length}}</span></label>
        <label>异常结果：<span>{{filterAbnormalIndex.length}}</span></label>
      </div>
    </el-dialog>
    <!--趋势分析弹窗开始-->
  
      <report-result-trend
       :show.sync="qsfxShow"
       :modal="false"
       :patient="currentReport"
        :resultitem="selectedResultItem"></report-result-trend>

  </div>
</template>
<script>
  import Common from '../../api/common.js'
  import ReportResultTrend from '@/modules/reportinput/components/ReportResultTrend.vue'
  
  export default {
    data() {
      return {
        reportResultList: [],//报告结果
        reportResultShow: false, //报告结果显示/隐藏
        currentReport: {}, //当前报告
        qsfxShow: false, //趋势分析弹窗显示/隐藏
        selectedResultItem: {},
        showOperate: true,
        history: [
          {
            HISRESULT: 'HISRESULT1',//历史1
            HISHIGHLOWFLAG: 'HISHIGHLOWFLAG1',
            LIFELIMITFLAG: 'LIFELIMITFLAG1',
            propTitle: '历史1',
            label: '历史1'
          },
          {
            HISRESULT: 'HISRESULT2',//历史2
            HISHIGHLOWFLAG: 'HISHIGHLOWFLAG2',
            LIFELIMITFLAG: 'LIFELIMITFLAG2',
            propTitle: '历史2',
            label: '历史2'
          },
          {
            HISRESULT: 'HISRESULT3',//历史3
            HISHIGHLOWFLAG: 'HISHIGHLOWFLAG3',
            LIFELIMITFLAG: 'LIFELIMITFLAG3',
            propTitle: '历史3',
            label: '历史3'
          },
          {
            HISRESULT: 'HISRESULT4',//历史4
            HISHIGHLOWFLAG: 'HISHIGHLOWFLAG4',
            LIFELIMITFLAG: 'LIFELIMITFLAG4',
            propTitle: '历史4',
            label: '历史4'
          },
          {
            HISRESULT: 'HISRESULT5',//历史5
            HISHIGHLOWFLAG: 'HISHIGHLOWFLAG5',
            LIFELIMITFLAG: 'LIFELIMITFLAG5',
            propTitle: '历史5',
            label: '历史5'
          }
        ],//历史记录
        tableTitle:[
          {
            name: 'seq',
            label: '编号',
            width: '60',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'ITEMNAME',
            label: '名称',
            width: '130',
            checked: true,
            fixed: '',
            sortable: true
          },
          
          {
            name: 'RESULT',
            label: '结果',
            width: '70',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HISRESULT1',
            label: '历史1',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HISRESULT2',
            label: '历史2',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HISRESULT3',
            label: '历史3',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HISRESULT4',
            label: '历史4',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HISRESULT5',
            label: '历史5',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'ITEMNUM',
            label: '项目编码',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'REFERENCERANGE',
            label: '参考区间',
            width: '120',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'HINTINFO',
            label: '提示',
            width: '50',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'REDO',
            label: '复做',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
         
          {
            name: 'INSTNAME',
            label: '检测仪器',
            width: '80',
            checked: true,
            fixed: '',
            sortable: true
          },
        ],//表头
       
        moduleCode: '', // 模块code
        moduleName: '', // 模块名称
        }
    },
    //组件销毁时
    destroyed() {
      // alert("destroyed")
      this.offEventLisener()
    },
    //keep-alive 组件停用时调用。
    deactivated() {
      //取消监听键盘事件
      //  alert("deactivated")
      this.offEventLisener()
    },
    //keep-alive 组件激活时调用。
    activated() {
      //重新监听
      // alert("activated")
      this.changeEventLisener()
    },
    created() {
      this.$nextTick(_ => {
        this.offEventLisener();
        this.changeEventLisener();
      })
    },
    computed: {
      //对异常指标进行筛选
      filterAbnormalIndex() {
        return this.reportResultList.filter(item => {
          return item.HIGHLOWFLAG == 'H' || item.HIGHLOWFLAG == 'L' || item.HIGHLOWFLAG == 'LL'
            || item.HIGHLOWFLAG == 'P' || item.HIGHLOWFLAG == 'HH';
        })
      }
    },
    methods: {
      /**获取新的排序，并重置 */
      getNewTableTitle(newTableTitle) {
        this.tableTitle = []
        this.$nextTick(() => {
          this.tableTitle = JSON.parse(JSON.stringify(newTableTitle))
        })
      },
      changeEventLisener() {
        this.$root.eventHub.$on('batchOperation/openReportResult', (row,module) => {
          // this.moduleCode = module.moduleCode
          // this.moduleName = module.moduleName
          row.EXECTIME = row.EXECTIME.substr(0, 10);
          this.currentReport = row;
          let params = {
            applyno: row.APPLYNO,
            type: module.moduleName == '批量打印结果' ? '1' : '0', // 检验科调用
            hospitalcode: ''
          };
         this.$nextTick(_=>{
           
         })
          Common.getReportResult(params, data => {
            if (data.type === 'SUCCESS') {
              this.reportResultList = data.data;
              if (!(this.reportResultList && this.reportResultList[0])) {
                return;
              }
              let his1 = this.reportResultList[0].HISEXECTIME1.substr(2, 9);
              let his2 = this.reportResultList[0].HISEXECTIME2.substr(2, 9);
              let his3 = this.reportResultList[0].HISEXECTIME3.substr(2, 9);
              let his4 = this.reportResultList[0].HISEXECTIME4.substr(2, 9);
              let his5 = this.reportResultList[0].HISEXECTIME5.substr(2, 9);
              this.history.forEach(item => {
                //首先还原mixTitle值
                item.label = item.propTitle;
                if (item.HISRESULT == 'HISRESULT1' && his1) {
                  item.label = his1
                }
                if (item.HISRESULT == 'HISRESULT2' && his2) {
                  item.label = his2
                }
                if (item.HISRESULT == 'HISRESULT3' && his3) {
                  item.label = his3
                }
                if (item.HISRESULT == 'HISRESULT4' && his4) {
                  item.label = his4
                }
                if (item.HISRESULT == 'HISRESULT5' && his5) {
                  item.label = his5
                }
              })
              this.tableTitle.forEach((item) => {
                if(item.name == 'HISRESULT1') {
                  item.label = this.history[0].label;
                }
                if(item.name == 'HISRESULT2') {
                  item.label = this.history[1].label;
                }
                if(item.name == 'HISRESULT3') {
                  item.label = this.history[2].label;
                }
                if(item.name == 'HISRESULT4') {
                  item.label = this.history[3].label;
                }
                if(item.name == 'HISRESULT5') {
                  item.label = this.history[4].label;
                }
              })
              this.reportResultShow = true;
              setTimeout(_ => {
                $('.vxe-table--body-wrapper').scrollTop(0);
              }, 300);
            } else {
              this.$message.error(data.message);
            }
          });
        });
      },
      offEventLisener() {
        this.$root.eventHub.$off("batchOperation/openReportResult");
      },
      //获取当前病人当前项目的趋势分析报告
      operateExample(item) {
        this.qsfxShow = !this.qsfxShow;
        setTimeout(_ => {
          this.selectedResultItem = item;
        }, 0);
      }
    },
    components: {
      ReportResultTrend
    }
  }


</script>
<style lang="stylus" scoped>
@import '~@/modules/reportinput/font.styl' 
</style>
<style lang="stylus">
  .default-reset-dialog {
    .el-dialog {
      border-radius 4px
      overflow hidden
      // transform none
      // margin-left -332px
      .el-dialog__header {
        .el-dialog__title {
          font-weight normal
        }
      }
      .el-dialog__body {
        background #FFF
        height calc(100% - 38px) !important
        .el-table {
          height: calc(100% - 54px)
        }
        .footer {
          height: 54px;
          line-height 54px;
          font-weight 700
          font-size 12px
          label {
            margin-right: 15px;
          }
          span {
            color: red
          }
        }
      }
    }

  //悬浮框
    .table-row-btns {
      transition: all .1s ease;
      .el-table--border td {
        border-left: none !important;
      }
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td .table-row-btns .icon-more1 {
      opacity 1
    }
    tr.current-row > td .table-row-btns .icon-more1 {
      opacity 1
    }
    .vxe-body--row:hover > td .icon-qush {
      opacity 1
    }
     .table-row-btns {
      &.icon-qush {
          color: #1260C8;
          opacity 0
      }
    }
    .table-row-btns .icon-more1 {
      color: #1260C8;
      opacity 0
    }
    .isright {
      margin-left: 30%
      position relative
      .iconfont {
          position absolute
          top: -3px
          left:-18px
          color: #FFAE00 !important;
      }
    }

    .item-name{
      >div{
        display flex
        justify-content space-between
      }

    }
  }
</style>
