<template>
  <div class="content">
    <div class="content_zt">
      <p>支付成功</p>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-email"></i></div>
              <div class="item-inner">
                <div class="item-title label">支付金额：</div>
                <div class="item-input">{{totalAmount}}元 </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">卡内余额：</div>
                <div class="item-input">{{balance}}元</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <a v-link="{name: 'card', params: {id: this.userCardId}}" class="button button-success">完成</a>
    </div>
  </div>

<!-- <div class="content" id="pay">
    <div class="list-block">
        <ul>
            <li class="item-content">
                <div class="item-inner">
                    <div class="item-title">订单号：</div>
                    <div class="item-after">{{data.order.orderNumber}}</div>
                </div>
            </li>
            <li class="item-content">
                <div class="item-inner">
                    <div class="item-title">卡号：</div>
                    <div class="item-after">{{data.userCashCard.cardNumber}}</div>
                </div>
            </li>
            <li class="item-content">
                <div class="item-inner">
                    <div class="item-title">卡内余额:</div>
                    <div class="item-after"><span>{{data.userCashCard.balance}}</span>元</div>
                </div>
            </li>
            <li class="item-content">
                <div class="item-inner">
                    <div class="item-title">本次消费:</div>
                    <div class="item-after"><span>{{data.order.totalPayable}}</span>元</div>
                </div>
            </li>
            <li>
                <a href="javascript:" class="item-link item-content">
                    <div class="item-inner">
                        <div class="item-title">使用优惠券:</div>
                        <div class="item-after has-choose">30元代金券</div>
                        <div class="item-after" style="display: none">4张可用优惠券</div>
                    </div>
                </a>
            </li>
            <li class="item-content">
                <div class="item-inner">
                    <div class="item-title">折扣优惠(<span>{{data.userCashCard.currentDiscount}}</span>折):</div>
                    <div class="item-after">-<span>{{discountMoney}}</span>元</div>
                </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">优惠券:</div>
                <div class="item-after">-¥<span>30</span></div>
              </div>
            </li>
        </ul>
    </div>
    <div class="panel-pay">
        <p><span class="left">待支付 ￥<s>{{data.order.totalAmount}}</s></span><a class="right prompt-ok" @click='confirm'>确认支付</a><a class="right prompt-cancel" @click='cancel'>取消支付</a></p>
    </div>
</div> -->
</template>
<style scoped>
  p {
    margin: 0em 0;
  }
  .content {
    font-family: 'Microsoft Yahei';
    background: #0193e6;
  }
  .content_zt {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: url(../../assets/img/c/securities.png) top center no-repeat;
    background-size: 100% 55%;
  }
  .list-block {
    position: absolute;
    width: 90%;
    top: 38%;
    left: 5%;
    margin: 0rem 0;
    background: url(../../assets/img/c/securities1.png) center center no-repeat;
    background-size: 100% 100%;
    padding-top: 1rem;
    height: 7rem;
  }
  .content_zt p {
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    position: absolute;
    top: 25%;
    left: 35%;
  }
  .icon.icon-form-name {
    width: 1rem;
    height: 1.3rem;
    background-image: url(../../assets/img/c/serialnumber.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .icon.icon-form-email {
    width: 1rem;
    height: 1.3rem;
    background-image: url(../../assets/img/c/amount.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .button-success {
    border-color: #fff;
    color: #fff;
    width: 48%;
    position: absolute;
    top: 70%;
    left: 26%;
  }
  .button {
    height: 2.5rem;
    line-height: 2.3rem;
    font-size: 1.3rem;
  }
  .list-block .item-title.label {
    width: 39%;
    color: #666666;
  }
  .list-block .item-input {
    color: #666666;
  }
  .button-success:active {
    border-color: #fff;
    color: #fff;
  }
  .list-block ul:before,.list-block ul:after,.list-block .item-inner:after {
      background-color: #fff;
  }
 /* #pay{
    font-family: Microsoft Yahei;
  }
  #pay .list-block{
      margin-top: 0.2rem;
  }
  .panel-pay{
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #ffffff;
      height: 3rem;
  }
  .panel-pay>p{
      margin: 0;
  }
  .panel-pay .left{
      float: left;
      padding-left: 1em;
      display: block;
      height: 3rem;
      line-height: 3rem;
      width: 40%;
  }
  
  .panel-pay .right{
      background-color: #0FC1A9;
      color: #ffffff;
      display: block;
      height: 3rem;
      line-height: 3rem;
      width: 30%;
      float: right;
      text-align: center;
      font-weight: bold;
  }
  .panel-pay .prompt-cancel{
    background-color: #989898;
  }
  .panel-pay s{
      font-size: 0.85rem;
      color: #FF7E21; 
  }
  s{
    text-decoration: none;
    font-size: 12px;
  }
  .item-after span,#pay .item-title span{
    color: #FF7E21;
  }*/
</style>
<script type="text/javascript">
import $ from 'zepto'
export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '消费预览'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '消费预览'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$set('userCardId', window.user.cashCardId)
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/orders/' + this.$route.params.id).then(function (response) {
      this.$set('totalAmount', response.data.order.totalAmount)
      this.$set('balance', response.data.userCashCard.balance)
    })
  }
  // methods: {
  //   confirm: function () {
  //     if (this.data.order.totalAmount > this.data.userCashCard.balance) {
  //       $.alert('您的余额不足，请充值！')
  //     } else {
  //       this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + this.data.order.orderNumber + '/consume').then(function () {
  //         this.$router.go({name: 'card', params: {id: this.merchantUserId}})
  //         console.log('确认')
  //       })
  //     }
  //   },
  //   cancel: function () {
  //     $.confirm('你确定要取消支付吗?',
  //       function () {
  //         window.alert('确认取消支付')
  //         this.$router.go({name: 'card', params: {id: this.merchantUserId}})
  //       },
  //       function () {
  //         this.$router.go({name: 'card', params: {id: this.merchantUserId}})
  //       }
  //     )
  //   }
  // },
  // computed: {
  //   discountMoney: function () {
  //     return (this.data.order.totalPayable - this.data.order.totalAmount).toFixed(2)
  //   }
  // }
}
</script>