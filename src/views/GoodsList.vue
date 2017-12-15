<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" :class="{'cur':sortFlag}" class="default">Default</a>
          <a href="javascript:void(0)" @click="sortGoods" :class="{'cur':!sortFlag}" class="price" >Price 
            <svg class="icon icon-arrow-short" :class="{'sort-up':sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked===index}">{{price.startPrice}}-{{price.endPrice}}</a>
              </dd>     
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId,item.productName,item.productPrice,item.productImg)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">请先登录，否则无法加入购物车</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">加入购物车成功</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
.sort-up{
  transform: rotate(180deg);
  transition: all .3s ease-out;
}
</style>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import Modal from '@/components/Modal.vue'
import axios from 'axios'
export default {
  data(){
    return{
      goodsList :[],
      priceFilter:[
        {
          startPrice:'0.00',
          endPrice:'500.00',
        },
        {
          startPrice:'500.00',
          endPrice:'1000.00'
        },
        {
          startPrice:'1000.00',
          endPrice:'2000.00'
        }  
      ],
      priceChecked:'all',
      filterBy:false,
      overLayFlag:false,
      sortFlag:true,
      mdShow:false,
      mdShowCart:false
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  mounted:function(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      axios.get("/goods/list",{
        params:{
          sort:this.sortFlag?'':'desc',
          priceLevel:this.priceChecked
        }}).then((response)=>{
        let res = response.data;
        this.goodsList = res.result;
      }).catch((err)=>{
        console.log(err);
      });
    },
    sortGoods(){
      this.sortFlag =!this.sortFlag;
      this.getGoodsList();
    },
    addCart(productId,productName,productPrice,productImg){
      axios.post("/goods/addCart",{
        productId:productId,
        productName:productName,
        productPrice:productPrice,
        productImg:productImg
      }).then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.mdShowCart=true;
          this.$store.commit("updateCartCount",1);
        }else{
          this.mdShow=true; 
        }
      })

    },
    closeModal(){
      this.mdShow=false;
      this.mdShowCart=false;   
    },
    showFilterPop(){
      this.filterBy=true;
      this.overLayFlag=true;
    },
    setPriceFilter(index){
      this.priceChecked = index;
      this.getGoodsList();
      this.closePop();
    },
    closePop(){
      this.filterBy=false;
      this.overLayFlag=false;
    }
  }
}
</script>









