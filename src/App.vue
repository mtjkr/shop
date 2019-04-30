<template>
  <div id="app">
    <!-- 缓存路由 -->
    <keep-alive>
     <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
   
    <!-- 底部 -->
    <router-view name="footer-bar"></router-view> 
  </div>
</template>
<script>

export default {
  data() {
    return {
     
    };
  },
  components:{
    
  }
};

</script>
<style lang="scss">

#app{
  padding-bottom: 3.125rem
}
</style>
