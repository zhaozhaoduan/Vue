<template>
  <div v-if='coupon' class="coupon-null">
    <img src="../assets/img/t/couponEmpty.png">
    <p>你的券包暂时空空如也！</p>  
  </div>
  <div v-else class="content-coupon">
    <div class="tickets-list">
        <a v-for="item in items" v-link="{ name: 'coupon_detail', params: {id: item.id} }">
          <div class="ticket" style="background-color:{{item.backgroundColor}}">
            <div class="ticket-content">
              <div class="ticket-logo">
                <span><img :src="item.logo" alt=""/></span>
              </div>
              <div class="ticket-detail" v-if='item.receiveTimes>0'>
                <span class="ticket-share">已分享</span>
                <p class="ticket-title">{{{item.title}}}</p>
                <span class="ticket-date">有效期至{{item.expiredAt.substring(0, 10)}}</span>
              </div>
              <div class="ticket-detail" v-else>
                <span  v-if='item.shared&&item.couponShared' class="ticket-share">可分享</span>
                <span  v-else class="ticket-share">不可分享</span>
                <p class="ticket-title">{{{item.title}}}</p>
                <span class="ticket-date">有效期至{{item.expiredAt.substring(0, 10)}}</span>
              </div>
            </div>
          </div>
        </a>
    </div>
</div>
</template>
<script type="text/javascript">
import $ from 'zepto'
export default {
  ready: function () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '券包'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '券包'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/coupons').then(function (response) {
      if (response.data.length === 0) {
        this.$set('coupon', 'false')
      } else {
        this.items = response.data
        // var str = this.item.title
      }
    }, function (response) {
      if (response.status === 404) {
        this.$router.replace({name: 'home'})
      } else if (response.status === 500) {
        $.alert('500！内部服务器出错')
      }
    })
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
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
    background: url(../assets/img/t/coupons.png) no-repeat;
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
      width: 3.0rem;
      height: 3.0rem;
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