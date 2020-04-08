/**
 * @author gyx@winning.com.cn
 * @date 2019/07/22
 * @explain 条码预印队列工具类
 */
import DataHandle from '@/app/utils/dataHandle'
import * as layerUtils from 'app/utils/layerUtils'
import Print from '@/app/utils/printUtils'
import Mzcj from '@/modules/sampling/api/api'
export default {
    /*往队列中添加条码 */
    
    addtxm(list,txm){
        list.push(txm)
        let copyList=JSON.parse(JSON.stringify(list))
        console.log(`正在抓取条码${txm}`)
        if(list.length=1){
            this.codeBingding(list,txm)
        }
    },
    //预印条码接口
    codeBingding(list,txm){
        let success=true;
        let falit;
        if(success){
            this.txmQueue(list,1)
        }
      
    },
    /*执行队列方法 */
    txmQueue (executors,txm) {
        return new Promise((resolve, reject) => {
           let res = []
           let copyExecutors=JSON.parse(JSON.stringify(executors))
           let exist= copyExecutors.findIndex((x, i) =>{
              return x==txm
            })
            if(exist>-1){
                copyExecutors.splice(exist,1)
            }
            if (copyExecutors.length <= 0) {   return false}
            copyExecutors.map((x, i) =>{
                var p = Promise.resolve(x) // 等上一个 Promise resolved 之后再创建新的 Promise。
                p.then(response => {
                    this.codeBingding(executors,x)
                    console.log(`正在输出条码${response}`)
                })
            })
          
          })
        },
       
  
  
};