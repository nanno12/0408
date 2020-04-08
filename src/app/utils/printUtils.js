/**
 * @author chuyunshi
 * @date 2020/02/28
 * @module 基础打印
 */

import httpUtils from '@techCommon/utils/httpUtils'
import DataHandle from './dataHandle.js'
import SmartClientUtils from "@techCommon/utils/smartClientUtils";
import PrintMode from "../enums/PrintMode"
import resultType from "../enums/resultType";
import * as layerUtils from "./layerUtils";
import Common from "@/app/api/common";
import ReportInput from "../../modules/sampleDeliveryQuery/api/api.js";

const SYS_CODE="LIMS";

export default {
  /* 基础打印 */
  basePrint(list, template) {
    layerUtils.loadMask("正在发送打印请求");
    return new Promise((resolve, reject) => {
      SmartClientUtils.print(SYS_CODE,PrintMode.RPINT, template, list)
    })
  },
  /*  报告打印
   *  reject(1):打印出错
   *  reject(2):接口出错
   *  reject(3):接口出错
   *  reject(4):网络错误
   */
  reportPrint: function (params) {
    return new Promise((resolve, reject) => {
      layerUtils.loadMask("正在获取打印数据");

      ReportInput.getReportPrintdata(params).then( async responseMessage => {
        if (responseMessage.type === resultType.SUCCESS) {
          layerUtils.loadMask("正在发送打印请求");
          // resolve(responseMessage);
          if(responseMessage.data.APPLYNOLIST && responseMessage.data.APPLYNOLIST.length > 0) {
            // 调techSvr,传递applyno(数组)
            // SmartClientUtils.print(SYS_CODE,params.printmode, responseMessage.data.template, responseMessage.data.patinfo, responseMessage.data.resultinfo,{imageData:responseMessage.data.reportimagelist})
            await SmartClientUtils.printByService(SYS_CODE,params.printmode, jwt, responseMessage.data.APPLYNOLIST)  
            .then(data => {
              resolve(responseMessage);
            })  
            .catch(err => {
                reject(1);
              })
              .finally(_ => {
                layerUtils.closeLoadMask();
              });
          }
        } else if (responseMessage.type === resultType.FAILT) {
          let messageCode = responseMessage.messageCode;
          if(messageCode.startsWith("CONFIRM_")){
            reject(responseMessage);
          }else{
            reject(2);
            let message='';
            if(responseMessage.data && responseMessage.data.faultList){
              message = responseMessage.data.faultList[0];
            }else{
              message = responseMessage.message;
            }
            layerUtils.showMessage(message, layerUtils.messageType.WARNING);
          }
        } else {
          reject(3);
          layerUtils.showMessage(responseMessage.message, layerUtils.messageType.ERROR);
        }
      }).finally(responseMessage => {
        reject(4);
        layerUtils.closeLoadMask();
      });

    });
  }
}

