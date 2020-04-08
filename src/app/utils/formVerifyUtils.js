/**
 * @author: lei
 * @date: 2018/04/18
 * @module:表单验证工具类
 * @explain:公共方法
 * @usag:可在el-input的change回调中使用，直接改变v-model的值
 *         如：this.$nextTick(_=>{
                this.form.AGE=ageVerify(val);
               });
 */

/**
 * 样本范围验证
 * 1、以1-9数字开头
 * 2、中间可有可无的-
 * 3、中间可有可无的,
 * 4、-和，前后必须是数字
 * 5、比如：1、   1,2-5,6,9、   3-5,9
 */
export function rangeVerify(val) {
  const reg = /([1-9]{1,})([\-\,0-9]{0,})/;
  const valFormat = val.replace('，', ',');
  let keyWords = valFormat.match(reg);
  // console.log(keyWords);
  return keyWords ? keyWords[0] : '';
}
export function targetRangeVerify(val) {
  const reg = /([1-9]{1,})([\-\\,\]{0,1})([1-9]{0,})/;
  const valFormat = val.replace('，', ',');
  let keyWords = valFormat.match(reg);
  // console.log(keyWords);
  return keyWords ? keyWords : '';
}
/**
 * 日期验证
 */
export function dateVerify(date) {
  console.log(date);
  let reg = /^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/;
  const result = date.match(reg);
  console.log(result);
  if (result === null){
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  let rightTime = d.getFullYear() == result[1] + '-' + (d.getMonth() + 1) == result[3] + '-' + d.getDate() == result[4];
  return rightTime;

}

/**
 * 年龄验证
 * 只能是数字
 * 返回匹配的数字，非数字自动过滤
 */
export function ageVerify(val) {
  const reg = /\d+/;
  let keyWords = val.match(reg);
  return keyWords ? keyWords[0] : '';
}
/**
 *
 * 只能是英文
 * 返回匹配的英文，非英文自动过滤
 */
export function englishVerify(val) {
  const reg = /^[a-zA-Z]/;
  let keyWords = val.match(reg);
  return keyWords ? keyWords[0] : '';
}

/**
 * 申请科室过滤
 * 在NAME、MEMCODE1、MEMCODE2中过滤
 */
export function filterApplyDepList(str, list, keyList = ['NAME', 'CODE', 'MEMCODE1', 'MEMCODE2']) {
  const val = str.toLowerCase();
  return str === '' ? list : list.filter(item => {
    for (let i = 0, len = keyList.length; i < len; i++) {
      if (item[keyList[i]].toLowerCase().indexOf(val) > -1) {
        return true;
      }
    }
    return false;
  });
}

/**
 * 样本范围格式样式
 * -右边的数字不能小于左边的数字,如2-1
 * 如果符合格式返回true，否则返回false
 */
export function rangeFormatVerify(str) {
  let valArr = str.split(',');
  for (let i = 0, len = valArr.length; i < len; i++) {
    if (valArr[i].indexOf('-') > -1) {
      let arr = valArr[i].split('-');
      if (Number(arr[0]) > Number(arr[1])) {
        return false;
      }
    }
  }
  return true;
}
