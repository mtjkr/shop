<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <van-card
      v-for="(item,index) in productList"
      :key="index"
      :price="item.price"
      :desc="item.company"
      :title="item.name"
      :thumb="item.img"
    >
      <div slot="footer">
        <van-button size="mini" @click="delCart(item._id,index)">删除</van-button>
        <van-checkbox
          v-model="item.selected"
          class="btn"
          checked-color="#eb681f"
          @change="selected(item.selected,item._id)"
        ></van-checkbox>
      </div>
      <div slot="num">
        <van-stepper v-model="item.num" @change="onchange(item.num,item._id)"/>
      </div>
    </van-card>
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" class="submit-bar"/>
   
  </div>
</template>

<script>

import { mapState } from "vuex";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      productList: []
    };
  },
  methods: {
   
    ...mapMutations(["changecarSum"]),
    selected(selected, productId) {
      this.axios({
        url: "http://localhost:3000/cart/selected",
        method: "get",
        params: {
          selected: selected,
          productId: productId
        }
      }).then(res => {
        console.log(res);
         this.changecarSum(this.totalNum)
      });
    },

    onchange(num, productId) {
      this.axios({
        url: "http://localhost:3000/cart/editCart",
        method: "get",
        params: {
          num: num,
          productId: productId,
          userId:this.userInfo._id
        }
      }).then(res => {
        console.log(res);
        this.changecarSum(this.totalNum )
      });
    },

    delCart(id, index) {
      this.$dialog
        .confirm({
          message: "您确定删除吗？"
        })
        .then(() => {
          //删除数组中的的数据，
          this.productList.splice(index, 1);
          //删除数据库中的的数据
          this.axios({
            url: "http://localhost:3000/cart/deleteCart",
            method: "get",
            params: {
              productId: id
            }
          }).then(res => {
            console.log(res);
          });
        })
        .catch(() => {});
    },
    onSubmit() {
      this.$toast.success({ message: "进入支付页面", duration: 1000 });
    }
  },
  computed: {
    ...mapState(["userInfo"]),

    totalPrice() {
      var filtered = this.productList.filter(item => {
       return item.selected == true;
      });
     
      return filtered.reduce((sum, elem) => {
          sum += parseInt(elem.price) * elem.num;
          return sum;
        }, 0) *10 *10
      
    },

    totalNum() {
      var filteredNum = this.productList.filter(item => {
       return item.selected == true;
      });
     
      return filteredNum.reduce((sum, elem) => {
          sum +=  elem.num;
          return sum;
        }, 0) 
      
    }
  },
  created() {
    //验证用户是否登录
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.loading({ message: "请先登录", duration: 1000 });
      setTimeout(() => {
        this.$router.push("/profile");
      }, 1000);
    } else {
      this.axios({
        url: "http://localhost:3000/cart/getCart",
        method: "get",
        params: {
          userId: this.userInfo._id
        }
      }).then(res => {
        console.log(res);
        for (let item of res.data) {
          item.productId.num = item.num;
          item.productId.selected = item.selected;
          this.productList.push(item.productId);
        }
      });
    }
  },

  components: {}
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
.van-card__price {
  font-size: 0.875rem;
}
.van-card__thumb img {
  width: 7rem;
  height: 7rem;
}

.submit-bar {
  margin-bottom: 3.125rem;
}
.btn {
  position: absolute;
  top: 0.3125rem;
  right: 0.3125rem;
}
</style>
