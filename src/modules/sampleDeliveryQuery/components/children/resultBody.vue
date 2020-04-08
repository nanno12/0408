<!--
* @author w_sh
* @date 2020-03-09
* @module 标本流转查询-右侧主体信息
-->
<template>
  <div class="resultBody">
    <div class="resultTable inlB vt" :class="{'allWidth' : picShow == false || reportImageList.length == 0}">
      <div class="tableBox">
        <sort-table
          ref="multipleTable"
          :tableData="reportResultList"
          :tableTitle="tableTitle"
          :moduleCode="moduleCode"
          :moduleName="moduleName"
          :highlight="true"
          :border="true"
          @getNewTableTitle="getNewTableTitle">
            <template v-for="(item)  in tableTitle">
              <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :fixed="item.fixed" :key="item.name"></vxe-table-column>
              <!-- 上传状态 -->
              <vxe-table-column
                v-else-if="item.name == 'id'"
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
                  <span v-if="scope.$rowIndex < 9">{{'0' + (scope.$rowIndex + 1)}}</span>
                  <span v-else>{{scope.$rowIndex + 1}}</span>
                </template>
              </vxe-table-column>

              <vxe-table-column
                v-else-if="item.name == 'ITEMNUM' || item.name == 'ITEMNAME'"
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
                  <span :class="{'col--maroon':scope.row.IMPORTANT == '1',
                   'col--gray':scope.row.DISPLAYFLAG == '1'}">{{scope.row[item.name]}}</span>
                </template>
              </vxe-table-column>

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
                  <span :class="{'col--red':scope.row.HIGHLOWFLAG == 'H' || scope.row.HIGHLOWFLAG == 'P' || scope.row.HIGHLOWFLAG == 'HH','col--blue':scope.row.HIGHLOWFLAG == 'L' || scope.row.HIGHLOWFLAG == 'LL', 'italic underline':scope.row.HIGHLOWFLAG == 'HH' || scope.row.HIGHLOWFLAG == 'LL',
                   'col-red color-white allBg radius':scope.row.PANICFLAG == '1'}">{{scope.row[item.name]}}</span>
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
                  <span :class="{'col--red':scope.row.HISHIGHLOWFLAG1 == 'H' || scope.row.HISHIGHLOWFLAG1 == 'P' || scope.row.HISHIGHLOWFLAG1 == 'HH','col--blue':scope.row.HISHIGHLOWFLAG1 == 'L' || scope.row.HISHIGHLOWFLAG1 == 'LL', 'italic underline':scope.row.HISHIGHLOWFLAG1 == 'HH' || scope.row.HISHIGHLOWFLAG1 == 'LL',
                   'col-skyblue allBg':scope.row.LIFELIMITFLAG1 == 'H' || scope.row.LIFELIMITFLAG1 == 'L' || scope.row.LIFELIMITFLAG1 == 'P'}">{{scope.row[item.name]}}</span>
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
                  <span :class="{'col--red':scope.row.HISHIGHLOWFLAG2 == 'H' || scope.row.HISHIGHLOWFLAG2 == 'P' || scope.row.HISHIGHLOWFLAG2 == 'HH','col--blue':scope.row.HISHIGHLOWFLAG2 == 'L' || scope.row.HISHIGHLOWFLAG2 == 'LL', 'italic underline':scope.row.HISHIGHLOWFLAG2 == 'HH' || scope.row.HISHIGHLOWFLAG2 == 'LL',
                   'col-skyblue allBg':scope.row.LIFELIMITFLAG2 == 'H' || scope.row.LIFELIMITFLAG2 == 'L' || scope.row.LIFELIMITFLAG2 == 'P'}">{{scope.row[item.name]}}</span>
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
                  <span :class="{'col--red':scope.row.HISHIGHLOWFLAG3 == 'H' || scope.row.HISHIGHLOWFLAG3 == 'P' || scope.row.HISHIGHLOWFLAG3 == 'HH','col--blue':scope.row.HISHIGHLOWFLAG3 == 'L' || scope.row.HISHIGHLOWFLAG3 == 'LL', 'italic underline':scope.row.HISHIGHLOWFLAG3 == 'HH' || scope.row.HISHIGHLOWFLAG3 == 'LL',
                   'col-skyblue allBg':scope.row.LIFELIMITFLAG3 == 'H' || scope.row.LIFELIMITFLAG3 == 'L' || scope.row.LIFELIMITFLAG3 == 'P'}">{{scope.row[item.name]}}</span>
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
                  <span :class="{'col--red':scope.row.HISHIGHLOWFLAG4 == 'H' || scope.row.HISHIGHLOWFLAG4 == 'P' || scope.row.HISHIGHLOWFLAG4 == 'HH','col--blue':scope.row.HISHIGHLOWFLAG4 == 'L' || scope.row.HISHIGHLOWFLAG4 == 'LL', 'italic underline':scope.row.HISHIGHLOWFLAG4 == 'HH' || scope.row.HISHIGHLOWFLAG4 == 'LL',
                   'col-skyblue allBg':scope.row.LIFELIMITFLAG4 == 'H' || scope.row.LIFELIMITFLAG4 == 'L' || scope.row.LIFELIMITFLAG4 == 'P'}">{{scope.row[item.name]}}</span>
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
                  <span :class="{'col--red':scope.row.HISHIGHLOWFLAG5 == 'H' || scope.row.HISHIGHLOWFLAG5 == 'P' || scope.row.HISHIGHLOWFLAG5 == 'HH','col--blue':scope.row.HISHIGHLOWFLAG5 == 'L' || scope.row.HISHIGHLOWFLAG5 == 'LL', 'italic underline':scope.row.HISHIGHLOWFLAG5 == 'HH' || scope.row.HISHIGHLOWFLAG5 == 'LL',
                   'col-skyblue allBg':scope.row.LIFELIMITFLAG5 == 'H' || scope.row.LIFELIMITFLAG5 == 'L' || scope.row.LIFELIMITFLAG5 == 'P'}">{{scope.row[item.name]}}</span>
                </template>
              </vxe-table-column>

              <vxe-table-column
                v-else-if="item.name == 'INSTVERIFYFLAG'"
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
                  <span v-if="scope.row.INSTVERIFYFLAG == 1">通过</span>
                  <span v-else-if="scope.row.INSTVERIFYFLAG == 2">未通过</span>
                  <span v-else>无</span>
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
              </vxe-table-column>
            </template>
          </sort-table>
        </div>
        <div class="reportRemark">
          <span class="remarkLabel inlB vt">报告备注:</span>
          <span class="remarkText inlB vt" v-scroll>
            {{currentRow.REMARK}}
          </span>
        </div>
    </div>
    <div class="picListBox inlB vt" v-if="picShow && reportImageList.length > 0" v-scroll>
      <div class="picItemBox" v-for="(item, index) in reportImageList" :key="index">
        <p class="picName">{{item.FILENAME}}</p>
        <img @click="showBigPic(index)" class="picContent" v-lazy="item.IMAGEURL || 'data:image/jpeg;base64,' + item.IMAGEDATA" alt="">
      </div>
    </div>
    <div class="picBigShow fx" @click="bigShow = false" v-if="bigShow">
      <i @click.stop="picChange('left')" class="ab iconfont icon-xzjt" ></i>
      <img @mousewheel="scrollFunc" class="bigPic ab" :style="`transform: translate(-50%, -50%) scale(${scaleNum})`" :src="reportImageList[picIndex].IMAGEURL || 'data:image/jpeg;base64,' + reportImageList[picIndex].IMAGEDATA" alt="">
      <i @click.stop="picChange('right')" class="ab iconfont icon-xyjt"></i>
    </div>
  </div>
</template>
<script>
import { sampleDeliveryQuery } from '@/app/utils/tableName';

export default {
  components: {

  },
  data() {
    return {
      // 模块Code
      moduleCode: sampleDeliveryQuery.resultTable.moduleCode,
      // 模块name
      moduleName: sampleDeliveryQuery.resultTable.moduleName,
      // 表格头部
      tableTitle: [
        {
          name: 'id',
          label: 'NO.',
          width: '32',
          checked: true,
          fixed: '',
          sortable: false
        },
        {
          name: 'ITEMNUM',
          label: '编码',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'ITEMNAME',
          label: '名称',
          width: '160',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'RESULT',
          label: '结果',
          width: '150',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'LASTRESULT',
          label: '修改记录',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'REFERENCERANGE',
          label: '参考值',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISRESULT1',
          label: '历史1',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISRESULT2',
          label: '历史2',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISRESULT3',
          label: '历史3',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISRESULT4',
          label: '历史4',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HISRESULT5',
          label: '历史5',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'REDO',
          label: '复做',
          width: '70',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'HINTINFO',
          label: '提示',
          width: '100',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'TESTINSTNAME',
          label: '检测仪器',
          width: '120',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'ODRESULTCHAR',
          label: 'OD值',
          width: '65',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'CUTOFFVALUECHAR',
          label: 'CutOff值',
          width: '65',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'SCOVALUECHAR',
          label: 'S/CO值',
          width: '65',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'INSTVERIFYFLAG',
          label: '仪器标志',
          width: '85',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'INSTVERIFYCONTENT',
          label: '仪器审核内容',
          width: '110',
          checked: true,
          fixed: '',
          sortable: true
        }
      ],
      // 历史记录
      history: [
        {
          HISRESULT: 'HISRESULT1',
          HISHIGHLOWFLAG: 'HISHIGHLOWFLAG1',
          LIFELIMITFLAG: 'LIFELIMITFLAG1',
          propTitle: '历史1',
          label: '历史1'
        },
        {
          HISRESULT: 'HISRESULT2',
          HISHIGHLOWFLAG: 'HISHIGHLOWFLAG2',
          LIFELIMITFLAG: 'LIFELIMITFLAG2',
          propTitle: '历史2',
          label: '历史2'
        },
        {
          HISRESULT: 'HISRESULT3',
          HISHIGHLOWFLAG: 'HISHIGHLOWFLAG3',
          LIFELIMITFLAG: 'LIFELIMITFLAG3',
          propTitle: '历史3',
          label: '历史3'
        },
        {
          HISRESULT: 'HISRESULT4',
          HISHIGHLOWFLAG: 'HISHIGHLOWFLAG4',
          LIFELIMITFLAG: 'LIFELIMITFLAG4',
          propTitle: '历史4',
          label: '历史4'
        },
        {
          HISRESULT: 'HISRESULT5',
          HISHIGHLOWFLAG: 'HISHIGHLOWFLAG5',
          LIFELIMITFLAG: 'LIFELIMITFLAG5',
          propTitle: '历史5',
          label: '历史5'
        }
      ],
      // 当前选中的图片下标
      picIndex: 2,
      // 大图展示
      bigShow: false,
      // 图片放大缩小比例
      scaleNum: 1
    };
  },
  props: {
    // 表格展示数据
    reportResultList: Array,
    // 图片展示数据
    reportImageList: Array,
    // 项目图片显示
    picShow: Boolean,
    // 当前条码
    currentRow: Object
  },
  computed: {

  },
  watch: {
    reportResultList() {
      this.tableTitleHistoryChange();
    }
  },
  created() {
  },
  mounted() {
    // document.addEventListener('mousewheel', this.scrollFunc());
  },
  methods: {
    /* 获取新的排序，并重置 */
    getNewTableTitle(newTableTitle) {
      this.tableTitle = [];
      this.$nextTick(() => {
        this.tableTitle = JSON.parse(JSON.stringify(newTableTitle));
      });
    },
    /* 展示大图 */
    showBigPic(index) {
      this.picIndex = index;
      this.scaleNum = 1;
      this.bigShow = true;
    },
    /* 左右切换 */
    picChange(val) {
      if(val == 'left') {
        if(this.picIndex == 0) {
          this.$layerUtils.showMessage('已经是第一幅图了', this.$layerUtils.messageType.WARNING);
          return false;
        }
        this.picIndex -= 1;
      } else {
        if(this.picIndex == this.reportImageList.length - 1) {
          this.$layerUtils.showMessage('已经是最后一幅图了', this.$layerUtils.messageType.WARNING);
          return false;
        }
        this.picIndex += 1;
      }
    },
    /* 图片缩放 */
    scrollFunc(e) {
      if(e.wheelDelta < 0) {
        this.scaleNum /= 1.05;
      } else {
        this.scaleNum *= 1.05;
      }
    },
    /* 表格头部历史改变 */
    tableTitleHistoryChange() {
      if(this.reportResultList.length != 0) {
        if(!(this.reportResultList && this.reportResultList[0])) {
          return;
        }
        this.history[0].label = this.reportResultList[0].HISEXECTIME1.substr(2, 9) || '历史1';
        this.history[1].label = this.reportResultList[0].HISEXECTIME2.substr(2, 9) || '历史2';
        this.history[2].label = this.reportResultList[0].HISEXECTIME3.substr(2, 9) || '历史3';
        this.history[3].label = this.reportResultList[0].HISEXECTIME4.substr(2, 9) || '历史4';
        this.history[4].label = this.reportResultList[0].HISEXECTIME5.substr(2, 9) || '历史5';
      } else {
        this.history.forEach((item, index) => {
          this.$set(this.history[index], 'label', item.propTitle);
        });
      }
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
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.italic
  font-style italic
.allBg
  display inline-block
  width calc(100% + 18px)
  height 21px
  margin-top 1px
  margin-left -9px
  padding-left 9px
.not-allowed
  color #ccc
.resultBody
  height 100%
  padding 5px
  font-size 0
  .resultTable
    width calc(100% - 200px)
    height 100%
    .tableBox
      height calc(100% - 50px)
      >>>.sortTable
        .vxe-table-element1
          color #000
    .reportRemark
      margin 5px 0
      height 40px
      font-size 0
      .remarkLabel
        width 65px
        text-align right
        font-weight bold
        padding-right 5px
      .remarkText
        border 1px solid #ddd
        width calc(100% - 65px)
        height 40px
        padding 5px 10px
        overflow-y auto
        line-height 14px
  .allWidth
    width 100%
  .picListBox
    width 200px
    height 100%
    padding-left 5px
    overflow-y auto
    .picItemBox
      margin-bottom 10px
      .picName
        margin-bottom 3px
      .picContent
        height 85px
        cursor pointer
        transition 0.8s
      .picContent:hover
        transform scale(1.05)
  .picBigShow
    width 100%
    height 100%
    top 0
    left 0
    z-index 2001
    background rgba(0, 0, 0, 0.5)
    .bigPic
      max-height 90%
      width 50%
      min-width 100px
      left 50%
      top 50%
      transform translate(-50%, -50%)
      cursor zoom-in
      // transform-
    .iconfont
      color #aaa
      font-size 50px
      font-weight bold
      z-index 2
      top 50%
      margin-top -25px
    .icon-xzjt
      left 8%
    .icon-xyjt
      right 8%
    .iconfont:hover
      color #eee

</style>
<style lang="stylus">

</style>