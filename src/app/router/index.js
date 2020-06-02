/**
 * 路由的主入口
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// const index = r => require.ensure([], () => r(require('@/modules/index')), 'index');
const nofind = r => require.ensure([], () => r(require('@/app/components/nofind')), 'nofind');
const backstageAdministration = r => require.ensure([], () => r(require('@/modules/backstageAdministration/index.vue'), 'backstageAdministration')); // 项目配置
const userAudit = r => require.ensure([], () => r(require('@/modules/userAudit'), 'userAudit')); // 角色权限
const authorityAudit = r => require.ensure([], () => r(require('@/modules/authorityAudit'), 'authorityAudit')); // 审核权限
const bloodEvidence = r => require.ensure([], () => r(require('@/modules/bloodEvidence')), 'bloodEvidence'); // 输血指证
const testProject = r => require.ensure([], () => r(require('@/modules/testProject')), 'testProject'); // 检验项目
const bloodNumberBook = r => require.ensure([], () => r(require('@/modules/bloodNumberBook')), 'bloodNumberBook'); // 输血量字典
const illnessBook = r => require.ensure([], () => r(require('@/modules/illnessBook')), 'illnessBook'); // 病种字典
const diagnosisBook = r => require.ensure([], () => r(require('@/modules/diagnosisBook')), 'diagnosisBook'); // 诊断字典
const informationSpecimen = r => require.ensure([], () => r(require('@/modules/informationSpecimen/index.vue')), 'informationSpecimen'); // 信息标本
const application = r =>require.ensure([], () =>r(require('../../modules/application/index.vue')),'application'); // 申请单
const ceshi = r => require.ensure([], () => r(require('@/modules/ademo/ceshi')), 'ceshi');

const router = new Router({
  routes: [
    // { path: '/index', name: 'index', component: index }, // 首页
    { path: '/backstageAdministration', name: 'backstageAdministration', component: backstageAdministration }, // 后台管理
    { path: '/userAudit', name: 'userAudit', component: userAudit }, // 角色权限
    { path: '/authorityAudit', name: 'authorityAudit', component: authorityAudit }, // 审核权限
    { path: '/bloodEvidence', name: 'bloodEvidence', component: bloodEvidence }, // 输血指证
    { path: '/testProject', name: 'testProject', component: testProject }, // 检验项目
    { path: '/bloodNumberBook', name: 'bloodNumberBook', component: bloodNumberBook }, // 输血量字典
    { path: '/illnessBook', name: 'application', component: illnessBook }, // 病种字典
    { path: '/diagnosisBook', name: 'application', component: diagnosisBook }, // 诊断字典
    { path: '/informationSpecimen', name: 'informationSpecimen', component: informationSpecimen }, // 信息标本
    { path: '/application', name: 'application', component: application }, // 申请单
    { path: '/ceshi', name: 'ceshi', component: ceshi }, // ceshi
    { path: '/404', name: 'nofind', component: nofind }, // 404
    // { path: '/pathological', name: 'pathological', component: pathological },
    // { path: '/specimenentry', name: 'specimenentry', component: specimenentry },
    // { path: '/homepage', name: 'homepage', component: homepage }, // 首页
  ]
});

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    router.push({
      path: '/404',
      name: 'nofind',
      component: nofind
    })
    next(false);
    return false;
  }
  //在此处可以去获取token校验等，进行判断是否有权限进入新的模块
  next();

});
export default router;
