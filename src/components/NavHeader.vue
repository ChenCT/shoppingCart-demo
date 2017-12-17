<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span v-text="nickName" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="mdShow=true" v-if="!nickName">Login</a>
          <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click="logOut">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouwuche"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <modal :mdShow="mdShow" @close="closeModal">
        <div slot="message">
          <div class="error-wrap">
            <span class="error error-show" v-show="errorTip">用户名或密码错误</span>
          </div>
          <ul>
            <li class="regi_form_input">
              <i class="icon IconPeople"></i>
              <input type="text" tabindex="1" name="loginname" v-model="userName">
            </li>
            <li class="regi_form_input noMargin">
              <i class="icon IconPwd"></i>
              <input type="password" tabindex="2" name="password" v-model="userPwd" @keyup.enter="login">
            </li>
          </ul>
        </div>
        <div slot="btnGroup">
          <a class="btn btn--login" href="javascript:;" @click="login">登录</a>
        </div>
      </modal>
      <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">请先登录，否则无法查看购物车</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    </div>
  </header>
</template>

<script>
import './../assets/css/login.css'

import axios from 'axios'
import { mapState } from 'vuex'
import Modal from './Modal.vue'

export default {
  name: '',
  data () {
    return {
      userName:'',
      userPwd:'',
      errorTip:false,
      mdShow:false,
      mdShowCart:false
    }
  },
  computed:{
    ...mapState(['nickName','cartCount'])
    // nickName(){
    //   return this.$store.state.nickName;
    // },
    // cartCount(){
    //   return this.$store.state.cartCount;
    // }
  },
  components:{
    Modal
  },
  mounted(){
    this.checkLogin();
  },
  methods:{
    checkLogin(){
      axios.get("/users/checkLogin").then((response)=>{
        let res=response.data;
        if(res.status==='0'){
          // this.nickName = res.result.userName;
          this.$store.commit("updateUserInfo",res.result.userName);
          this.getCartCount();
          this.mdShow=false;
        }
      })
    },
    login(){
      if(!this.userName || !this.userPwd){
        this.errorTip=true;
        return;
      }
      axios.post("/users/login",{
        userName:this.userName,
        userPwd:this.userPwd
      }).then((response)=>{
        let res=response.data;
        if(res.status=='0'){
          this.errorTip=false;
          this.mdShow=false;
          // this.nickName=res.result.userName;
          this.$store.commit("updateUserInfo",res.result.userName);
          this.getCartCount();
        }
        else{
          this.errorTip=true;
        }
      })
    },
    closeModal(){
      this.mdShow=false;
    },
    logOut(){
      axios.post("/users/logout").then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          // this.nickName='';
          this.$store.commit("updateUserInfo","");
          this.$store.commit("initCartCount","");
        }
      });
    },
    getCartCount(){
      axios.get("/users/getCartCount").then((response)=>{
        let res = response.data;
        this.$store.commit("initCartCount",res.result);
      });
    }
  }
}
</script>
