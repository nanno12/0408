/**
 *@description 框架工具类
 */

import * as layerUtils from "./layerUtils";
const FrameMessageType = {
    /** 框架消息*/
    SEND_MESSAGE_TOFRAME:{
      evtCode:'FRAME_MESSAGE',
      evtName:'已审核'
    },
  
    /** 改变菜单 */
    CHANGE_MENU_TO:{
      evtCode:'moduleSwitch',
      evtName:'已审核'
    },
};
const FrameUtils = {
    registerFrameEventHandle(){
        window.removeEventListener('message',this.frameEventHandle,false);
        window.addEventListener('message',this.frameEventHandle,false);
    },
    frameEventHandle(evt){
            let payLoad = evt.data;
            if(!payLoad.eventType){
                return true;
            }
            let evtType =payLoad.eventType.evtCode;
            switch (evtType) {
                case FrameMessageType.CHANGE_MENU_TO.evtCode:
                    layerUtils.showMessage(`子页面希望切换菜单到主页：`+payLoad.data);
                    break;
                case FrameMessageType.SEND_MESSAGE_TOFRAME.evtCode:
                    layerUtils.showMessage(`1子页面发来消息：`+payLoad.data);
                    break;
                default:
                    break;
            }
    },
    sendMessageToFrame:function (data,options) {
        let payLoad = {eventType:FrameMessageType.SEND_MESSAGE_TOFRAME,data:data};
        // window.parent.postMessage(payLoad,'*');
    },

    changeMenu:function (data,options) {
        let payLoad = {eventType:CHANGE_MENU_TO,data:data};
        // window.parent.postMessage(payLoad,'*');
    }
}
  
  
export default FrameUtils