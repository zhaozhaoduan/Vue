<template>
  <div class="page page-current">
    <div class="content">
      <div class="gap1"></div>
      <div class="row">
        <div class="col-20">卡<span style="display:inline-block;width:1.7rem;"></span>号：</div>
        <div class="col-80">{{ data.userCashCard.cardNumber}}</div>
      </div>
      <div class="row">
        <div class="col-20">充值金额：</div>
        <div class="col-80">¥<span>{{$route.query.money}}</span></div>
      </div>
      <div class="row">
        <div class="col-20">返<span style="display:inline-block;width:1.7rem;"></span>现：</div>
        <div class="col-80">¥<span>{{ data.rechargeRule.rebateMoney }}</span></div>
      </div>
      <div class="row" v-if="discountRate != 0">
        <div class="col-20">获得权益：</div>
        <div class="col-80"><span>{{ data.rechargeRule.discountRate }}</span>折</div>
      </div>
      <div class="wrap-fixed"> <span class="btnorange1" style="vertical-align: -3px;"> 待支付:¥<span>{{$route.query.money}}</span> </span> <span class="btnorange" @click='pay' style="vertical-align: -3px;">  微信支付 </span> </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .page{
    display: block;
  }
  .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    overflow: auto;
    font-family: Microsoft Yahei;
    -webkit-overflow-scrolling: touch;
  }
  .col-80 strong {
    color: #8a8a8a;
    font-weight: 100;
    padding-left: 0.3rem;
  }
  dd {
    margin: 0;
    padding: 0;
  }
  .row {
    overflow: hidden;
    margin-left: 0%;
    color: #4d4d4d;
  }
  .content_top {
    width: 90%;
    height: 3rem;
    margin: 0 auto;
    font-size: 1.2rem;
    color: #0fc1a9;
    line-height: 3rem;
  }
  .row .col-20 {
    width: 23%;
    margin-left: 4%;
  }
  .row .col-80 {
    width: 68%;
    margin-left: 4%;
    text-align: right;
    padding-right: 1rem;
  }
  .gap1 {
    width: 100%;
    height: 0.2rem;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    background: #efefef;
  }
  .row {
    height: 3rem;
    line-height: 3rem;
    overflow: hidden;
    margin-left: 0%;
    border-bottom: 1px solid #cecece;
  }
  .col-80 span {
    color: #fe6d04;
  }
  .col-80 strong {
    color: #8a8a8a;
  }
  .row .col-20 {
    width: 33%;
    margin-left: 4%;
  }
  .row .col-80 {
    width: 59%;
    margin-left: 4%;
  }
  .wrap-fixed {
    position: fixed;
    bottom: 0;
    z-index: 100;
    text-align: center;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    height: 2.5rem;
    font-size: 1rem;
    line-height: 2.5rem;
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
    border-top: 1px solid #cecece;
  }
  .wrap-fixed a{ color:#fff;}
  .smallicon {
    display: block;
    width: 64%;
    height: 3rem;
    float: right;
    padding-top: 0.4rem;
  }
  .btnorange1 {
    width: 60%;
    float: left;
    text-align: left;
    padding-left: 1rem;
  }
  .btnorange {
    width: 40%;
    float: right;
    background: #0fc1a9;
    color: #fff;
  }
  .btnorange1 span {
    color: #fe6d04;
  }
</style>
<script type="text/javascript">
import $ from 'zepto'
import wx from 'wx'

export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '支付'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '支付'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$http.get('/api/merchants/0/users/0/cards/' + this.$route.query.id + '/recharges/' + this.$route.query.money + '/preview').then(function (response) {
      this.$set('data', response.data)
    })
  },
  methods: {
    pay: function () {
      var data = {
        money: this.$route.query.money,
        url: encodeURIComponent(window.location.href)
      }
      var that = this
      this.$http.post('/api/merchants/' + this.data.userCashCard.merchantId + '/users/' + this.data.userCashCard.merchantUserId + '/cards/' + this.$route.query.id + '/recharges/wechats', data).then(
        function (response) {
          wx.config({
            debug: false,
            appId: response.data.config.appId,
            timestamp: response.data.config.timestamp,
            nonceStr: response.data.config.nonceStr,
            signature: response.data.config.signature,
            jsApiList: ['chooseWXPay']
          })
          wx.chooseWXPay({
            timestamp: response.data.order.timestamp,
            nonceStr: response.data.order.nonceStr,
            package: response.data.order.package,
            signType: response.data.order.signType,
            paySign: response.data.order.paySign,
            success: function (res) {
              var balance = '/w/' + that.data.userCashCard.merchantId + '/#!/card/' + that.$route.query.id + '/balance'
              window.location.href = balance
            }
          })
          wx.error(function (res) {
            $.alert('微信接口出现错误:' + res.errMsg)
          })
        })
    }
  }
}
</script>