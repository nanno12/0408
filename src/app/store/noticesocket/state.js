/*
 * 报告管理-vuex-states
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-07-18 13:14:02 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-10-08 11:09:40
 */

const namespaced = true;
const state = {
    /** 通知消息WebSocket*/
    noticeSocket:null,
    /** 订阅列表 */
    subscribeList:[],
    /** 观察者列表 */
    observerList:[],

};

export default state
