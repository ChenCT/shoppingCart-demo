<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Address</span>
      </nav-bread>
      <div class="checkout-page">
        <!-- <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <symbol id="icon-edit" viewBox="0 0 32 32">
              <title>edit</title>
              <path class="path1" d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
            </symbol>
            <symbol id="icon-clock" viewBox="0 0 32 32">
              <title>clock</title>
              <path class="path1" d="M29.333 16c0-7.364-5.97-13.333-13.333-13.333s-13.333 5.97-13.333 13.333c0 7.364 5.97 13.333 13.333 13.333s13.333-5.97 13.333-13.333v0 0 0 0 0 0zM0 16c0-8.837 7.163-16 16-16s16 7.163 16 16c0 8.837-7.163 16-16 16s-16-7.163-16-16zM14.667 14.667v1.333h2.667v-10.667h-2.667v9.333zM24 18.667h1.333v-2.667h-10.667v2.667h9.333z"></path>
            </symbol>
            <symbol id="icon-question" viewBox="0 0 32 32">
              <title>question</title>
              <path class="path1" d="M16 2.56c7.411 0 13.44 6.029 13.44 13.44s-6.029 13.44-13.44 13.44c-7.411 0-13.44-6.029-13.44-13.44s6.029-13.44 13.44-13.44zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
              <path class="path2" d="M16 22.080c-1.059 0-1.92 0.861-1.92 1.92s0.861 1.92 1.92 1.92c1.059 0 1.92-0.861 1.92-1.92s-0.861-1.92-1.92-1.92z"></path>
              <path class="path3" d="M12.16 12.48c0.706 0 1.28-0.574 1.28-1.28 0-1.412 1.148-2.56 2.56-2.56s2.56 1.148 2.56 2.56c0 1.412-1.148 2.56-2.56 2.56-0.706 0-1.28 0.574-1.28 1.28v3.84c0 0.706 0.574 1.28 1.28 1.28s1.28-0.574 1.28-1.28v-2.723c2.224-0.575 3.84-2.616 3.84-4.957 0-2.823-2.297-5.12-5.12-5.12s-5.12 2.297-5.12 5.12c0 0.706 0.574 1.28 1.28 1.28z"></path>
            </symbol>
          </defs>
        </svg> -->
        <div class="container">
          <div class="checkout-addr">
            <div class="page-title-normal">
              <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
              <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li><span>View your</span> order</li>
                <li><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
              </ul>
            </div>

            <!-- address list -->
            <div class="page-title-normal checkout-title">
              <h2><span>Shipping address</span></h2>
            </div>
            <div class="addr-list-wrap">
              <div class="addr-list">
                <ul>
                  <li v-for="(item,index) in addressListFilter" :class="{'check':checkIndex===index}" @click="checkIndex=index; selectedAddrId=item.address_id">
                    <dl>
                      <dt>{{item.receiver}}</dt>
                      <dd class="address">{{item.addressarea}}</dd>
                      <dd class="tel">{{item.user_phone}}</dd>
                    </dl>
                    <div class="addr-opration addr-del">
                      <a href="javascript:;" class="addr-del-btn" @click="delAddressConfirm(item.address_id)">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-lajixiang"></use>
                        </svg>
                      </a>
                    </div>
                    <div class="addr-opration addr-set-default" v-show="item.isdefault==='0'">
                      <a href="javascript:;" class="addr-set-default-btn" @click="setDefault(item.address_id)"><i>Set default</i></a>
                    </div>
                    <div class="addr-opration addr-default" v-show="item.isdefault==='1'">Default address</div>
                  </li>
                  <li class="addr-new">
                    <div class="add-new-inner">
                      <i class="icon-add">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-iconadd"></use>
                        </svg>
                      </i>
                      <p>Add new address</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="shipping-addr-more">
                <a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand" :class="{'open':limit>3}">
                  more
                  <i class="i-up-down">
                    <i class="i-up-down-l"></i>
                    <i class="i-up-down-r"></i>
                  </i>
                </a>
              </div>
            </div>

            <!-- shipping method-->
            <div class="page-title-normal checkout-title">
              <h2><span>Shipping method</span></h2>
            </div>
            <div class="shipping-method-wrap">
              <div class="shipping-method">
                <ul>
                  <li class="check">
                    <div class="name">Standard shipping</div>
                    <div class="price">Free</div>
                    <div class="shipping-tips">
                      <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="next-btn-wrap">
              <router-link class="btn btn--m btn--red" :to="{path:'orderConfirm',query:{'address':selectedAddrId}}">Next</router-link>
            </div>
          </div>
        </div>
      </div>
      <modal :mdShow="mdShow" @close="closeModal">
        <p slot="message">是否确认删除此地址？</p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="delAddress">确认</a>
          <a class="btn btn--m" href="javascript:;" @click="mdShow=false">取消</a>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Modal from '@/components/Modal.vue'
  import axios from 'axios'
  import {currency} from '@/util/currency'

  export default{
      data(){
          return{
            limit:3,
            checkIndex:0,
            selectedAddrId:'',
            addressList:[],
            mdShow:false,
            addressId:''
          }
      },
      components:{
        NavHeader,
        NavBread,
        NavFooter,
        Modal
      },
      mounted:function(){
        this.init();
      },
      computed:{
        addressListFilter(){
          return this.addressList.slice(0,this.limit);
        }
      },
      methods:{
        init(){
          axios.get("/users/addressList").then((response)=>{
            let res = response.data;
            this.addressList = res.result;
            res.result.forEach((item)=>{
              if(item.isdefault==='1')
                this.selectedAddrId=item.address_id;
            })
          });
        },
        expand(){
          if(this.limit===3){
            this.limit = this.addressList.length;
          }else{
            this.limit = 3;
          }
        },
        setDefault(addressId){
          axios.post('/users/setDefault',{
            addressId:addressId
          }).then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              console.log('set default success');
              this.init();
            }
          });
        },
        closeModal(){
          this.mdShow = false;
        },
        delAddressConfirm(addressId){
          this.mdShow = true;
          this.addressId = addressId;
        },
        delAddress(){     
          axios.post('/users/delAddress',{
            addressId:this.addressId
          }).then((response)=>{
            let res = response.data;
            if(res.status==='0'){
              this.mdShow = false;
              console.log('del success');
              this.init();
            }
          });
        }
      }
  }
</script>
