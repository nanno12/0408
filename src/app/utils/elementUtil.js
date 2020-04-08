/**
 * @author: lei
 * @date: 2018/01/05
 * @module:DOM操作类
 * @explain:公共方法
 */

/*
*   如：elem=document.getElementById('id');
*      let distance=getElementViewTop(elem);
*  返回该元素距离浏览器工作区域的高度 如：800(没有px)
*/
export function getElementViewTop(element){
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null){
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  let elementScrollTop=document.documentElement.scrollTop;
  return actualTop-elementScrollTop;
}
