<template>
  <div>
    <w-row>
      <w-col class="illness">
        <title-style class=" mg-right_16 pd-bottom_22 po_re">
          <span slot="header">单病种列表</span>
          <w-button class="po_ab top_-5 right_0" @click="handleAdd"  type="text" plain>从HIS导入</w-button>
        </title-style>
        <win-table :listTable="illnessTableTitle"
          @handleDelete="handleDelete"
          :tableData="illnessList"
          :isShow="illnessIsShow">
        </win-table>
      </w-col>
    </w-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      illnessTableTitle:[
        {
          label:'诊断代码',
          prop:'name',
          width:'80px'
        },
        {
          label:'诊断名称',
          prop:'name'
        },
        {
          label:'拼音码',
          prop:'name'
        },
        {
          label:'五笔码',
          prop:'name'
        }
      ],
      illnessList:[
        {
          name: "赵宇翔",
        }
      ],
      illnessIsShow:{
        index:true,
        edit:true,
        width:'80px'
      }
    };
  },
  created() {},
  methods: {
    // 界面新增按钮
    handleAdd() {
    },
    handleDelete(){}
  },
  
};
</script>
<style lang="scss" scoped>

.home-page-wrap-ba {
  // height: 100%;
  background: rgba(255, 255, 255, 1);
  .blood {
    .tag-title {
      text-align: center;
      display: inline-block;
      margin-bottom: 16px;
      width: 180px;
      height: 52px;
      background: rgba(243, 245, 249, 1);
      border-radius: 2px;
      line-height:52px;
      font-size: 14px;
    }
    .styleHover,
    .styleHover:hover {
        color: #0F49ED;
        background: rgba(207, 224, 255, 1) !important;
      }
  }
  .illness {
    .rule_conditions {
      position: relative;
      #mycanvas {
        // border: 1px solid #0F49ED;
        display: inline-block;
        position: absolute;
        top: 0;
        left: -25px;
      }
      .w-input,
      .w-select{
        width: 200px;
      }
      .w-checkbox {
        height: 32px;
        margin: 5px 0;
      }
    }
  }
}
</style>
<style lang='scss'>
.rule_conditions {
  .w-checkbox__input {
    padding: 6px 0;
  }
}

// .home-page-wrap-ba {
//   // height: 100%;
//   // background: rgba(234, 237, 244, 1);
//    .home-page-body{
//     // padding: 16px;
//     background: rgba(255, 255, 255, 1);
//     // border-radius: 2px;
//     position: relative;

//     .ul {
//       position: absolute;
//       top: 0;
//       left: 20px;
//     }

//     .table {
//       width: calc(100% - 200px);
//       margin-left: 200px;
//     }

//     .tag-title {
//       text-align: center;
//       display: inline-block;
//       margin: 16px 0px;
//       width: 180px;
//       height: 52px;
      
//       background: rgba(243, 245, 249, 1);
//       border-radius: 2px;
//     }
//   }
// }

.styleHover {
  color: #666;
}
</style>

