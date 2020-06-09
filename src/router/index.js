import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: (resolve) => require(['@/views/index'], resolve),
  //       name: '首页',
  //       meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }

]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
// 权限路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    meta: { title: '医院首页', role: ['hospital'] },
    name: 'index',
    redirect: 'indexHospital',
    children: [
      {
        path: 'indexHospital',
        hidden: false,
        component: () => import('@/views/statistics/hospital'),
        meta: { title: '医院首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '科室首页', icon: 'example', role: ['department'] },
    name: 'index',
    redirect: 'indexDepartment',
    children: [{
      path: 'indexDepartment',
      hidden: false,
      component: () => import('@/views/statistics/department'),
      meta: { title: '科室首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: Layout,
    meta: { title: '协会首页', icon: 'example', role: ['relationType'] },
    name: 'index',
    redirect: 'indexAssociation',
    children: [{
      path: 'indexAssociation',
      hidden: false,
      component: () => import('@/views/statistics/association'),
      meta: { title: '协会首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/hospital',
    component: Layout,
    redirect: 'hospitalmanagement',
    meta: { title: '机构管理', icon: 'dict', role: ['hospital'] },
    name: 'hospital',
    children: [{
      path: 'hospitalmanagement',
      component: () => import('@/views/hospital/hospitalmanagement'),
      meta: { title: '机构管理', icon: 'ddgl' }
    }, {
      path: 'departmentmanagement',
      component: () => import('@/views/hospital/departmentmanagement'),
      meta: { title: '科室管理', icon: 'date' }
    }, {
      path: 'maillist',
      component: () => import('@/views/hospital/maillist'),
      meta: { title: '通讯录', icon: 'message', }
    }]
  },
  {
    path: '/department',
    component: Layout,
    redirect: 'departmentmanagement',
    meta: { title: '科室管理', icon: 'date', role: ['department','relationType'] },
    name: 'department',
    children: [{
      path: 'departmentmanagement',
      component: () => import('@/views/department/departmentmanagement'),
      meta: { title: '科室管理', icon: 'date' }
    }, {
      path: 'maillist',
      component: () => import('@/views/department/maillist'),
      meta: { title: '通讯录', icon: 'message' }
    }, {
      path: 'medicalmanagement',
      component: () => import('@/views/department/medicalmanagement'),
      meta: { title: '医护管理', icon: 'date-range' }
    }]
  },
  {
    path: '/inpatientservices',
    component: Layout,
    meta: { title: '住院服务', icon: 'clipboard', role: ['hospital'] },
    name: 'inpatientservices',
    children: [
      {
        path: 'inpatientHospital',
        component: () => import('@/views/inpatientservices/hospital/inpatientmanagement'),
        meta: { title: '住院管理', icon: 'edit' }
      }]
  },
  {
    path: '/inpatientservices',
    component: Layout,
    meta: { title: '住院服务', icon: 'clipboard', role: ['department'] },
    name: 'inpatientservices',
    children: [
      {
        path: 'inpatientDepartment',
        component: () => import('@/views/inpatientservices/department/inpatientmanagement'),
        meta: { title: '住院管理', icon: 'edit' }
      }]
  },
  {
    path: '/notice',
    component: Layout,
    meta: { title: '公告管理', icon: 'international', role: ['department','relationType'] },
    name: 'notice',
    children: [{
      path: 'noticeManagement',
      component: () => import('@/views/notice/noticeManagement'),
      meta: { title: '公告管理', icon: 'education' }
    }]
  },
  {
    path: '/healthy',
    component: Layout,
    meta: { title: '健康交流', icon: 'international', role: ['department','relationType'] },
    name: 'healthy',
    children: [{
      path: 'articledepartment',
      component: () => import('@/views/healthy/article'),
      meta: { title: '文章管理', icon: 'education' }
    }]
  },
  {
    path: '/schedule',
    component: Layout,
    meta: { title: '日程管理', icon: 'international', role: ['relationType'] },
    name: 'schedule',
    children: [{
      path: 'scheduleManagement',
      component: () => import('@/views/schedule/scheduleManagement'),
      meta: { title: '日程管理', icon: 'education' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '概览', icon: 'chart' } }
]
