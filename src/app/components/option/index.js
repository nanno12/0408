import BaseOption from '../select/BaseOption';

/* istanbul ignore next */
BaseOption.install = function(Vue) {
  Vue.component(BaseOption.name, BaseOption);
};

export default BaseOption;
