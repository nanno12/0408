import BaseDialog from './BaseDialog';

/* istanbul ignore next */
BaseDialog.install = function(Vue) {
  Vue.component(BaseDialog.name, BaseDialog); 
};

export default BaseDialog;
