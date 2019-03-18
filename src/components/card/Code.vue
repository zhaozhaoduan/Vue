<template>
  <div class="scan-bg">
        <div class="scan-img">
            <div class="img-one">
                <img :src="data.barCode" alt=""/>
            </div>
            <div class="img-two">
                <img :src="data.qrCode" alt=""/>
                <p>请向收银员出示二维码</p>
            </div>
        </div>
    </div>
</template>
<style scoped type="text/css">
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
    .img-two p{
        text-align: center;
        margin: 0;
        font-family: "Microsoft YaHei";
    }
   .scan-bg{
              width: 91%;
              margin: 0 auto;
              height: 73%;
              text-align: center;
              margin-top: 3.425rem;
    }
    .scan-img{
              background: url("../../assets/img/c/payback.png") no-repeat center;
              width: 100%;
              height: 100%;
              background-size: contain;
    }
    .scan-bg .img-one {
          height: 40%;   
   }
   .scan-bg .img-one img{
        margin-top: 1.5rem;
        width: 12.85rem;
        height: 6rem;
   }
   .scan-bg .img-two{
        height: 60%;    
   }
   .scan-bg .img-two img{
        margin-top: 5%;
        width: 9rem;
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
      document.title = '付款'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '付款'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }

    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId + '/code').then(function (response) {
      console.log('success')
      this.$set('data', response.data)
      this.scanID = window.setInterval(queryOrder(this), 1000)
    })
    this.intervalID = window.setInterval(cycle(this), 60000)
  }
}
function cycle (q) {
  return function () {
    q.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId + '/code').then(function (response) {
      console.log('success')
      q.$set('data', response.data)
      window.setInterval(q.scanID)
    })
  }
}
function queryOrder (o) {
  return function () {
    o.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/orders/' + o.data.scanId + '/scan').then(function (response) {
      o.$set('order', response.data)
      if (response.data.tradeStatus === 1) {
        console.log('ok')
        window.clearInterval(o.scanID)
        window.clearInterval(o.intervalID)
        this.$router.replace({name: 'card_consume', params: {id: this.order.id}})
      } else {
        window.setInterval(o.scanID)
        console.log(o.scanID)
      }
    })
  }
}
</script>