<template>
  <div>
    <van-nav-bar title="商品类型"></van-nav-bar>
    <div class="category">
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li
              @click="selectType(item.typeId,index)"
              :class="{active:active==index}"
              v-for="(item,index) in types"
              :key="index"
            >{{item.typeName}}</li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="Loading" class="content" @load="onLoad" :finished="finished" :offset="50"  finished-text="没有更多了">
              <div @click="goDetail(item._id)" class="content-item" v-for="(item,index) in productList" :key="index">
                <img :src="item.img" alt>
                <p class="title">{{item.name}}</p>
                <p class="price">¥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      types: [],
      active: 0,
      productList: [],
      typeId: 1,
      start: 0,
      limit: 10,
      finished: false, //是否取完
      isLoading: false,
      Loading:false
    };
  },
  created() {
    this.axios({
      url: "http://localhost:3000/type/getTypes"
    })
      .then(res => {
        console.log(res);
        this.types = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goDetail(id){
      // console.log(id)
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     id:id
      //   }
      // })
      this.$router.push(`/detail/${id}`)
    },
    onLoad() {
      setTimeout(() => {
        this.getProductList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.productList = [];
        this.getProductList();
      }, 1000);
    },
    selectType(typeId, index) {
      this.active = index;
      this.typeId = typeId;
      this.productList = [];
      this.finished = false;
      this.getProductList();
    },
    getProductList() {
      this.isLoading = true;
      this.axios({
        url: "http://localhost:3000/product/getProduct",
        params: {
          typeId: this.typeId,
          start: this.productList.length,
          limit: this.limit
        }
      })
        .then(res => {
          if (res.data.length != 0) {
            this.productList = this.productList.concat(res.data);
             
          } else {
            this.finished = true;
          }
          this.isLoading = false;
          this.Loading = false
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
/deep/ .van-list__loading{
  width: 100%;
}
.van-nav-bar {
  background: #eb681f;
  height: 2.875rem;
  line-height: 2.875rem;
}
.van-nav-bar__title {
  color: #fff;
}
.nav {
  background: #eee;
  li {
    height: 1.875rem;
    line-height: 1.875rem;
    border-bottom: 1px solid #fff;
    padding: 3px;
    text-align: center;
    font-size: 0.875rem;
  }
  .active {
    background: #fff;
  }
}
.container {
  position: fixed;
  top: 3.125rem;
  bottom: 3.125rem;
  right: 0;
  overflow-y: scroll;
}
.content {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.875rem;
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40%;
    padding: 0 0.625rem;
    text-align: center;
    img {
      width: 100%;
      height: 6.25rem;
    }
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0.3125rem;
    }
    .price {
      color: #ff0000;
    }
  }
}
</style>
