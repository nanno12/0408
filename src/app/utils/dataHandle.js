/**
 * @author lei
 * @date 2018/03/09
 * @explain 处理后台消息数据提示
 */
import * as layerUtils from './layerUtils'
export default  function dataHandle(data){
    return new Promise((resolve,reject)=>{
        if (data.type === "SUCCESS") {
            resolve(data);
        } else if (data.type === "FAILT") {
            layerUtils.showMessage(data.message,layerUtils.messageType.WARNING);
            layerUtils.closeLoadMask();
            reject(data);
        } else {
            layerUtils.showMessage(data.message,layerUtils.messageType.ERROR);
            layerUtils.closeLoadMask();
            reject(data);
        }
    })
}