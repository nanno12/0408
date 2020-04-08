/*
* 多选组件
* @Author: s_xd@winning.com.cn
* @Date: 2018-11-23 14:59:41
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2019-05-17 18:57:52
*/
<template>
  <!--搜索框开始 暂时屏蔽-->
  <div class="muti-select-wrap">
    <div class="text">

      <transition-group>
        <el-tag class="tag"
                v-for="item in currentItems"
                :key="item[keyfield]"
                :closable="true"
                type="success"
                @close="deleteTag($event, item)"
                :close-transition="false">
          <span class="el-select__tags-text">{{ item.NAME }}</span>
        </el-tag>
      </transition-group>
    </div>
    <div class="operate-area">
      <el-popover v-model="groupItemShow"
                  placement="right-start"
                  width="400"
                  @show="itemListInit"
                  trigger="click">
        <div class="wrapper-group-item">
          <!--搜索框开始 暂时屏蔽-->
          <div class="wrapper-itemtable">
            <el-input class="wrapper-itemtable-search"
                      placeholder="请输入关键词搜索"
                      icon="search"
                      v-model="itemFilterKey">
            </el-input>
          </div>
          <el-table :data="filterItemList" class="short-table"
                    :row-key="keyfield" ref="multipleTable" 
                    stripe height="280"
                    @select="selectItem"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" 
                             width="35"
                             :disableAllselect="disableAllselect" 
                             :reserve-selection="true">
            </el-table-column>
            <el-table-column width="120"
                             show-overflow-tooltip
                             property="CODE" label="代码">
            </el-table-column>
            <el-table-column property="NAME"
                             width="200"
                             show-overflow-tooltip
                             label="名称">
            </el-table-column>
            <el-table-column :formatter="formaterMemoCode"
                             show-overflow-tooltip
                             label="输入码1">
            </el-table-column>
            <el-table-column :formatter="formaterMemoCodeSec"
                             show-overflow-tooltip
                             label="输入码2">
            </el-table-column>
          </el-table>
          <div class="operat-wrap">
            <div class="select-desc"><span class="len">{{selectItemDesc}}</span><span class="limit">{{limitLen}}</span>
            </div>
            <el-button type="primary" @click="confirm()">确定</el-button>
            <el-button @click="close()">关闭</el-button>
          </div>
        </div>

        <span class="oprate icon-control-normal" :class="{nodata:tempList.length==0}" slot="reference">
                    <i class="iconfont icon-bgbj"></i>
        </span>
        <!-- <i class="iconfont icon-add" slot="reference">组合项目</i> -->
      </el-popover>
      <span class="oprate icon-control-normal" @click="clear()" v-if="tempList.length>0">
                <i class="iconfont btnclear">清除</i>
     </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MultiSelectInput",
    data() {
      return {
        //是否显示
        groupItemShow: false,
        //表格选中
        multipleSelection: [],
        //过滤关键字
        itemFilterKey: "",
        //中转的数组
        tempList: [],
      };
    },
    //自定义model,用于父组件v-model
    model: {
      prop: "dataList",//props中必须定义同名的props
      event: "change"  //通过触发change事件来触发双向驱动
    },
    props: {
      dataList: {
        required: true
      },
      //数据源
      itemListData: {
        type: [Array, String],
        default: function () {
          return [];
        }
      },
      //数据源
      maxNum: {
        type: [Number],
        default: undefined
      },
      keyfield: {
        type: [String],
        default: "CODE"
      }
    },
    created() {
    },
    watch: {
      dataList(val) {
        // if (val.length > 0) {
        //     this.currentPlaceholder = '';
        // } else {
        //     this.currentPlaceholder = this.cachedPlaceHolder;
        // }
        //this.setSelected();
        // if (this.filterable && !this.multiple) {
        //     this.inputLength = 20;
        // }
        // this.$emit('change', val);
        // this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    computed: {
      disableAllselect() {
        //如果设置了最大选择数，同时数据源超过最大选择数，则不允许全部选择
        if (this.maxNum && this.maxNum > 0 && this.itemListData.length > this.maxNum) {
          return true;
        }
        return false;
      },
      selectItemDesc() {
        let desc = `已选${this.multipleSelection.length}项`;
        return desc;
      },
      limitLen() {
        let limit = "";
        if (this.maxNum && this.maxNum > 0) {
          limit = ` 最多选${this.maxNum}项`;
        }
        return limit;

      },
      /** 当前选中的项 */
      currentItems() {
        if (this.checkIsAarry()) {
          this.tempList = this.dataList.slice();
          return this.tempList;
        }

        let arr = this.dataList?this.dataList.split(","):[];
        let temp = [];

        for (let i = 0, len = this.itemListData.length; i < len; i++) {
          const element = this.itemListData[i];
          if (arr.indexOf("" + element[this.keyfield]) > -1) {
            temp.push(element);
          }
        }
        this.tempList = temp;
        return temp;
      },
      /** 检索仪器项目 */
      filterItemList() {
        let newData = this.itemListData.slice();
        let filterKey = this.itemFilterKey && this.itemFilterKey.trim();
        //如果没有记录
        if (!filterKey) {
          return newData;
        }
        newData = newData.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .trim()
                .toLowerCase()
                .indexOf(filterKey.toLowerCase()) > -1
            );
          });
        });
        return newData;
      }
    },
    methods: {
      formaterMemoCode(row, column, cellValue) {
        return row["MEMCODE1"] || "";
      },
      formaterMemoCodeSec(row, column, cellValue) {
        return row["MEMCODE2"] || "";
      },
      /** 获取仪器项目 */
      itemListInit() {
        this.itemFilterKey = " ";
        this.itemFilterKey = "";
        this.$refs.multipleTable.clearSelection();
        this.tempList.forEach(row => {
          let find = this.itemListData.find(it => {
            return it[this.keyfield] == row[this.keyfield];
          });
          this.$refs.multipleTable.toggleRowSelection(find);
        });
      },
      /** 删除项 */
      deleteTag(event, tag) {
        let temp = this.tempList.slice();
        let index = temp.findIndex(item => {
          return item[this.keyfield] == tag[this.keyfield];
        });
        if (index < 0) {
          return;
        }
        temp.splice(index, 1);
        this.sysnData(temp);
        event.stopPropagation();
      },
      selectItem(selection, row) {
        if (this.maxNum&&this.maxNum>1 && this.multipleSelection.length > this.maxNum) {
          this.$refs.multipleTable.toggleRowSelection(row, false);
        }else if(this.maxNum==1){
            this.multipleSelection.forEach(element => {
                this.$refs.multipleTable.toggleRowSelection(element, false);
            });
            this.$refs.multipleTable.toggleRowSelection(row, true);
        }
      },
      /** 行勾选 */
      handleSelectionChange(val) {


        this.multipleSelection = val;
      },
      /** 关闭选择窗口 */
      close() {
        this.groupItemShow = false;
      },
      /** 确定按钮 */
      confirm() {
        this.sysnData(this.multipleSelection.slice());
        this.close();
      },
      /** 清除选项 */
      clear() {
        this.sysnData([]);
      },
      /** 数据更新提交绑定v-model */
      sysnData(temp) {
        //this.dataList = [];
        if (this.checkIsAarry()) {
          this.$emit("change", temp);
        } else {
          let arr = [] ,arr1 =[];
          temp.forEach(element => {
            arr.push(element[this.keyfield]);
            arr1.push(element.NAME.trim());
          });
          this.$emit("change", arr.join(","));
          this.$emit("changeData", arr1.join(","))
        }

      },
      /** 校验数据源是否是数组 */
      checkIsAarry() {
        if (Array.isArray(this.dataList)) {
          this.checkIsAarry = () => {
            return true;
          }
        } else {
          this.checkIsAarry = () => {
            return false;
          }
        }
        return this.checkIsAarry();
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .muti-select-wrap {
    width: auto;
    display: flex;
    vertical-align: middle;
    position: relative;

    .text {
      width: auto;
      min-width: 30px;
      height:100%;
      background: #eee;
      border-radius: 5px;
      border: 1px solid #eee;
      min-height: 26px;

      .tag {
        margin: 2px;
      }
    }

    .oprate {
      display: inline-block;
      margin:3px 5px 2px 5px; 
    }

    .operate-area {
        padding:2px 0 0 0; 
        margin:0 5px;
        min-width :40px;
    }

    .nodata {
      position: absolute;
      left: 2px;
      margin: 2 2px 2px 5px ;
    }

    .btnclear {
      font-weight: bold;
      font-size: 12px;
    }
  }

  .wrapper-group-item {
    margin: 0px 10px;
    .wrapper-itemtable {
      .el-input {
        width: 78%
      }
    }
  }

  .operat-wrap {
    margin: 10px 5px 10px 5px;
    text-align: right;
    .select-desc {
      margin-top: 5px;
      float: left;
      font-size: 14px;
      .limit {
        color: #c00;
      }
    }
  }
</style>
