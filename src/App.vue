<template>
  <div id="app" ref="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    },
    mounted () {
      // this.IsPc()
    },
    methods: {
      // IsPc () {
      //   var userAgentInfo = navigator.userAgent
      //   var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
      //   var flag = true
      //   for (var v = 0; v < Agents.length; v++) {
      //     if (userAgentInfo.indexOf(Agents[v]) > 0) {
      //       flag = false
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     this.$refs.app.className = ''
      //   } else {
      //     this.$refs.app.className = 'pcfront'
      //   }
      // }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  color: #2c3e50;
  /*font-size: 20px;*/
  /*width: 100%;*/
}
</style>
