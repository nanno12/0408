<template>
    <div>
      <win-form 
        labelWidth="100px"
        ref="searchForm"
        :searchData="searchData"
        :searchForm="searchForm">
      </win-form>
   </div>
</template>

<script>
export default {
  data() {
    let caseState = [
      { label: "男", value: '1' },
      { label: "女", value: '2' }
    ];
    let entrustProps = { label: "label", value: "value" };
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      // 如果数据要回显后不可编辑，使用JSON.parse(JSON.stringify())转换
      searchData: {},
      searchForm: [
        {
          type: "Input",
          label: "审核名称",
          prop: "phone",
          col: 12,
          placeholder: "请输入审核名称",
          // 表单验证
          rules: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
        },
        {
          type: "number",
          label: "最小量",
          prop: "phone",
          col: 12,
          placeholder: "请输入单位ml",
          rules: [{ required: true, validator: checkPhone, trigger: "blur" }]
        },
        {
          type: "number",
          label: "最大量",
          prop: "phone",
          col: 12,
          placeholder: "请输入单位ml",
          rules: [{ required: true, validator: checkPhone, trigger: "blur" }]
        },
        {
          type: "textarea",
          label: "描述",
          placeholder: "请输入描述",
        },
        {
          type: "Select",
          label: '审核名称',
          prop: "companyId",
          options: caseState,
          props: entrustProps,
          change: row => {
            this.changeCompany(row);
          },
          placeholder: "请选择审核名称",
          rules: [{ required: true, message: "请选择审核名称", trigger: "change" }]
        },
        {
          type: "number",
          label: "步骤序号",
          prop: "phone",
          placeholder: "请输入步骤序号",
          rules: [{ required: true, validator: checkPhone, trigger: "blur" }]
        },
         {
          type: "Input",
          label: "步骤名称",
          prop: "phone",
          placeholder: "请输入步骤名称",
          // 表单验证
          rules: [{ required: true, message: "请输入步骤名称", trigger: "blur" }]
        },
        {
          type: "Select",
          label: "操作角色",
          prop: "deptId",
          options: [],
          props: entrustProps,
          change: row => {
            this.changeDepar(row);
          },
          placeholder: "请选择操作角色",
          rules: [{ required: true, message: "请选择操作角色", trigger: "change" }]
        },
      ],
      // right:[
      //   {
      //     type: "Select",
      //     label: "审核名称",
      //     prop: "sex",
      //     // 渲染数组
      //     options: caseState,
      //     // 下拉转换
      //     props: entrustProps,
      //     change: row => "",
      //     placeholder: "请选择审核名称",
      //     rules: [{ required: true, message: "请选择审核名称", trigger: "change" }]
      //   },
      // ],
      ruleForm: {}
    };
  },
  methods: {
    // 下拉选择分公司，查询部门数据
    changeCompany(row) {
      console.log('changeCompany',row);
    },
    // 下拉选择部门，查询职位数据
    changeDepar(row) {
      console.log('changeDepar',row);

    },
    // 职位下拉事件
    changePosition(row) {
      console.log('changePosition',row);
    }
  }
};
</script>