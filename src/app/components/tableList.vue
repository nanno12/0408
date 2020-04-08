<!--
* @author: chuyunshi
* @date: 2019/05/05
* @module: 采集列表模式
-->
<template>
  <div class="tableBg" v-scroll>
    <div class="tableHead">
      <table border="1">
        <thead>
          <tr class="title">
            <th style="width: 50px">主色标</th>
            <th v-for="(item, index) in tableListTitle" :key="index" :style="{ width: item.checked ? `${item.width}px` : '0px'}">
              <ellipsis-lable> 
                <span v-if="item.checked">{{item.label}}</span>
              </ellipsis-lable>
            </th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tableBody" @scroll="tableBodyScroll()">
      <table border="1">
        <tbody v-for="(items, outerIndex) in tableData" :key="outerIndex">
          <tr v-for="(item, subIndex) in items.children" :key="subIndex">
            <td style="width: 50px" class="re">
              <span class="ab line"
              v-if="items.children.length > 1"
              :class="[subIndex == 0 ? 'lineTop' : '', items.children.length - 1 == subIndex ? 'lineBottom' : '']"
              ></span>
              <span class="ab circle"
              v-if="items.children.length % 2 == 0 && items.children.length / 2 == subIndex || items.children.length % 2 == 1 && (items.children.length - 1) / 2 == subIndex"
              :class="[items.children.length % 2 == 0 ? 'circleTop' : 'circleCenter']"
              :style="{background: items.COLOR}"
              >
            
              <span class="ab prefixCode bold">{{items.BARPREPART}}</span>
              </span>
            </td>
            <td class="ellipsis re"  
              :class="[!itemChild.disabled ? 'gray' : '']" v-for="(itemChild, index) in item.children" :key="index" 
              :style="[{ width:itemChild.checked ? `${itemChild.width}px` : '0px'},{background: (itemChild.checked && itemChild.name == 'BAREXAMNAME')?items.COLOR:''}]">
              <el-checkbox
              v-model = "itemChild.value"
              v-if="itemChild.name == 'OP_CHECK'"
              @change="showOrderList(items.BARGROUP,itemChild.LISORDERCODE,itemChild.value,itemChild.NUMFLAG)"
              :disabled="!itemChild.disabled"
              ></el-checkbox>
              <template v-else-if="itemChild.checked && itemChild.name == 'APPLYTIME'">
                <ellipsis-lable>
                <span :class="[itemChild.UNBAROVERAPLLYTIME == 1 ? 'red' : '']" :title="itemChild.UNBAROVERAPLLYTIME == 1 ? itemChild.UNBAROVERAPLLYTIMEMSG : ''">{{itemChild.value}}
                  <span v-if="itemChild.beyond=='B'" :class="[itemChild.beyond=='B'?'red':'']">({{itemChild.day}}天前)</span>
                </span>
                </ellipsis-lable>
              </template>
              <template v-else-if="itemChild.checked && itemChild.name == 'EXCUTETIME'">
                <ellipsis-lable>
                <span :class="[itemChild.UNBAROVEREXECTIME == 1 ? 'red' : '']" :title="itemChild.UNBAROVEREXECTIME == 1 ? itemChild.UNBAROVEREXECTIMEMSG : ''">{{itemChild.value}}</span>
                </ellipsis-lable> 
              </template>

              <template v-else-if="itemChild.checked && itemChild.name == 'BAREXAMNAME'">
                <ellipsis-lable>
                <span   class="invert-color" v-if="!items.BAREXAMCODE">未配置</span>
                <span   class="invert-color" :style="{color: setColor(items.FONTCOLOR)}" v-else>{{itemChild.value}}</span>
                </ellipsis-lable> 
              </template>
              <template v-else-if="itemChild.checked && itemChild.name == 'SAMPLECOMMENT'">
                <ellipsis-lable>
                  <span>{{itemChild.value}}</span>
                </ellipsis-lable>
              </template>
              <template v-else-if="itemChild.checked && itemChild.name == 'HISORDERNAME'">
                <div class="proName" :class="[refuseOrder ? '' : 'proNoRefuse']">
                  <ellipsis-lable>
                    <span :class="[itemChild.MJZBZ == 1 ? 'red' : '',itemChild.name]">{{itemChild.value}}</span>
                  </ellipsis-lable>
                </div>
                <span @click="openSelectReason(itemChild)" v-if="itemChild.disabled && moduleCode!=='jysq' && refuseOrder" class="refuse ab">拒</span>
              </template>
              <template v-else-if="itemChild.checked && itemChild.name == 'CHARGEFLAGDESC'">
                <ellipsis-lable>
                  <span  :class="[itemChild.flag != '1' ? 'red':'']">{{itemChild.value}}</span>
                </ellipsis-lable>
              </template>
              <template v-else-if="itemChild.checked && itemChild.name == 'SAMPLENAME'">
                
                  <span class=" setyosj">
                    <ellipsis-lable>
                    {{itemChild.value}}
                    </ellipsis-lable>
                  </span>
                  <i class="iconfont icon-more1"
                    v-if="itemChild.disabled && moduleCode!=='jysq'"        
                    @click="operatorMenu(itemChild, items.codeGroup[subIndex], items)"
                    slot="reference"
                  ></i>
              </template>
              <ellipsis-lable v-else-if="itemChild.checked">
                <span :class="itemChild.name">{{itemChild.value}}</span>
              </ellipsis-lable>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <i class="ab iconfont icon-shezhi"  @click="setShow"></i>
    <el-dialog
      title="表格设置"
      size="tiny"
      :modal-append-to-body="false"
      :before-close="setClose"
      :modal="false"
      :width="395"
      :height="'50%'"
      class="publicDialog"
      :visible.sync="setBoxShow"
      >
      <div class="moveBox" v-show="setBoxShow" ref="moveBox">
        <draggable
          element="ul"
          class="dragBox"
          :options="{animation:100, handle:'.move'}"
          @end="moveChange"
          v-model="tableTitle"
          >
            <li class="dragItem"
            v-for="item in tableTitle"
            :key="item.name"
            >
              <span class="mr-20"><span>名称：</span>
                <span class="bold inlB ellipsis titleName">
                  <ellipsis-lable>{{item.label}}</ellipsis-lable>
                </span>
              </span>
              <span class="mr-20"><span>列宽：</span> <el-input v-model="item.width" type="number" @blur="blurChange(item)" min="0" style="width: 60px" @change="inputChange"></el-input></span>
              <span class="mr-20"><el-checkbox v-model="item.checked" class="bold" :disabled="item.name == 'OP_CHECK'" @change="checkedChange">展示</el-checkbox></span>
              <i class="iconfont icon-move-updown vm mr-20" :class="[item.name == 'OP_CHECK' ? '' : 'move']"></i>
            </li>
          </draggable>
          <div class="dialogBottom">
            <el-button @click="submit(false)">恢复默认设置</el-button>
            <el-button :disabled="!setSave" type="primary" @click="(submit(true))">保 存</el-button>
            <el-button @click="setClose">取 消</el-button>
          </div>
      </div>
      </el-dialog>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  import * as layerUtils from 'app/utils/layerUtils'
  import Common from '@/app/api/common.js';

  export default {
    components: {
      draggable
    },
    data() {
      return {
        /**表格头部原始数据 */
        tableTitle: [
          {
            name: 'OP_CHECK',
            label: '选择',
            width: '50',
            checked: true,
            fixed: false,
            custom: true
          },
          {
            name: 'BAREXAMNAME',
            label: '条码分组',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'EXAMGROUPNAME',
            label: '检测小组',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'HISORDERNAME',
            label: '项目名称',
            width: '120',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'HISORDERCODE',
            label: '项目代码',
            width: '120',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'PRICE',
            label: '单价',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'SAMPLENAME',
            label: '标本种类',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'BARCODE',
            label: '条形码',
            width: '120',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'FPH',
            label: '发票号',
            width: '120',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'CHARGEFLAGDESC',
            label: '收费状态',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'APPLYDEPTNAME',
            label: '申请科室',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'APPLYTIME',
            label: '申请时间',
            width: '220',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'EXCUTETIME',
            label: '要求执行时间',
            width: '180',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'EXECDEPTNAME',
            label: '执行科室',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'SAMPLECOMMENT',
            label: '采集说明',
            width: '180',
            checked: true,
            fixed: false,
            custom: true
          },
          {
            name: 'BARADDITIVENAME',
            label: '添加剂',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'ENTRUST',
            label: '嘱托',
            width: '180',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'ITEMQTY',
            label: '数量',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'BARCUBAGE',
            label: '采血量',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
          {
            name: 'BARDESCRIBE',
            label: '分组描述',
            width: '80',
            checked: true,
            fixed: false,
            custom: false
          },
        ],
        /**表格数据 */
        tableData: [],
        tableTitleDefault: [], // 默认初始头部
        tableTitleCopy: [], // 用于取消恢复数据
        setBoxShow: false, // 表格设置框
        setSave: false, // 保存设置
        valueChange: false, // 输入框值是否发生改变
        tableListTitle: [], // 表格头部渲染数据
      }
    },
    props: {
      refuseOrder: Boolean, // 拒绝处方权限
      ordersampleList: Array, // 标本种类下拉数据
      moduleCode: String, // 模块Code
      moduleName: String, // 模块Name
      orderList: [Array,Object], // 住院采集数据源
    },
    created() {
      // this.$store.dispatch("Sampling/getPatorders",data.data);
    },
    computed: {
      getPatorders: {
        get() {
          if(this.moduleCode == 'mzcj') {
            return this.$store.state.Sampling.patorders.orderlist
          } else if(this.moduleCode == 'zycj') {
            return this.orderList.orderlist
          } else if(this.moduleCode == 'jysq') {
            return this.$store.state.TestApply.patorders.orderlist
          }
        },
      },
    },
    watch: {
      getPatorders() {
        if(this.getPatorders == undefined) {
          this.tableData = [];
        }
        this.orderlistChange()
      },
     
    },
    
    mounted() {
      this.tableTitleDefault = JSON.parse(JSON.stringify(this.tableTitle));
      this.getTableTitle()
      this.tableListTitle = JSON.parse(JSON.stringify(this.tableTitle));
    },
  
    methods: {
      /**字体颜色 */
      setColor(rgb) {
        if(rgb == null || rgb == undefined) {
          return "#000"
        }
        let rgbArr = rgb.split(',')
        let r = rgbArr[0];
        let g = rgbArr[1];
        let b = rgbArr[2];
        // console.log(rgb,r*0.299 + g*0.578 + b*0.114,1900)
        if(r*0.299 + g*0.578 + b*0.114 < 192){ //深色
          return "#fff"
        }else{  //浅色
          return "#000"
        }
      },
      /**设置表头跟随滚动 */
      tableBodyScroll() {
        let _scrollLeft = this.$el.querySelector(".tableBody").scrollLeft
        this.$el.querySelector(".tableHead").scrollLeft = _scrollLeft
        // console.log(_scrollLeft)
      },
      /**下三角菜单 */
      operatorMenu(subRow, codeGroup, itemRow) {

        this.$emit("operatorMenu", subRow, codeGroup, itemRow);
      },
      /**是否勾选 */
      showOrderList(BARGROUP, LISORDERCODE, isCheck, NUMFLAG){
        this.$emit("showOrderList", BARGROUP, LISORDERCODE, isCheck, NUMFLAG, true)
      },
      /**打开拒绝处方原因弹窗 */
      openSelectReason(subRow) {
        this.$emit("openSelectReason", subRow);
      },
      /**获取表格头部顺序 */
      getTableTitle() {
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
        }
        Common.getgirdconfig(params).then(data =>{
          if(data.type =='SUCCESS') {
            if(data.data.data && data.data.data.length > 0){
              this.tableTitle = data.data.data;
              this.tableListTitle = JSON.parse(JSON.stringify(this.tableTitle));
            }
              
          }
        })
      },
      /**表格设置框展示 */
      setShow() {
        this.setBoxShow = true;
        this.tableTitleCopy = JSON.parse(JSON.stringify(this.tableTitle));
      },
      /**输入框改变 */
      inputChange() {
        this.setSave = true;
        this.valueChange = true;
        // this.tableChange();
      },
      /**多选框改变 */
      checkedChange() {
        this.setSave = true;
        this.orderlistChange();
      },
      /**拖拽位置改变 */
      moveChange() {
        this.setSave = true;
        this.orderlistChange();
      },
      /**光标离开 */
      blurChange(item) {
        if(item.width == '') {
          item.width = ''
        } else if(item.width < 0) {
          item.width = 0;
          layerUtils.showMessage('列宽不可小于0',layerUtils.messageType.WARNING);
        }
        if(this.valueChange) {
          this.orderlistChange();
        }
        this.valueChange = false;
      },
      /**关闭设置框 */
      setClose() {
        if(!this.setSave) {
          this.setBoxShow = false;
        } else {
          layerUtils.confirmMessage('表格设置已被修改，是否保存？','提示','warning',{showClose: false}).then(() =>{
            this.submit(true);
          }).catch(() => {
            this.tableTitle = JSON.parse(JSON.stringify(this.tableTitleCopy));
            this.orderlistChange();
            this.setSave = false;
            this.setBoxShow = false;
          });
        }
      },
      /**提交保存 */
      submit(flag) {
        console.log("提交！")
       
        // console.log(this.newTableTitle);
        let params={
          moduleCode: this.moduleCode,
          moduleName: this.moduleName,
          jsonStr: flag ? this.tableTitle : [],
        }
        Common.addgirdconfig(params).then(data =>{
           if(data.type =='SUCCESS') {
              this.setSave = false;
              this.setBoxShow = false;
           }
        })
        if(!flag) {
          this.tableListTitle = JSON.parse(JSON.stringify(this.tableTitleDefault));
          this.tableTitle = JSON.parse(JSON.stringify(this.tableTitleDefault));
        }
      },
      /**列表重组 */
      orderlistChange() {
        this.tableListTitle = JSON.parse(JSON.stringify(this.tableTitle));
        if(!this.getPatorders || this.getPatorders.length <= 0) return false;
        let group = this.getPatorders.map(item => [item.BARGROUP]).reduce((a,b) =>a.concat(b)).distinct().map(item => ({
          BARGROUP:item,
          COLOR: '',
          FONTCOLOR: '',
          BAREXAMCODE: '',
          BARPREPART: '',
          children: [],
          codeGroup:[],
        }));
        group.forEach(item => {
          this.getPatorders.forEach(items => {
            if(item.BARGROUP === items.BARGROUP){
              if(items.COLOR&&items.COLOR.split(",").length==3){
                item.COLOR = `rgb(${items.COLOR})`;
              }else{
                item.COLOR="";
              }
              item.FONTCOLOR = items.COLOR;
              item.BAREXAMCODE = items.BAREXAMCODE;
              item.BARPREPART = items.BARPREPART;
              let childList = [];
              this.tableTitle.forEach(childItem => {
                let listItem = {
                  value: items[childItem.name],
                  disabled: items['OP_CHECKENABLE'],
                  width: childItem.width,
                  name: childItem.name,
                  checked: childItem.checked,
                  beyond: items['BEYONDTIMELIMIT'],
                  day: items['APPLYDAYS'],
                  flag: items['CHARGEFLAG'],
                  groupMenu: false,
                  MJZBZ: items['MJZBZ'],
                  LISORDERCODE: items['LISORDERCODE'],
                  NUMFLAG: items['NUMFLAG'],
                  UNBAROVERAPLLYTIME: items['UNBAROVERAPLLYTIME'],
                  UNBAROVERAPLLYTIMEMSG: items['UNBAROVERAPLLYTIMEMSG'],
                  UNBAROVEREXECTIME: items['UNBAROVEREXECTIME'],
                  UNBAROVEREXECTIMEMSG: items['UNBAROVEREXECTIMEMSG']
                }
                childList.push(listItem);
              })
              item.children.push({
                children: childList
              })
              item.codeGroup.push(
                {
                  hisordercode:items.HISORDERCODE,
                  hisordername:items.HISORDERNAME,
                  hospitalcode:'',
                  lisordercode:items.LISORDERCODE,
                  samplecode:items.SAMPLECODE,
                  samplename:items.SAMPLENAME
                }
              )
            }
          })
        })
        this.tableData = group;
      }
    },
  }
</script>
<style lang="stylus" scoped>
.gray
  color #bbb
.red
  color #f00
.tableBg
  height 100%
  table
    table-layout fixed
    width 100%
    white-space nowrap
    border-spacing 0
    border-collapse collapse
    thead
      border-top 1px solid #d1d1d1
      border-bottom 1px solid #d1d1d1
      background rgb(238, 241, 246)
      tr
        th
          padding 5px
          height 32px
          line-height 22px
          text-align left
          font-weight bold
    tbody
      tr
        td
          height 18px
          line-height 18px
          padding 0 5px
          border-bottom 1px solid #ededed
        td:first-child
          border-bottom none
          border-right 1px solid #ededed
          background transparent!important
      tr:last-child
        td:first-child
          border-bottom none
      tr:hover
        td
          background rgb(202, 221, 246)
        .icon-more1
          opacity 1
        .refuse
          opacity 1
.tableHead
  overflow hidden
.tableBody
  height calc(100% - 32px)
  overflow auto
.HISORDERNAME
  font-weight bold
  font-size 14px
.proName
  width calc(100% - 30px)
.proNoRefuse
  width 100%
.invert-color
  font:bold 14px "SimHei";
.circle
  width 12px
  height 12px
  border-radius 50%
  background #ccc
  right 9px
  .prefixCode
    height 12px
    font-size:14px
    line-height 12px
    top 0
    left -20px
.circleTop
  top -6px
.circleCenter
  top 6px
.line
  right 0
  border-left 2px dashed #20a0ff
  height 30px
  width 16px
.lineTop
  height 20px
  border-top 2px dashed #20a0ff
  bottom 0
.lineBottom
  height 20px
  border-bottom 2px dashed #20a0ff
  top 0
.setyosj
  width calc(100% - 16px)
  display inline-block
  height 24px
  line-height 24px
  vertical-align middle
.refuse
  color red
  opacity 0
  top 2px
  right 10px
  font-weight bold
  cursor pointer
.refuse:hover
  opacity 0.6 !important
.icon-more1
  position absolute
  bottom 7px
  right 3px
  line-height normal
  color #20a1ff
  opacity 0
  font-size 12px
.moveBox
  font-size 12px
  background #fff
  .dragBox
    .dragItem
      height 32px
      .titleName
        width 60px
      .icon-move-updown
        cursor no-drop
        color #aaa
      .move
        cursor n-resize
        color #333
  .icon-close
    top 2px
    right 2px
.icon-shezhi
  top 2px
  right 2px
  font-size 12px
.searchInpuBox
  width 150px
  margin-bottom 10px
</style>
<style lang="stylus">
.tableBg
  .el-input__inner
    padding 3px 0 3px 10px!important
</style>
