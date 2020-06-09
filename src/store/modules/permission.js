import { constantRoutes ,asyncRouterMap} from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
// import { asyncRouterMap, constantRoutes } from 'src/router';
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role))
  } else {
    return true
  }
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRoutes = asyncRouterMap.filter(v => {
          // if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTES', accessedRoutes);
        resolve(accessedRoutes);
      })
    }
  
    // 生成路由
    // GenerateRoutes({ commit }) {
    //   return new Promise(resolve => {
    //     // 向后端请求路由数据
    //     getRouters().then(res => {
    //       const accessedRoutes = filterAsyncRouter(res.data)
    //       accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
    //       commit('SET_ROUTES', accessedRoutes)
    //       resolve(accessedRoutes)
    //     })
    //   })
    // }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
