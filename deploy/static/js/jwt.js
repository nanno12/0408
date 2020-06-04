let qs = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")

  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
getUrlKey = function (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
let url = "http://172.16.0.24:8889/ums";
var jwt;
var token;
var authToken;
((() => {
  let uurl = `${umsUrl}/api/auth/umsurl`
  //查询路径参数jwt信息
  jwt = getUrlKey("jwt")
  if (!jwt) { //无jwt信息，跳转登录
    if (qs("DEBUG") == "1") {
      return;
    }

    
  } else {
    // let auth=jwt.indexOf('.')>0?jwt:'Basic '+jwt;
    // $.ajaxSetup({
    //     headers: {'Authorization':auth}
    // })
  }
})())
