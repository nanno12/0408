/**
 * 公共状态管理
 */
import common from '../api/common'
const namespaced = true;
const state = {
  /** 服务端时间*/
  serverTime:"",
  pageChangeNum: "",
  tabChange: '',
};
const getters = {
};

//同步操作
const mutations = {
  //全局的服务器时间
  ['GLOBLE/GET_SERVER_TIME'] (state,data){
    state.serverTime =data;
  },
  //监听页面变化
  ['GLOBLE/PAGE_CHANGE_NUM'] (state,data){
    state.pageChangeNum = data;
  },
  // 设置随机数
  ['GLOBLE/TAB_CHANGE'] (state,data){
    state.tabChange = data;
  },
};

//异步操作
const actions = {
  //获取服务器时间
  getServerTime({commit} ,params){
    common.getServerTime(params).then((responseMessage)=>{
      commit('GLOBLE/GET_SERVER_TIME',responseMessage.message||responseMessage.data);
    });
  },
  //获取当前页面值
  getPageNum({commit} ,params){
    let _height = document.body.clientHeight;
    let _width = document.body.clientWidth;
    // console.log(_height+_width)
    commit('GLOBLE/PAGE_CHANGE_NUM',_height+_width);
  },
  /**获取随机数 */
  getTabChange({commit} ,params){
    commit('GLOBLE/TAB_CHANGE',params);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}
