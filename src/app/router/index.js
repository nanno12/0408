/**
 * 路由的主入口
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const index = r => require.ensure([], () => r(require('@/modules/index')), 'index');
const nofind = r => require.ensure([], () => r(require('@/app/components/nofind')), 'nofind');
const backstageAdministration = r => require.ensure([], () => r(require('@/modules/backstageAdministration'), 'backstageAdministration')); // 项目配置
const authorityAudit = r => require.ensure([], () => r(require('@/modules/authorityAudit'), 'authorityAudit')); // 审核权限
const bloodEvidence = r => require.ensure([], () => r(require('@/modules/bloodEvidence')), 'bloodEvidence'); // 输血指证
const testProject = r => require.ensure([], () => r(require('@/modules/testProject')), 'testProject'); // 检验项目
// const applicationform = r =>require.ensure([], () =>r(require('@/modules/applicationform')),'applicationform'); // 申请单
// const bloodaudit = r =>require.ensure([], () =>r(require('@/modules/bloodaudit')),'bloodaudit'); // 用血审核
// const pathological = r => require.ensure([], () => r(require('@/modules/pathological'), 'pathological'));
const ceshi = r => require.ensure([], () => r(require('@/modules/ademo/ceshi')), 'ceshi');

const router = new Router({
  routes: [{
      path: '/index',
      name: 'index',
      component: index
    }, // 首页
    {
      path: '/404',
      name: 'nofind',
      component: nofind
    }, // 404
    {
      path: '/backstageAdministration',
      name: 'backstageAdministration',
      component: backstageAdministration
    }, // 后台管理
    {
      path: '/authorityAudit',
      name: 'authorityAudit',
      component: authorityAudit
    }, // 审核权限
    {
      path: '/bloodEvidence',
      name: 'bloodEvidence',
      component: bloodEvidence
    }, // 输血指证
    {
      path: '/testProject',
      name: 'testProject',
      component: testProject
    }, // 检验项目
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    }, // ceshi
    // { path: '/applicationform', name: 'applicationform', component: applicationform }, // 申请单
    // { path: '/bloodaudit', name: 'bloodaudit', component: bloodaudit }, // 用血审核
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
  console.log("路由from【" + from.name + ":" + from.path + "】to 【" + to.name + ":" + to.path + "】");
  //在此处可以去获取token校验等，进行判断是否有权限进入新的模块
  next();

});
export default router;
