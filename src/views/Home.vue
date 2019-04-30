<template>
  <div class="home">
    <!-- 首页头部 -->
    <van-nav-bar title="农机商城" fixed :z-index = '2' >
      <van-icon name="search" slot="left"></van-icon>
      <van-icon  slot="right" @click="$router.push('/profile')">{{JSON.stringify(userInfo)==='{}'?'未登录':userInfo.userName}}</van-icon>
    </van-nav-bar>
    <!-- 轮播图 -->
    <div class="carousel">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in carouselItem" :key="index">
          <img v-lazy="item.imgUrl" alt>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 热门商品 -->
    <div class="hot">
      <h4 class="hot-title van-hairline--bottom">热门商品</h4>
      <swiper class="hot-swiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) in hotList" :key="index">
          <div class="hot-swiper-content">
            <img :src="item.img">
            <p class="van-ellipsis">{{item.name}}</p>
            <span>
              价格：
              <em>¥{{item.price}}</em>
            </span>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- 推荐商品 -->
    <div class="recommend">
      <h4 class="hot-title van-hairline--bottom">推荐商品</h4>
      <ul>
        <li v-for="(item,index) in recommendList" :key='index'>
          <img :src="item.img" >
          <p >{{item.name}}</p>
          <span>
            价格：
            <em>¥{{item.price}}</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      carouselItem: [
        {
          imgUrl: "https://img2.nongji360.com/a/adv/2019/03/28084037507802.jpg"
        },
        {
          imgUrl: "https://img2.nongji360.com/a/adv/2019/03/29104016610180.jpg"
        },
        {
          imgUrl: "https://img2.nongji360.com/a/adv/2019/03/29104016610180.jpg"
        }
      ],
      swiperOption: { slidesPerView: 3 },
      hotList: [],
      recommendList: []
    };
  },
  components: {                                                                                                                                               
    swiper,
    swiperSlide
  },
  created() {
    this.axios.get("http://localhost:3000/product/hotProduct").then(res => {
      this.hotList = res.data;
    });
    this.axios.get("http://localhost:3000/product/bestProduct").then(res => {
      this.recommendList = res.data;
    });
  },
  mounted(){
    
  },
  computed:{
    ...mapState(['userInfo'])
      
  }
};
</script>

<style scoped lang="scss">
.van-nav-bar {
  background: #eb681f;
  height: 2.875rem;
  line-height: 2.875rem;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar__left {
  font-size: 1.2rem;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.home {
  padding-top: 2.875rem;

  .carousel {
    height: 10rem;

    img {
      height: 10rem;
      width: 100%;
    }
  }
  .hot {
    padding: 0.5rem;

    &-title {
      padding: 0.5rem 0rem;
      color: #eb681f;
      text-indent: 0.3125rem;
    }
    &-title::before {
      content: "";
      display: block;
      height: 1rem;
      width: 0.125rem;
      background: #ff7122;
      position: absolute;
    }
    &-swiper {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      &-content {
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        img {
          width: 95%;
          height: 7rem;
        }
        p {
          padding: 0.4rem 0.4rem;
          line-height: 1rem;
        }
        span {
          em {
            color: #ff0000;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  .recommend {
    padding: 0.5rem;
    ul {
      display: flex;
      margin-top: 0.5rem;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 0.8rem;

      li {
        flex-basis: 49%;
        margin-top: 0.3125rem;
        text-align: center;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        img {
          width: 100%;
          height: 10rem;
        }
        p {
          padding: 0.4rem 0.4rem;
          line-height: 1rem;
        }
        span {
          em {
            color: #ff0000;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
