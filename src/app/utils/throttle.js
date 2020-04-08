/**
 * Created by sven on 2017/7/4.
 */

$(window).on('resize',function () {
  throttling(adjustSlider);
});

function throttling(method, throttlingTime) {
  if(typeof method.tId === "undefined"){
    method.tId = 0;
    method.call(context, data);//第一次触发立刻执行
    return;
  }
  var tId = method.tId;
  if(!tId){
    method.tId = setTimeout(function () {
      method();
      method.tId = 0;
    }, throttlingTime || 500)
  }
}
