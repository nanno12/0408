/*
 * 报告管理-vuex-入口
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-07-18 13:11:53 
 * @Last Modified by:   s_xd@winning.com.cn 
 * @Last Modified time: 2018-07-18 13:11:53 
 */

import * as actions from './actions.js'
import getters from './getters'
import state from './state'
import mutations from './mutations'
const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}
