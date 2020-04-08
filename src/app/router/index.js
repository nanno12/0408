/**
 * 路由的主入口
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const index = r =>require.ensure([], () =>r(require('@/modules/index')),'index');
const nofind = r =>require.ensure([], () =>r(require('@/app/components/nofind')),'nofind');
const specimencirculation = r =>require.ensure([], () =>r(require('@/modules/specimenCirculation')),'specimencirculation'); // 标本流转
const sampledeliveryquery = r =>require.ensure([], () =>r(require('@/modules/sampleDeliveryQuery')),'sampledeliveryquery'); // 标本流转查询
const applicationform = r =>require.ensure([], () =>r(require('@/modules/applicationform')),'applicationform'); // 申请单
const bloodaudit = r =>require.ensure([], () =>r(require('@/modules/bloodaudit')),'bloodaudit'); // 用血审核
const pathological = r => require.ensure([], () => r(require('@/modules/pathological'), 'pathological'));
const ceshi = r =>require.ensure([], () =>r(require('@/modules/ademo/ceshi')),'ceshi');
const specimenentry = r => require.ensure([], () => r(require('@/modules/pathological/specimenEntry'), 'specimenentry'));
const homepage = r => require.ensure([], () => r(require('@/modules/homepage'), 'homepage')); // 首页

const router= new Router({
  routes: [
    { path: '/index', name: 'index', component: index }, // 首页
    { path: '/404', name: 'nofind', component: nofind }, // 404
    { path: '/sampledeliveryhandle', name: 'specimencirculation', component: specimencirculation }, // 标本流转
    { path: '/sampledeliveryquery', name: 'sampledeliveryquery', component: sampledeliveryquery }, // 标本流转查询
    { path: '/ceshi', name: 'ceshi', component: ceshi }, // ceshi
    { path: '/applicationform', name: 'applicationform', component: applicationform }, // 申请单
    { path: '/bloodaudit', name: 'bloodaudit', component: bloodaudit }, // 用血审核
    { path: '/pathological', name: 'pathological', component: pathological },
    { path: '/specimenentry', name: 'specimenentry', component: specimenentry },
    { path: '/homepage', name: 'homepage', component: homepage }, // 首页
  ]
});

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.push({ path: '/404', name: 'nofind', component: nofind })
    next(false);
    return false;
  }
  console.log("路由from【" + from.name + ":" + from.path + "】to 【" + to.name + ":" + to.path + "】");
  //在此处可以去获取token校验等，进行判断是否有权限进入新的模块
  next();

});
export default router;
