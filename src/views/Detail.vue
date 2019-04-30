<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>

    <div class="detail">
      <img :src="detail.img" alt class="detail-img">
      <p class="detail-name">{{detail.name}}</p>
      <p class="detail-price">价格：¥{{detail.price}}</p>
      <p class="detail-company">公司：{{detail.company}}</p>
      <p class="detail-city">地址：{{detail.city}}</p>
      <p class="detail-sum">
        购买数量：
        <van-stepper v-model="value"/>
      </p>
    </div>
    <van-goods-action>
      <van-goods-action-big-btn text="加入购物车" @click="addCart"/>
      <van-goods-action-big-btn primary text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from 'vuex'
import { setTimeout } from "timers";
export default {
  data() {
    return {
      detail: {},
      value: 1
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.axios({
      url: "http://localhost:3000/product/getDetail",
      methods: "get",
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        console.log(res);
        this.detail = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {},
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["addcarSum"]),
    addCart() {
      if (JSON.stringify(this.userInfo) === "{}") {
        this.$toast.loading({ message: "请先登录", duration: 1000 });
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1000);
      } else {
        console.log("加入购物车");
        this.axios({
          url: "http://localhost:3000/cart/addCart",
          method: "post",
          data: {
            productId: this.detail._id,
            userId: this.userInfo._id,
            num: this.value,
            selected:true
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast.success(res.data.message);
              this.addcarSum(this.value)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
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
.van-nav-bar__text {
  color: #fff;
}
.detail {
  padding: 0.625rem;
  font-size: 0.875rem;
  p {
    padding: 0.3125rem;
  }
  &-img {
    width: 100%;
  }
  &-name {
    font-size: 1rem;
    font-weight: bold;
  }
  &-price {
    color: #eb681f;
  }
  &-sum {
    display: flex;
    align-items: center;
  }
}
</style>
