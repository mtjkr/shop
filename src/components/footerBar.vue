<template>
  <div class="">
      <van-tabbar @change='change' v-model="active" fixed active-color="#eb681f">
      <van-tabbar-item icon="wap-home"  to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o"  to="/cart" :info="JSON.stringify(userInfo)==='{}'?'':carSum">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
         active: 0,
         
    }
  },
  created(){
    this.active=parseInt(localStorage.getItem('active'))
  },

  methods:{
    change(active){
      localStorage.setItem('active',active)
    }
  },

  components: {

  },
  computed:{
   
    ...mapState(['userInfo']),
     ...mapState(['carSum']),
  }
}
</script>

<style scoped lang="scss">
.van-tabbar{
  height: 3.125rem;
}
</style>
