const PARAME_VXETABLE_OPTIONS = {
  // 默认表格参数
  size: 'small',
  showOverflow: "tooltip",
  showHeaderOverflow: "tooltip",
  align: null,
  headerAlign: null,
  stripe: true,
  border: true,
  resizable: true,
  fit: true,
  //显示头
  showHeader: true,
  //是否高亮行
  highlightCurrentRow: true,
  //光标移动高亮行
  highlightHoverRow: true,
  //高亮当前列
  highlightCurrentColumn: false,
  //光标移动高亮列
  highlightHoverColumn: false,
  sortConfig: {
    trigger: 'default'
  },
  validConfig: {
    message: 'default'
  },
  // 版本号（对于某些带 Storage 数据储存的功能有用到，上升版本号可以用于重置 Storage 数据）
  version: 0,
  // 自定义图标配置（如果全部图标都使用自定义，就不需要引入 Icon 模块了，减少体积）
  icon: {
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filter: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    tree: 'vxe-icon--caret-right',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right',
    msgClose: 'vxe-icon--close',
    msgInfo: 'vxe-icon--info',
    msgSuccess: 'vxe-icon--success',
    msgWarning: 'vxe-icon--warning',
    msgError: 'vxe-icon--error',
    msgLoading: 'vxe-icon--refresh roll'
  },
  // 配置式表格的默认参数
  grid: {
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total'
      }
    }
  },
  // 默认快捷菜单
  menu: {},
  // 默认 tooltip 主题样式
  tooltip: {
    theme: 'dark'
  },
  // 默认分页参数
  pager: {
    pageSize: 10,
    pagerCount: 7,
    pageSizes: [10, 15, 20, 50, 100],
    layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] // 非常灵活的分页布局，支持任意位置随意换
  },
  // 默认工具栏参数
  toolbar: {
    resizable: {
      storage: false
    },
    setting: {
      storage: false
    },
    buttons: []
  },
  // 默认消息提示框参数
  message: {
    zIndex: 999,
    lockView: true,
    lockScroll: true,
    mask: true,
    duration: 3000,
    animat: true
  },
  // 默认优化配置项
  optimization : {
    animat: false,
    // 当表头大于 40 列时自动启用横向 X 滚动渲染
    scrollX: {
      gt: 40,
      oSize: 10,
      rSize: 40
    },
    // 当行数据大于 500 条时自动启用纵向 Y 滚动渲染
    scrollY: {
      gt: 200,
      oSize:25,
      rSize: 80
    }
  },
  keyboardConfig:{isArrow: true}
  // 集成国际化（将对列头、校验提示..进行自动翻译）
  //translate: : key => i18n.t(key)
};

export {PARAME_VXETABLE_OPTIONS};