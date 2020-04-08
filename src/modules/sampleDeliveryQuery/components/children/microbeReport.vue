<!--
* @author w_sh
* @date 2020-03-10
* @module 标本流转查询-右侧全流程
-->
<template>
  <div class="microbeReport">
    <div class="tableBoxTop">
      <sort-table
        ref="multipleTable"
        :tableData="tableDataTop"
        :tableTitle="tableTitleTop"
        :highlight="true"
        :border="false"
        :setShow="false">
        <template v-for="(item)  in tableTitleTop">
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
    <div class="tableBoxBottom">
      <div></div>
      <div class="tableBox">
        <sort-table
          ref="multipleTable"
          :tableData="tableDataBottom"
          :tableTitle="tableTitleBottom"
          :highlight="true"
          :border="false"
          :setShow="false">
          <template v-for="(item)  in tableTitleBottom">
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
    </div>
  </div>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      // 微生物顶部表格数据
      tableDataTop: [],
      // 微生物顶部表格表头
      tableTitleTop: [
        {
          name: 'jklx',
          label: '结果代码',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'dyshai',
          label: '微生物结果',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rzms',
          label: '菌落计数',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '菌落比例（%）',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        }
      ],
      // 微生物顶部表格数据
      tableDataBottom: [],
      // 微生物顶部表格表头
      tableTitleBottom: [
        {
          name: 'jklx',
          label: 'NO.',
          width: '50',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'dyshai',
          label: '代码',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rzms',
          label: '抗生素名称',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '方法',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '结果',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '敏感性',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '折点范围',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '折点标准',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '分组',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        },
        {
          name: 'rznr',
          label: '不打印',
          width: '',
          checked: true,
          fixed: '',
          sortable: true
        }
      ]
    };
  },
  props: {

  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped>
.microbeReport
  display flex
  box-orient vertical
  box-direction normal
  flex-direction column
  height 100%
  .tableBoxTop
    display flex
    padding 5px
    flex 2
    max-height 240px
  .tableBoxBottom
    display flex
    flex 3
    padding 5px
    .tableBox
      width 100%
</style>
<style lang="stylus">

</style>