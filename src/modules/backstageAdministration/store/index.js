
const namespaced = true;
const state = {
  // 菜单
  ItemMenu: {},
  // 选中项目
  selectList: [],
};
const getters = {};
//同步操作
const mutations = {
  // menu
  ['GET_ITEM_MENU'] (state, obj){
    state.ItemMenu = obj;
  },
  // 选中项目
  ['GET_SELECT_LIST'] (state, list){
    state.selectList = list;
  },
};

//异步操作
const actions = {
  // menu
  getItemMenu({commit}, data) {
    commit('GET_ITEM_MENU', data);
  },
  // 选中项目
  getSelectList({commit}, data) {
    commit('GET_SELECT_LIST', data);
  },
};

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}