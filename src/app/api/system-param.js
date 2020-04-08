/*
 * @description
 *》服务的别名预先定义，为了避免发布的时候还要改配置文件：
 *》发布的时候运行npm run deploy;对应发布文件到deploy文件夹中。
 *》测试和debug分别可以修改SYS_DEBUGMOD，并且npm run build可以发布debug版本和测试版本;对应发布文件到dist文件夹中。
 *》本地开发调试时运行npm run dev
 *》服务模式分2种模式：debug、发布，分别对应下面解释
 * @Last Modified by: mikey.zhaopeng
 * @Author: s_xd@winning.com.cn
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2020-03-24 19:01:47
 */

const config = require('../../../config');

/** 系统代码，放在设置文件中方便处理*/
const SYS_SYSCODE = "LIMS";

/** 发布部署模式，动态读取构建命令 */
const SYS_DEPLOY = process.env.ENV_DEPLOY;

/** 是否进行通信加密,表示在post数据前是否进行加密处理数据*/
const SYS_ENCRYPTION_FLAG = false;

//本地服务前缀
const mockUrl = process.env.NODE_ENV === 'production' ?
   config.build.assetsSubDirectory :
   config.dev.assetsPublicPath + config.dev.assetsSubDirectory;


/** 发布模式配置，前后端采用集中部署，前端走Ngix服务模式,名称和前缀预定义 */
const DEPOLY_API = "../lis/api/";
const SYS_API_DEPOLY = {
  /**  公共服务*/
  COMMON: { url: DEPOLY_API+"routine/", apiDesc: "公共服务" },
  /**  常规系统*/
  ROUTINE: { url: DEPOLY_API+"routine/", apiDesc: "常规系统" },
  /**  标本采集*/
  COLLECTION: { url: DEPOLY_API+"collection/", apiDesc: "标本采集" },
  /**  his服务地址*/
  HISSERVICE: { url: DEPOLY_API+"hisservice/", apiDesc: "his服务地址" },
  /**  配置管理*/
  MANAGEMENT: { url: DEPOLY_API+"management/", apiDesc: "配置管理" },
  /**  智能服务*/
  INTELLIGENTSERVICE: { url: DEPOLY_API+"intelligentservice/", apiDesc: "智能服务" },
  /**  质量管理*/
  QUALITYCONTROL: { url: DEPOLY_API+"qualitycontrol/", apiDesc: "质量管理" },
  /**  标本流转*/
  SAMPLEDELIVERY: {  url: "api/sampledelivery/", apiDesc: "标本流转" },
  /**  微生物系统*/
  MICROBEMANAGE: { url: DEPOLY_API+"microbe/", apiDesc: " 微生物系统" },
   /**  查询统计*/
  QUEYSTATISTICS: { url: "api/" + "querystatistics/", apiDesc: " 查询统计" },
  /** 申请单 */
  APPLYFORM: { url: "api/trf/", apiDesc: " 申请单" },
  /** 本地服务*/
  LOCAL: { url: mockUrl, apiDesc: "本地数据" },
  /**  主框架*/
  FRAME: { url: "../frame/"+DEPOLY_API+"/frameservice/", apiDesc: "主框架" },
};


/** debug模式的时候，可以任意改地址入口，允许统一改，也允许单独改 */
const DEBUGAPI = "http://172.17.1.211:9000/lis/api/";//9000服务
// const DEBUGAPI = "http://172.17.1.240:8000/lis/api/";//测试环境
// const DEBUGAPI="http://172.17.13.71:10003/lis/";//xds
// const DEBUGAPI = "http://172.17.17.209:20013/lis/";//dwl
// const DEBUGAPI = "http://172.17.17.27:10002/lis/";//shenke
// const DEBUGAPI = "http://172.17.29.69:10003/lis/";//znk
// const DEBUGAPI = "http://172.17.24.103:10003/lis/";//hjh
// const DEBUGAPI = "http://172.17.17.91:20016/lis/";//gyh
// const DEBUGAPI = "http://172.17.17.182:10002/lis/";//tianye
const SYS_API_DEBUG = {
  /**  公共服务*/
  COMMON: { url: DEBUGAPI+"routine/", apiDesc: "公共服务" },
  // COMMON: { url: DEBUGAPI, apiDesc: "常规系统" },
  /**  常规系统*/
  ROUTINE: { url: DEBUGAPI+"routine/", apiDesc: "常规系统" },
  // ROUTINE: { url: DEBUGAPI, apiDesc: "常规系统" },
  /**  标本采集*/
  COLLECTION: { url: DEBUGAPI+"collection/", apiDesc: "标本采集" },
  // COLLECTION: { url: DEBUGAPI, apiDesc: "标本采集" },
  /**  his服务地址*/
  HISSERVICE: { url: DEBUGAPI+"hisservice/", apiDesc: "his服务地址" },
  /**  配置管理*/
  MANAGEMENT: { url: DEBUGAPI+"management/", apiDesc: "配置管理" },
  // MANAGEMENT: { url: DEBUGAPI, apiDesc: "配置管理" },
  /**  智能服务*/
  INTELLIGENTSERVICE: { url: DEBUGAPI+"intelligentservice/", apiDesc: "智能服务" },
  /**  质量管理*/
  QUALITYCONTROL: { url: DEBUGAPI+"qualitycontrol/", apiDesc: "质量管理" },
  // QUALITYCONTROL: { url: DEBUGAPI, apiDesc: "质量管理" },
   /**  标本流转*/
   SAMPLEDELIVERY: { url: "http://172.17.1.211:9000/sampledelivery/api/sampledelivery/", apiDesc: "标本流转" },
  /**  微生物系统*/
  MICROBEMANAGE: { url: DEBUGAPI+"microbe/", apiDesc: " 微生物系统" },
  // MICROBEMANAGE: { url: DEBUGAPI, apiDesc: " 微生物系统" },
  /**  查询统计*/
  QUEYSTATISTICS: { url:"http://172.17.1.211:9000/querystatistics/api/"+"querystatistics/", apiDesc: " 查询统计" },
  // QUWEYSTATISTICS: { url: DEBUGAPI, apiDesc: " 查询统计" },
  /** 本地服务*/
  LOCAL: { url: mockUrl, apiDesc: "本地数据" },
  /**主框架*/
  FRAME: { url: 'http://172.17.1.211:9000/frame/api/frameservice/', apiDesc: "主框架" },
  /**  主框架*/
  // FRAME: { url:DEBUGAPI, apiDesc: "主框架" },
  APPLYFORM: {url: "http://172.17.1.211:20031/api", apiDesc: "申请单"}
};


/** 服务前缀*/
let SYS_BASE_API = SYS_API_DEBUG;//服务器

// npm run deploy 的时候，表示真正发布的时候，和Nginx一并部署。
SYS_BASE_API = SYS_DEPLOY ? SYS_API_DEPOLY : SYS_BASE_API;
console.log(SYS_BASE_API);
export { SYS_BASE_API,SYS_SYSCODE };
