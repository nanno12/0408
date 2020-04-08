import { hasOwn } from '../utils/utils';

export function isVNode(node) {
  return typeof node === 'object' && hasOwn(node, 'componentOptions');
};

export function getFirstComponentChild(children) {
  return children && children.filter(c => c && c.tag)[0];
};

/** 给元素设置光标并选中*/
export function setEelementSelect(item){
    if(item){
        // //禁用的不接受光标
        // if(item.hasAttribute("disabled")&&item.attributes["disabled"].value=="disabled"){
        //     return false;
        // //不可见的不接受光标
        // }else if(item.style["display"]=="none"){
        //     return false;
        // }
        
        let focused= false;
        //有聚焦的方法
        if(item.focus){
            item.focus();
            //判断是否当前就是聚焦的焦点
            if(item==document.activeElement)
            {
                focused = true;
                //item.select();
            }else{
                focused = false;
            }
        }else if(item.$el){
            item = item.$el;
        }

        let input = item.querySelector("input");
        if(input){
            //禁用的不接受光标
            if(input.hasAttribute("disabled")&&item.attributes["disabled"].value=="disabled"){
                return false;
            //不可见的不接受光标
            }else if(input.style["display"]=="none"){
                return false;
            }else{
                input.select();
            }
        }else{
          focused && item && item.select && item.select();
        }

        return focused;
    }
  }