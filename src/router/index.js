import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Search from '../components/searvh.vue'

// import { getmessage } from '../config/index'

// function handleScroll () {
//   if (window.pageYOffset + document.body.offsetHeight + 2 >= document.body.scrollHeight) {
//     this.params.page++
//     console.log('上拉加载')
//     var self = this
//     getmessage(this.params).then(function (res) {
//       self.commoditymessage = self.commoditymessage.concat(res.data.data)
//     })
//   }
//   if (window.pageYOffset > document.body.offsetHeight) {
//     this.$refs.back.style.display = 'block'
//   } else {
//     this.$refs.back.style.display = 'none'
//   }
// }
/* 插件语法 */
Vue.use(Router)
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home,
      meta: { keepAlive: true },
      beforeEnter: (to, from, next) => {
        if (to.path) {
          console.log(to.path, 'to.path')
          console.log(from.path, 'from.path')
          console.log(next.path, 'next.path')
          // this.handleScroll()
        }
        next()
      }
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
