/*
 * 报告管理-vuex-actions
 * @Author: s_xd@winning.com.cn 
 * @Date: 2018-07-18 13:10:59 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-10-08 13:13:00
 */

import * as types from './mutation-types'
import state from './state'

/** 添加订阅消息 */
export const addSubscribe = function ({commit,state}, payload) {
    let observer=payload.observer;
    let subInfoData = payload.data;
    // state.noticeSocket.send("sxd");
    commit(types.ADD_SUBSCRIBE, payload);
};

/** 设置对象 */
export const setNoticeSocket = function ({commit}, payload) {
    commit(types.SET_NOTICE_SOCKET, payload);
};