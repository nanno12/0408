/*
created by
*/
const reportStatus = {
  /** 初始*/
  INIT:{
    STATUS:'<50',
    STATUSNMAE:'初始状态',
    STATUSCOLOR:'r-color'//为报告状态添加统一的颜色类
  },

  /** 已审核 */
  AUDITED:{
    STATUS:'50',
    STATUSNMAE:'已审核',
    STATUSCOLOR:'g-color'
  },

  /** 已发布*/
  PUBLISHED:{
    STATUS:'60',
    STATUSNMAE:'已发布',
    STATUSCOLOR:'b-color'//
  },

  /** 已打印*/
  PRINT:{
    PRINTSTATUS:'1',
    STATUSNMAE:'已打印',
    STATUSCOLOR:'b-color'
  },


};

export default reportStatus;
