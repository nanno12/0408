/*
 * 定义reportinput模块的store共享数据
 * 提供将states、actions、mutations统一映射到子模块的入口
 * @Author: s_xd@winning.com.cn
 * @Date: 2018-09-12 22:12:51 
 * @Last Modified by: s_xd@winning.com.cn
 * @Last Modified time: 2018-10-08 19:14:04
 */
import * as types from "./mutation-types";
import { createNamespacedHelpers } from "vuex";
const {mapState, mapActions, mapMutations, mapGetters} = createNamespacedHelpers(
    "noticesocket"
);

export default {
  computed: {
    // 将共享状态属性本地化
    ...mapState({
        noticeSocket: state => state.noticeSocket,
        subscribeList:state => state.subscribeList,
        observerList:state => state.observerList
    }),
    //将getters映射为局部
    ...mapGetters([
      "getNoticeSocket",
    ]),
  },
  methods: {
    ...mapMutations({
    //   /** 更改报告筛选条件 仪器项目+检测日期*/
    //   setNoticeSocket: types.SET_NOTICE_SOCKET,
    }),
    ...mapActions([
      "setNoticeSocket",
      "addSubscribe",
      
    ])
  }
};
