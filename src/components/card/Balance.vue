<template>
	<div class="content">
        <div class="remain">
            <img src="../../assets/img/c/remain.png" alt=""/>
            <span>我的余额</span>
            <h3>¥{{ balance }}</h3>
            <a class="button pay-link" v-if='data.mobile' v-link="{ name: 'card_rechargeConfig', params:{id: userCardId} }">充值</a>
            <a class="button pay-link" v-else v-link="{name: 'card_recharge', params:{id: userCardId}}">充值</a>
            <p class="discount" v-if='data.currentDiscount!=""'>我的权益<span>{{ data.currentDiscount }}</span>折</p>
        </div>
    </div>
</template>
<style scoped type="text/css">
  .remain{
      text-align: center;
      font-family: Microsoft Yahei;
      overflow: auto;
  }
  .remain img{
      width:6.5rem;
      height: 6.5rem;
      margin-top: 1.4rem;
  }
  .remain>span{
      display: block;
      margin-top: 0.2rem;
      margin-bottom: 0.9rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 1rem;
      font-weight: bold;
  }
  .remain .discount{
  	 height: 1rem;
      line-height: 1rem;
      font-size: 1rem;
      margin-top: 9rem;
      margin-bottom: 1.25rem;
      font-weight: bold;
  }
  .remain .discount span{
  	 height: 1.225rem;
      line-height: 1.225rem;
      font-size: 1.225rem;
      color: #FE6D02;
  }
  h3{
      margin-top: 0;
      margin-bottom: 1.95rem;
      height: 2.35rem;
      line-height: 2.35rem;
      font-size: 2.35rem;
  }
  .pay-link{
      color: #ffffff;
      font-weight: bold;
      display: block;
      height: 2.5rem;
      width: 93%;
      line-height: 2.5rem;
      background-color: #0FC1A9;
      border-radius: 4px;
      margin: 0 auto;
      font-size: 1.25rem;
      border:none;
  }
  iframe {
    border:none;
    display: none;
  }
</style>

<script type="text/javascript">
import $ from 'zepto'
export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '余额'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '余额'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId).then(function (response) {
      this.$set('data', response.data)
      this.$set('balance', response.data.balance.toFixed(2))
      if (this.data.mobile === '') {
        this.data.mobile = true
      } else {
        this.data.mobile = false
      }
    })
    this.$set('userCardId', window.user.cashCardId)
  }
}
</script>