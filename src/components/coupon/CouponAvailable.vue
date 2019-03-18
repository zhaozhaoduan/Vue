<template>
	<div v-if='coupon' class="coupon-null">
		<img src="../../assets/img/t/empty.png" >
		<p>主人，没有可用的<br>优惠劵了哦~</p>
		<a href="#" class="button button-big">返回</a>
  </div>
	<div v-else class="content-coupon">
    <div class="tickets-list">
        <a v-for="item in items"  @click='choose(item.title,item.id)'>
          <div class="ticket" style="background-color:{{item.backgroundColor}}">
            <div class="ticket-content">
              <div class="ticket-logo">
                <span><img :src="item.logo" alt=""/></span>
              </div>
              <div class="ticket-detail">
                <p class="ticket-title">{{{item.title}}}</p>
                <span class="ticket-date">有效期至{{item.expiredAt}}</span>
              </div>
            </div>
          </div>
        </a>
    </div>
	</div>
</template>
<style scoped type="text/css">
  div.coupon-null{
    text-align: center;
    margin-top: 7rem;
  }
  .coupon-null img{
    width: 7rem;
  }
  .coupon-null p{
      font-family: Microsoft Yahei;
      text-align: center;
  }

  .tickets-list{
      width: 95%;
      margin: 0 auto;
      padding-bottom: 0.7rem;
  }
  .tickets-list a{
    display: block;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }
  .ticket{
    background: url(../../assets/img/t/coupons.png) no-repeat;
    background-size: 100% 103%;
    color: #fff;
    width: 95%;
    margin: 0 auto;
    height: 5.9rem;
  }
  .content-coupon{
      background-color: #fff;
      height: 100%;
      width: 100%;
      overflow: auto;
  }
  .ticket-logo{
      width: 27.4%;
      height: 100%;
      text-align: center;
      float: left;
      display: table;
      margin-top: 1.2rem;
  }
  .ticket-detail{
      width: 72.6%;
      height: 100%;
      float: left;
      position: relative;
  }
  .ticket-logo span{
      display: table-cell;
      vertical-align: middle;
      border-right: 1px #B1AFAF dashed;
  }
  .ticket-logo img{
      width: 3.5rem;
      border-radius: 50%;
  }
  .ticket-detail>span{
      float: right;
      margin-right: 0.25rem;
      font-size: 14px;
      padding-top: 1px;
      padding-right: 6px;
      position: absolute;
      right: 0px;
  }
  .ticket-detail .ticket-title{
      font-size: 1.0rem;
      padding-left: 1.5rem;
      margin: 0;
      line-height: 5.5rem;
  }
  .ticket-detail .ticket-title .num{
      font-size: 2.1rem;
  }
  .ticket{
      border-top-left-radius:10px;
      border-bottom-left-radius:10px;
      overflow: hidden;
      position: relative;
    }
  .ticket:before,.ticket:after{
    display: block;
    content: '';
    position: absolute;
    background-color: #fff;
    width: 1.2em;
    height: 0.6em;    
    top: 0em;
    left: 4.05rem;
  }
  .ticket:before{
    border-bottom-left-radius:0.6em;
    border-bottom-right-radius:0.6em;
  }
  .ticket:after{
    border-top-left-radius:0.6em;
    border-top-right-radius:0.6em;
    top: 6.4em;
  }
  .ticket-detail .ticket-date{
      bottom: 0.1rem;
    }
    .ticket-detail .ticket-share{
      top: 0.1rem;
    }

  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio:2){
      .ticket-logo{
        width: 31.4%;
      }
      .ticket-detail{
        width: 68.6%;
      }
  }
</style>
<script type="text/javascript">
import $ from 'zepto'
export default {
  ready () {
    this.$http.get('/api/merchants/' + this.$route.query.merchant + '/users/0/coupons.json?store=' + this.$route.query.store + '&money=' + this.$route.query.money).then(function (response) {
      if (response.data.length === 0) {
        this.$set('coupon', 'false')
      } else {
        this.$set('items', response.data)
      }
    })
  },
  data: {
    title: ''
  },
  methods: {
    choose: function (item, id) {
      this.title = item
      $.alert(item)
      this.$http.get('/api/merchants/' + this.$route.query.merchant + '/stores/' + this.$route.query.store + '/pay/preview', {money: this.$route.query.money, coupon: id}).then(function (response) {
        this.$router.go({ name: 'pay_go_coupon', query: {id: id, money_net: this.$route.query.money, money_handle: response.data.money, merchant: this.$route.query.merchant, store: this.$route.query.store, title: item} })
      })
    }
  }
}
</script>