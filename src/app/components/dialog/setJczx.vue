<!--
* @author: chuyunshi
* @date: 2019/07/01
* @module: 标本种类筛选弹窗（复用）
-->
<template>
  <el-dialog
    title="检测中心设置"
    size="tiny"
    :before-close="cancel"
    :modal-append-to-body="false"
    :modal="false"
    :width="500"
    :max-height="400"
    class="common-dialog"
    :visible.sync="setJczxShow"
    @open="open"
    >
    <div class='searchInpuBox'>
        <el-input ref="searchInput" v-model="searchText" placeholder="请输入检索内容"></el-input>
    </div>
    <div class="tableBox">
      <sort-table
        ref="multipleTable"
        :tableData="filterList"
        :tableTitle="tableTitle"
        :highlight="true"
        :border="false"
        :isheightrow="currentRow"
        :setShow="false"
        @current-change="rowClick">
        <template v-for="(item)  in tableTitle">
          <vxe-table-column v-if="item.type == 'selection'" type="selection" :width="item.width" :fixed="item.fixed" :key="item.name"></vxe-table-column>
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
    </el-dialog>

</template>
<script>


  export default {
    components: {

    },
    data() {
      return {
        searchText: '', // 搜索内容
        currentRow: {}, // 当前选中的
        tableTitle: [
          {
            name: 'CODE',
            label: '编码',
            width: '120',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'NAME',
            label: '名称',
            width: '',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'MEMCODE1',
            label: '输入码一',
            width: '120',
            checked: true,
            fixed: '',
            sortable: true
          },
          {
            name: 'MEMCODE2',
            label: '输入码二',
            width: '110',
            checked: true,
            fixed: '',
            sortable: true
          }
        ]
      }
    },
    props: {
      setJczxShow: Boolean, // 弹框显示
      organList: Array, // 筛选数据源
    },
    created() {
    
    },
    computed: {
      /*展示列表数据 筛选*/
      filterList() {
        let newList = this.gettList()
        return newList || [];
      },
    },
    watch: {
      setBbzlShow() {
        if(this.setBbzlShow) {
          this.$nextTick(() => {
            this.$refs.searchInput.$refs.input.focus()
          })
        } else {
          // this.searchText = ''
        }
      }
    },
    methods: {
      /**弹框打开 */
      open(){
        this.searchText = '';
      },
      /*检索信息*/
      gettList() {
        return this.searchText ? this.organList.filter(this.createFilter(this.searchText)) : this.organList;

      },
      /*展示列表数据 筛选筛选*/
      createFilter(queryString) {
        let temp = queryString.toLowerCase();
        return (restaurant) => {
          return ((restaurant.CODE + '').toLowerCase().indexOf(temp) >= 0) ||
          ((restaurant.NAME + '').toLowerCase().indexOf(temp) >= 0) ||
          ((restaurant.MEMCODE1 + '').toLowerCase().indexOf(temp) >= 0) ||
          ((restaurant.MEMCODE2 + '').toLowerCase().indexOf(temp) >= 0)
        };
      }, 
      rowClick(row) {
        // this.switchGroup(this.subRow, row, this.itemRow);
        this.currentRow = row;
        this.$emit("rowClick", row)
        this.$nextTick(() => {
          this.$refs.multipleTable.$refs.xTable.clearCurrentRow();
          this.cancel();
        })
      },
      cancel() {
        this.$emit('update:setJczxShow', false);
      }
    }
  }

</script>

<style lang="stylus" scoped>
.searchInpuBox
  width 150px
  margin-bottom 10px
.tableBox
  height 216px
</style>
