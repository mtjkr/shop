<template>
  <div class="profile">
    <van-nav-bar title="登录/注册"></van-nav-bar>
    <div class="inner">
      <van-tabs color="#eb681f" animated>
        <van-tab title="登录">
          <van-cell-group>
            <van-field label="用户名" v-model="loginUsername" required clearable placeholder="请输入用户名"/>
            <van-field
              v-model="loginPassword"
              type="password"
              required
              clearable
              placeholder="请输入密码"
              label="密码"
            />
          </van-cell-group>
          <div>
            <van-button
              type="primary"
              size="large"
              @click="loginHandler"
              :loading="load"
              loading-text="正在登录"
            >登录</van-button>
          </div>
        </van-tab>
        <van-tab title="注册">
          <van-cell-group>
            <van-field
              label="手机号"
              v-model="registerUsername"
              required
              clearable
              placeholder="请输入手机号"
            />
            <van-field v-model="sms" center required clearable label="短信验证码" placeholder="请输入短信验证码">
              <van-button slot="button" size="small" type="primary" @click="getVerification" :disabled='status'>{{countDown}}</van-button>
            </van-field>
            <van-field
              v-model="registerPassword"
              type="password"
              required
              clearable
              placeholder="请输入密码"
              label="密码"
            />
          </van-cell-group>
          <div>
            <van-button type="primary" size="large" @click="registHandler">注册</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      registerUsername: "",
      registerPassword: "",
      load: false,
      sms: "",
      countDown:'获取验证码',
      count:60,
      status:false
     
    };
  },
  methods: {
    ...mapActions(["loginAction"]),
    //注册的处理方法
    registHandler() {
      if (this.registerUsername.trim() == "") {
        return this.$toast.fail("用户名不能为空");
      } else if (this.sms.trim() == "") {
        return this.$toast.fail("验证码不能为空");
      }else if(this.registerPassword.trim() == ""){
         return this.$toast.fail("密码不能为空");
      }
      this.axios({
        url: "http://localhost:3000/user/registUser",
        method: "post",
        data: {
          userName: this.registerUsername,
          password: this.registerPassword,
          sms: this.sms
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success({message:"注册成功",duration:1000});
            this.registerUsername = this.registerPassword =this.sms = '' ;
            this.$router.push("/");
            console.log(res);
          } else if (res.data.code == 201) {
            this.$toast.fail("用户名被占用");
            console.log(res);
          } else {
            this.$toast.fail("验证码错误");
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("注册失败");
        });
    },
    loginHandler() {
      if (this.loginUsername == "") {
        return this.$toast("请输入用户名");
      } else if (this.loginPassword == "") {
        return this.$toast("请输入密码");
      }

      this.axios({
        url: "http://localhost:3000/user/loginUser",
        method: "post",
        data: {
          userName: this.loginUsername,
          password: this.loginPassword
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.load = true;
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
               
               
                 this.$toast.success({message:"登录成功",duration:1000});
                //保存登录状态
                this.loginAction(res.data.userInfo);
                this.$router.go(-1);
              })
              .catch(err => {
                this.$toast.fail("登录状态失败");
                console.log(err);
              });
          }else if (res.data.code == 201){
            this.$toast.fail('密码错误')
          }else{
            this.$toast.fail('用户名不存在')
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("登录失败");
        });
    },
    getVerification() {
      if (this.registerUsername.trim() == "") {
        return this.$toast.fail("用户名不能为空");
      } 
      this.axios({
        url: "http://localhost:3000/user/getVerify",
        method: "post",
        data: {
          userName: this.registerUsername
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("获取失败");
        });
   
    this.countDown=this.count+'S'
    this.status=true
    var timer = setInterval(()=>{
       this.count--;
       this.countDown=this.count+'S'
       if(this.count<=0){
         this.status=false
         this.countDown='重发验证码';
         this.count =60;
         

           clearInterval(timer)
       }
     },1000);
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
.van-button--primary {
  background-color: #eb681f;
  border: 1px solid #eb681f;
}
.van-button--large {
  height: 2.5rem;
  line-height: 2.5rem;
}
.profile {
  .inner {
    padding: 0rem 1.25rem;
  }
}
</style>
