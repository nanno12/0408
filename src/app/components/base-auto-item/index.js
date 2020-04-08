import BaseAutoItem from './BaseAutoItem';

/* istanbul ignore next */
BaseAutoItem.install = function(Vue) {
  Vue.component(BaseAutoItem.name, BaseAutoItem);
};

export default BaseAutoItem;
