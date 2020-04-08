/**
 * Created by Administrator on 2017/6/26.
 */

/**
 * 测试标志代码
 */
export default{
  install(Vue,key,value)
  {
    Vue.prototype.log = function (key,value) {
      console.log(key);
      console.log(value);
    }
  }
}
