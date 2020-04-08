/**
 * 状态管理主入口
 */
import Vue from 'vue'
import Vuex from 'vuex'
import globle from './globle.js'
//通知消息模块
import noticesocket from './noticesocket/index'
import HomePage from '@/modules/homepage/store/'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
//    strict: process.env.NODE_ENV !== 'production',
  //state,mutations,actions,//全局的
  modules: {
    globle,
    noticesocket,
    HomePage
  }
})
