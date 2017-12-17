<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">My Cart</span>
    </nav-bread>
    <div class="container">
          <div class="cart">
            <div class="item-list-wrap">
              <div class="cart-item">
                <div class="cart-item-head">
                  <ul>
                    <li>Items</li>
                    <li>Price</li>
                    <li>Quantity</li>
                    <li>Subtotal</li>
                    <li>Edit</li>
                  </ul>
                </div>
                <ul class="cart-item-list">
                  <li v-for="(item,index) in cartList">
                    <div class="cart-tab-1">
                      <div class="cart-item-check">
                        <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="{'check':item.checked==='1'}" @click="editCart('checked',item)">
                          <svg class="icon icon-ok">
                            <use xlink:href="#icon-okbig"></use>
                          </svg>
                        </a>
                      </div>
                      <div class="cart-item-pic">
                        <img :src="/static/+item.product_img">
                      </div>
                      <div class="cart-item-title">
                        <div class="item-name">{{item.product_name}}</div>
                      </div>
                    </div>
                    <div class="cart-tab-2">
                      <div class="item-price">{{item.product_price | currency('￥')}}</div>
                    </div>
                    <div class="cart-tab-3">
                      <div class="item-quantity">
                        <div class="select-self select-self-open">
                          <div class="select-self-area">
                            <a class="input-sub" @click="editCart('minu',item)">-</a>
                            <span class="select-ipt">{{item.product_num}}</span>
                            <a class="input-add" @click="editCart('add',item)">+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="cart-tab-4">
                      <div class="item-price-total">{{(item.product_num*item.product_price) | currency('￥')}}</div>
                    </div>
                    <div class="cart-tab-5">
                      <div class="cart-item-opration">
                        <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item)">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-lajixiang"></use>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="cart-foot-wrap">
              <div class="cart-foot-inner">
                <div class="cart-foot-l">
                  <div class="item-all-check">
                    <a href="javascipt:;" @click="toggleCheckAll">
                      <span class="checkbox-btn item-check-btn" :class="{'check':checkAllFlag}">
                        <svg class="icon icon-ok">
                          <use xlink:href="#icon-okbig"></use>
                        </svg>
                      </span>
                      <span>Select all</span>
                    </a>
                  </div>
                </div>
                <div class="cart-foot-r">
                  <div class="item-total">
                    Item total: <span class="total-price">{{totalPrice | currency('￥')}}</span>
                  </div>
                  <div class="btn-wrap">
                    <a class="btn btn--red" :class="{'btn--dis':checkedCount===0}" @click="checkOut">Checkout</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">确定要删除此商品吗？</p>
      <div slot="btnGroup"> 
        <a class="btn btn--m" href="javascript:;" @click="delCart">确认</a>
        <a class="btn btn--m" href="javascript:;" @click="modalConfirm=false">取消</a>    
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
<script>
import './../assets/css/checkout.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import Modal from '@/components/Modal.vue'
import axios from 'axios'
import {currency} from '@/util/currency'
export default{
  data(){
    return{
      cartList:[],
      modalConfirm:false
    }
  },
  mounted(){
    this.init();
  },
  // filters:{
  //   currency: currency
  // },
  computed:{
    checkAllFlag(){
      return this.checkedCount == this.cartList.length;
    },
    checkedCount(){
      let i=0;
      this.cartList.forEach((item)=>{
        if(item.checked==='1') i++;
      })
      return i;
    },
    totalPrice(){   
      let total=0;
      this.cartList.forEach((item)=>{
        if(item.checked==='1') {
          total += parseFloat(item.product_price)*parseFloat(item.product_num);
        }
      })
      return total;
    }
  },
  components:{
    NavHeader,
    NavFooter,
    NavBread,
    Modal
  },
  methods:{
    init(){
      axios.get('users/cartList').then((response)=>{
        let res = response.data;
        this.cartList = res.result;
      });
    },
    closeModal(){
      this.modalConfirm=false;
    },
    delCartConfirm(item){
      this.delItem=item;
      this.modalConfirm=true;
    },
    delCart(){
      axios.post('/users/cart/del',{
        productId:this.delItem.product_id
      }).then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.modalConfirm=false;
          this.init();
          this.$store.commit("updateCartCount",-this.delItem.product_num);
        }
      });
    },
    editCart(flag,item){
      if(flag==='add'){
        item.product_num++;
        this.$store.commit("updateCartCount",1);
      }else if(flag==='minu'){
        if(item.product_num<=1){
          return;
        }
        item.product_num--;
        this.$store.commit("updateCartCount",-1);
      }else{
        item.checked = item.checked==='1'?'0':'1';
      }

      axios.post('/users/cart/cartEdit',{
        productId:item.product_id,
        productNum:item.product_num,
        checked:item.checked
      }).then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.init();
        }
      });
    },
    toggleCheckAll(){
      let flag = !this.checkAllFlag;
      this.cartList.forEach((item)=>{
        item.checked = flag?'1':'0';
      });
      axios.post('/users/cart/checkAll',{
        checkAll:flag?'1':'0'
      }).then((response)=>{
        let res = response.data;
        if(res.status==='0'){
          this.init();
        }
      });
    },
    checkOut(){
      if(this.checkedCount>0){
        this.$router.push({
          path:"/address"
        });
      }
    }
  }
}
</script>