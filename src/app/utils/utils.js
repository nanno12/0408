/**
* @author: jinxl
* @date: 2017/12/06
* @module:实用工具包
* @explain:公共方法
 */
let lisUtils = {
  /*日期格式化*/
  dateFormat:{
    //标准日期时间，如：2017-12-06 18:18:18
    dateTime:function (date) {
      if(!date) return '';
      let _date,_month,_day,_hour,_min,_minute,_second;
        _date = new Date(date);
        _month  = this.fillDigits(_date.getMonth() + 1);
        _day  = this.fillDigits(_date.getDate());
        _hour = this.fillDigits(_date.getHours());
        _min = this.fillDigits(_date.getMinutes());
        _second = this.fillDigits(_date.getSeconds());
      return _date.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _min + ':' +_second;
    },
    //标准日期，如：2017-12-06
    date:function (date) {
      let _date = this.dateTime(date);
      if(_date != ''){
        return _date.split(' ')[0];
      }
      return _date;
    },
    //单位转双位，如：2→02
    fillDigits(num){
      return num > 9 ? num : '0' + num;
    }
  },
  /*字符串格式化*/
  stringFormat:{
    //移除空格
    removeSpace : function (oTarget) {
      let re = /^\s*(.*?)\s*$/;
      return oTarget.replace(re, '$1');
    },
  },
  /*数值串格式化*/
  numberFormat:{
    doublePercent:function (num) {
      return num*100
    }
  },
  /**菜单权限控制 */
  checkMenuPower:function(powerItem, menuPowerList){
    if(!powerItem){
      return true;
    }
    let powerCode = powerItem.POWERCODE;
    if(!powerCode||powerCode==""){
      return true;
    }
    if(menuPowerList && menuPowerList[powerCode] && menuPowerList[powerCode]["VALUE"]=="1")
    {
      return true;
    }
    return false;
  },
  nextFocus: function(title, _ref) {
    if(title == undefined) {
      _ref.focus();
      return false;
    }
    let flag = true;
    let thisDiv = document.getElementsByClassName("track-content")[0];
    let options = {
          attributes: true,
          attributeFilter: ['class']
    }
    let domChange = new MutationObserver((mutationRecord, observer) => {
      if(thisDiv.className == 'track-content') {
        flag ? _ref.focus() : '';
        flag = false;
      }
      // console.log(observer)
    })
    domChange.observe(thisDiv, options)
  },
};
export default lisUtils;
