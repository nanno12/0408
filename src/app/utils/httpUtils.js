/*
 * http请求工具类
 * @Author: s_xd@winning.com.cn
 * @Date: 2018-01-14 16:27:41
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-07 09:53:40
 */
/*global require */
const axios = require('axios');
import resultType from '../enums/resultType.js';
import * as layerUtils from './layerUtils';
import smartClientUtils from '@techCommon/utils/smartClientUtils';
import Vue from 'vue';
import Vuex from 'vuex';
// import store from '@/app/store';
Vue.use(Vuex);

const getUrlKey = function (name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

//Vue.use(Message)
//Vue.prototype.$message = Message


const SYS_ENCRYPTION_FLAG = false;
let clientInfo;
// 异步请求指弹一个对话框
let once = true;
axios.interceptors.request.use(axiosConfig => {
	//这里可以加一些交互动作，比如来个进度条开始效果
	//如果是options
	if (axiosConfig.method == "options") {
		return axiosConfig;
	}

	//或者是智能客户端，则不加配置
	if (axiosConfig.useOptions && axiosConfig.useOptions.ForSmartClient == true) {
		return axiosConfig;
	}
	/*global authToken jwt*/
	axiosConfig.headers["Authorization"] = authToken || jwt;

	//拼接主菜单和模块菜单，以逗号分隔，例如住院采集下的标本查询，menuid=623,625
	let arr = [];
	//获取主菜单
	let mainMenuid = getUrlKey("menuid");
	arr.push(mainMenuid);
	//获取模块菜单
	let currentRouter = window.rootVue.$route;
	let subMenuid = "";
	if (currentRouter && currentRouter.params && currentRouter.params.menuid) {
		subMenuid = currentRouter.params.menuid;
		arr.push(subMenuid);
	}
	//拼接主菜单和模块菜单，以逗号分隔
	axiosConfig.headers["menuid"] = arr.join(",");

	if (!clientInfo) {
		clientInfo = smartClientUtils.getClientInfo();
  }
  //进行编码，防止报错。
	axiosConfig.headers["ClientInfo"] = encodeURIComponent(JSON.stringify(clientInfo));
	return axiosConfig;
}, error => {
	return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
	if (res.status >= 200 && res.status <= 300) {
		return res;
	}
	//由后端抛出的错误
	return Promise.reject(res);
}, (error) => {
	//由网络服务器抛出的错误
	return Promise.reject(error);
});

/**
 * 捕获异常处理
 * @param {Object} err
 */
let catchErrorEvt = function (err, params) {
	let messageDesc = "";
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				messageDesc = '请求错误'
				break

			case 401:
				messageDesc = '未授权，请登录'
				break

			case 403:
				messageDesc = '拒绝访问'
				break

			case 404:
				messageDesc = `请求地址出错: ${err.response.config.url}`
				break

			case 408:
				messageDesc = '请求超时'
				break

			case 500:
				messageDesc = '服务器内部错误'
				break

			case 501:
				messageDesc = '服务未实现'
				break

			case 502:
				messageDesc = '网关错误'
				break

			case 503:
				messageDesc = '服务不可用'
				break

			case 504:
				err.message = '网关超时'
				break

			case 505:
				messageDesc = 'HTTP版本不受支持'
				break

			default:
		}
	}
	if (err.message.indexOf('timeout of') >= 0) {
		messageDesc = '请求服务已超时'
	} else if (err.message == 'Network Error') {
		messageDesc = '网络服务异常，请检查网路服务是否正常。'
	}
	//rootVue.$message.error("请求错误服务错误："+err.message);
	if(!params.isOnline) {
		layerUtils.showMessage("请求服务异常，" + err.message + '：' + messageDesc, layerUtils.messageType.ERROR);
	}
	//showMessage(	'<strong>这是 <i>HTML</i> 片段</strong>', messageType.ERROR,{dangerouslyUseHTMLString: true});
};

let catchErrorEvtTechSvr = function (err, type) {
	let messageDesc = "";
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				messageDesc = '请求错误'
				break

			case 401:
				messageDesc = '未授权，请登录'
				break

			case 403:
				messageDesc = '拒绝访问'
				break

			case 404:
				messageDesc = `请求地址出错: ${err.response.config.url}`
				break

			case 408:
				messageDesc = '请求超时'
				break

			case 500:
				messageDesc = '服务器内部错误'
				break

			case 501:
				messageDesc = '服务未实现'
				break

			case 502:
				messageDesc = '网关错误'
				break

			case 503:
				messageDesc = '服务不可用'
				break

			case 504:
				err.message = '网关超时'
				break

			case 505:
				messageDesc = 'HTTP版本不受支持'
				break

			default:
		}
	}

	if (err.message.indexOf('timeout of') >= 0) {
		messageDesc = '请求服务已超时';
	} else if (err.message == 'Network Error') {
		//messageDesc = '网络出现故障，请检查网络连接情况。'
	}
	type = type || "";
	//rootVue.$message.error("请求错误服务错误："+err.message);
	layerUtils.showMessage("请求" + type + "服务错误,请检查TechSvr是否启动：" + err.message + '>>' + messageDesc, layerUtils.messageType.ERROR);

	//showMessage(	'<strong>这是 <i>HTML</i> 片段</strong>', messageType.ERROR,{dangerouslyUseHTMLString: true});
};

// let encrypt = function (data) {
//   return encodeURIComponent(data);
// };

let decrypt = function (data) {
	return data;
}

/**
 * http请求工具类
 */
const httpUtils = {
	/**
	  * 发起post形式的Http请求
	  * @param {string} requestOptions - 请求的url地址:"http://127.0.0.1:9090/getinintdata"
	  * 或者{url:"http://127.0.0.1:9090/getinintdata",desc:"获取字典"}
	  * requestOptions.responseType 响应类型，默认'json' 文件流请求时传'blob'
	  * @param {string} params	  - 请求的数据
	  * @example
	  *
	 */
	post: function (requestOptions, params = {}, loadingFlag = false) {
		//默认不显示加载状态
			if (loadingFlag) {
				layerUtils.loadMask("正在请求服务...");
		}

		if (typeof requestOptions === 'string') {
			requestOptions = {
				url: requestOptions
			};
		}
		let requestUrl = requestOptions.url;
		let requestDesc = requestOptions.desc || "";
		let responseType = requestOptions.responseType || 'json';

		return new Promise((resolve, reject) => {
			axios({
				url: requestUrl,
				method: 'post',
				data: params,
				responseType: responseType,

				transformRequest: [function (data) {

					//这里提前处理发送的数据
					let formData = new FormData();
					//如果本身就是FormData,则不做转换
					if (data.constructor == FormData) {
						return data;
					}

					//遍历对象
					for (let it in data) {
						//其他情况转成Json字符串及uri编码，以兼容原有的方式
						if (data[it] instanceof Object) {
							//如果是文件，则文件不做转换
							if (data[it].constructor == File) {
								formData.append(it, data[it]);
							} else {
								formData.append(it, JSON.stringify(data[it]));
							}
						} else {
							formData.append(it, data[it]);
						}

					}
					return formData;
				}]
			}).then(res => {
				let result = res.data;

				//更新服务端时间
				//rootVue.$store.commit('globle/GLOBLE/GET_SERVER_TIME',serverTime);

				if (result.type == resultType.SUCCESS) {
					if (SYS_ENCRYPTION_FLAG) {
						//针对data进行处理加密
						result.data = decrypt(result.data);
						resolve(result);
					}
					resolve(res.data);
				} else if (result.type == resultType.ERROR && result.failtCode == "SYS_ERR") {
					//resolve(res.data);
					layerUtils.showMessage(result.message, layerUtils.messageType.ERROR, {
						detailOption: result
					});
					reject(res.data);
				} else {
					// 请求文件流后，直接返回res
					if(responseType === 'blob') {
						resolve(res);
						return;
					}
					resolve(res.data);
				}
				httpUtils.toLogin(result);
			})
				.catch(error => {
	  			catchErrorEvt(error, params);
	  			reject(error);
				})
				.finally(() => {
	  			if (loadingFlag) {
	  				layerUtils.closeLoadMask();
	  			}
				});
		});
},

postJsonRequest: function (requestOptions, params = {}, loadingFlag = false) {
	//默认不显示加载状态
	if (loadingFlag) {
		layerUtils.loadMask("正在请求服务...");
	}

	if (typeof requestOptions === 'string') {
		requestOptions = {
			url: requestOptions
		};
	}
	let requestUrl = requestOptions.url;
	let requestDesc = requestOptions.desc || "";

	return new Promise((resolve, reject) => {
		axios({
			url: requestUrl,
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charSet=UTF-8',
			},
			data: params
		}).then(res => {
			let result = res.data;

			//更新服务端时间
			//rootVue.$store.commit('globle/GLOBLE/GET_SERVER_TIME',serverTime);

			if (result.type == resultType.SUCCESS) {
				if (SYS_ENCRYPTION_FLAG) {
					//针对data进行处理加密
					result.data = decrypt(result.data);
					resolve(result);
				}
				resolve(res.data);
			} else if (result.type == resultType.ERROR && result.failtCode == "SYS_ERR") {
				//resolve(res.data);
				layerUtils.showMessage(result.message, layerUtils.messageType.ERROR, {
					detailOption: result
				});
				//layerUtils.showMessage(vnode, layerUtils.messageType.ERROR);
			} else {
				resolve(res.data);
			}
			httpUtils.toLogin(result);
		})
		  .catch(error => {
		  	catchErrorEvt(error, params);
		  	reject(error);
		  })
		  .finally(() => {
		  	if (loadingFlag) {
		  		layerUtils.closeLoadMask();
		  	}
		  });
	});
},
  
postForSmartClient: function (requestOptions, params = {}) {
    if (typeof requestOptions === 'string') {
    	requestOptions = {
    		url: requestOptions
    	};
    }
let requestUrl = requestOptions.url;
let requestDesc = requestOptions.desc || "";
return new Promise((resolve, reject) => {
	axios({
		url: requestUrl,
		method: 'post',
		// timeout: 10000,
		data: params,
		useOptions: {
			ForSmartClient: true
		}
	}).then(res => {
		let result = res.data;
		if (result.type == resultType.SUCCESS) {
			if (SYS_ENCRYPTION_FLAG) {

				//针对data进行处理加密
				result.data = decrypt(result.data);
				resolve(result);

			}

			resolve(res.data);
		} else if (result.type == resultType.ERROR) {
			layerUtils.showMessage("请求【" + requestDesc + "】错误：" + result.message, layerUtils.messageType.ERROR);
			reject();
			return;
			//layerUtils.showMessage(vnode, layerUtils.messageType.ERROR);
		} else {
			resolve(res.data);
			//layerUtils.showMessage("请求【"+requestDesc+"】错误：" + result.message, layerUtils.messageType.ERROR);
		}
	})
	.catch(error => {
		catchErrorEvtTechSvr(error, "【智能客户端TechSvr】");
		reject(error);
	});
});
},



/**
 * 发起get形式的Http请求
 * @param {string} requestOptions - 请求的url地址.
 */
get: function (requestOptions, params = {}) {
    if (typeof requestOptions === 'string') {
    	requestOptions = {
    		url: requestOptions
    	};
    }

let requestUrl = requestOptions.url;
let requestDesc = requestOptions.desc||"";

return new Promise((resolve, reject) => {
	axios({
		url: requestUrl,
		method: 'get',
		params : params,
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	}).then(res => {
		resolve(res.data);
		httpUtils.toLogin(res.data);
	}).catch(error => {
		catchErrorEvt(error, params);
		reject(error);
		
	});
});
},
/**
 * 发起put形式的Http请求
 * @param {string} params - 请求的参数，后端@RequestBody接收
 * @param {string} majorKey - 修改主键，后端@PathVariable接收
 */
put: function (requestOptions, params = {}, majorKey = '') {
	if (typeof requestOptions === 'string') {
		requestOptions = {
			url: requestOptions
		};
	}

	let requestUrl = requestOptions.url + majorKey;
	let requestDesc = requestOptions.desc||"";

	return new Promise((resolve, reject) => {
		axios({
			url: requestUrl,
			method: 'put',
			data : params,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		}).then(res => {
			resolve(res.data);
			httpUtils.toLogin(res.data);
		}).catch(error => {
			catchErrorEvt(error, params);
			reject(error);
		});
	});
},
/**
 * 发起put形式的Http请求
 * @param {string} majorKey - 修改主键，后端@PathVariable接收
 */
  delete: function (requestOptions, majorKey = '') {
  	if (typeof requestOptions === 'string') {
  		requestOptions = {
  			url: requestOptions
  		};
  	}

  	let requestUrl = requestOptions.url + majorKey;
  	let requestDesc = requestOptions.desc||"";

  	return new Promise((resolve, reject) => {
  		axios({
  			url: requestUrl,
  			method: 'delete',
  			headers: {
  				'Content-Type': 'application/json;charset=UTF-8'
  			}
  		}).then(res => {
  			resolve(res.data);
  			httpUtils.toLogin(res.data);
  		}).catch(error => {
  			catchErrorEvt(error, params);
  			reject(error);
  		});
  	});
  },
		options: function (requestOptions, params = {}) {
    if (typeof requestOptions === 'string') {
    	requestOptions = {
    		url: requestOptions
    	};
    }

  	let requestUrl = requestOptions.url;
  	let requestDesc = requestOptions.desc || "";

  	return new Promise((resolve, reject) => {
  		axios({
  			url: requestUrl,
  			method: 'options'
  		}).then(res => {
  			resolve(res)
  		})
		.catch(error => {
			reject(error);
		});
  	});

  },
GetUrlQueryParam: function (name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r) return unescape(r[2]);
	return "";
},
//下载上传工具类
fileUtils: {

	/**
     * 上传文件
     * @param {string} requestOptions
     * @param {string} params	  FormData 对象 let formData = new FormData() FormData.append('file',file);
     * @callback {object}  监听文件上传到服务器的进度
     * @example
     *
     *
     */
		uploadFile: function (requestOptions, params = {}, callback, loadingFlag) {
			// 默认不显示加载状态
			if (loadingFlag) {
				layerUtils.loadMask('正在请求服务...')
			}

			if (typeof requestOptions === 'string') {
				requestOptions = {
					url: requestOptions
				}
			}
			let requestUrl = requestOptions.url
			let requestDesc = requestOptions.desc || ''
			return new Promise((resolve, reject) => {
				axios({
					url: requestUrl,
					method: 'post',
					data: params,
					onUploadProgress: function (progressEvent) {
						if (progressEvent.lengthComputable) {
							// 回调上传文件进度
							callback(progressEvent)
						}
					}

				}).then(res => {
					let result = res.data
					if (result.type == resultType.SUCCESS) {
						if (SYS_ENCRYPTION_FLAG) {

							// 针对data进行处理加密
							result.data = decrypt(result.data)
							resolve(result)
						}
						resolve(res.data)
					} else if (result.type == resultType.ERROR) {
						resolve(res.data)
					} else {
						resolve(res.data)
					}
					httpUtils.toLogin(result);
				})
				.catch(error => {
					catchErrorEvt(error, params)
					reject(error)
				})
				.finally(() => {
					if (loadingFlag) {
						layerUtils.closeLoadMask()
					}
				})
			})
		}
},
toLogin: function (result) {
	if (result.messageCode == '4040' || result.messageCode == '4041') {
		if (!once) {
			return false;
		}
		once = false
		layerUtils.alertMessage(result.message, '提示', 'warning', {
			showClose: false
		}).then(() => {
			// store.commit('SET_TOKEN', '');
			top.window.location.reload();
			once = true;
		})
	}
}
}

export default httpUtils