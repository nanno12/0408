/*
 * @description 配置扫描枪扫码相关配置
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-05-05 15:53:39
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2019-06-20 11:53:51
 */


const PARAME_SCANNER_OPTIONS={
  validLength:8,//校验有效位数，本系统识别8位以上才识别为有效条码。
  timeInterval:150,//识别有效时间间隔，单位ms，因为一般扫描枪扫码很快，所以认为8位以上字符在150ms内输完，就是扫码。
  avgTime:19  //平均每位输入要小于19ms
}

export {PARAME_SCANNER_OPTIONS};
