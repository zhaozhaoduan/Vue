<template>
<div class="page">
   <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name">¥</i></div>
              <div class="item-inner">
                <div class="item-title label">选择金额：</div>
                <div class="item-input">
                  <input type="number" value=''  v-model='money' readonly />
                </div>
                <div class="item-title label1" style="text-align:right;">元</div>
              </div>
            </div>
          </li>
        </ul>
   </div>
   <div class="content">
     <div class="content-padded grid-demo">
        <div class="row">
          <div class="col-50" :class="{'active': $index == activeIndex}" v-for="item in data" @click='recharge(item.rechargeMoney,$index)' >
            <div class="col-50_top" v-if='item.discountRate!=""'>消费享受
              <span>{{ item.discountRate }}</span>折
            </div>

            <div class="col-50_top" v-else></div>

            <div class="col-50_buttom">
              <dl class="col-50_buttom_title">
                <dd class="centercolor"><i class="icon1 icon-form-name"></i>充值</dd>
                <dd><i class="icon2 icon-form-name"></i>返现</dd>
              </dl>
              <dl class="col-50_buttom_rigeht">
                <dd class="centercolor">{{ item.rechargeMoney }}元</dd>
                <dd>{{ item.rebateMoney }}元</dd>
              </dl>
            </div>
          </div>
        </div>
     </div>
   </div>
   <div class="wrap-fixed" @click='submit' v-link="{ name: 'cardRechargePay', params:{id: server.userCashCard.id, money: money } }"> <span class="btn orange" style="verticalign: -3px;"> <a>确认</a> </span></div>
</div>
</template>
<style scoped type="text/css">
  .page{
     color: #000;
     background-color: #EFEFEF;
     border-top: 1px solid #0FC1A9;
     font-family: "Microsoft YaHei";
     display: block;
     }
     .col-50{
      margin-bottom: 1rem;
     }
     .col-50.active{
      border: 2px solid #666;
      border-radius: 10px;
     }
    .content {
    position: absolute;
    top: 3.1rem;
    right: 0;
    bottom: 2.6rem;
    left: 0;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .top_Inputbox {
    width: 100%;
    height: 3rem;
    margin: 0 auto;
  }
  dd {
    margin: 0;
    padding: 0;
  }
  .list-block ul {
    background: #fff;
    list-style: none;
    padding: 0;
    border: 1px #1cc4ad solid;
    margin: 0;
    position: relative;
  }
  .icon {
    font-family: iconfont!important;
    font-style: normal;
    background: #0fc1a9;
    border-radius: 0.3rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.1rem;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    background-position: center;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon1 {
    font-family: iconfont!important;
    font-style: normal;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    background-position: center;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon2 {
    font-family: iconfont!important;
    font-style: normal;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    background-position: center;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: .2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .list-block {
    margin: 0;
  }
  .list-block input[type=text], .list-block input[type=password], .list-block input[type=email], .list-block input[ type=tel], .list-block input[type=url], .list-block input[type=date], .list-block input[type=datetime-local], .  list-block input[type=time], .list-block input[type=number], .list-block input[type=search], .list-block select, .  list-block textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    box-sizing: border-box;
    background: 0 0;
    border-radius: 0.4rem;
    box-shadow: none;
    text-align: center;
    display: block;
   padding: 0 0 0 .25rem;
    margin: 0;
    width: 100%;
    height: 1.8rem;
    border: 0.1rem solid #cccccc;
    color: #000;
   font-size: .85rem;
    font-family: inherit;
  }
  .list-block .item-title.label1 {
    /* width: 4%; */
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    margin: 4px 0;
    right: 1.4rem;
    position: absolute;
  }
  input::-webkit-input-placeholder {
   color:    #000;
  }
  input:-moz-placeholder {
   color:    #000;
  }
  .list-block .item-title.label {
    width: 30%;
    -webkit-flex-shrink: 0;
    -ms-flex: 0 0 auto;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    margin: 4px 0;
  }
  .row .col-50 {
  width: 46%;
      min-height: 7.5rem;
      margin-left: 4%;
      display: block;
      overflow: hidden;
      background: url(../../assets/img/c/background1.png);
      background-size: 100% 100%;
  }
  
  .col-50_top {
    min-height:1.4rem;
    text-align: center;
    padding-top: 0.3rem;
    color: #666666
  }
  .col-50_top span {
    font-size: 1.2rem;
    color: #ff6c04;
    font-family:Arial, Helvetica, sans-serif;
  }
  .col-50_buttom_title {
    float: left;
    text-align: left;
    padding: 0;
  }
  .col-50_buttom dd {
    padding-bottom: 0.3rem;
  }
  .centercolor {
    color: #10c2a8;
  }
  .col-50_buttom_rigeht {
    float: right;
    text-align: right;
  }
  .interspace {
    width: 100%;
    height: 1rem;
    margin: 0 auto;
  }
  .icon1.icon-form-name {
    width: 1rem;
    height: 1rem;
    background-image: url(../../assets/img/c/top-up.png);
    background-size: 100%;
    margin-right: 0.3rem;
    margin-top: -0.2rem;
  }
  .icon2.icon-form-name {
    width: 1rem;
    height: 1rem;
    background-image: url(../../assets/img/c/reflect.png);
    background-size: 100%;
    margin-top: -0.2rem;
    margin-right: 0.3rem;
  }
  .list-block .item-content {
      box-sizing: border-box;
      padding-left: .75rem;
      min-height: 3rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
  }
  .dottedline{ width:89%; height:0.2rem; margin:0 auto;border-bottom: 1px #dddbdb dotted;}
  .wrap-fixed {
    position: fixed;
    bottom: 0;
    z-index: 100;
    text-align: center;
    width: 100%;
    color: #fff;
    max-width: 100%;
    margin: 0 auto;
    height: 2.6rem;
    font-size: 1rem;
    line-height: 49px;
    box-shadow: 0 -1px 2px rgba(0,0,0,.1);
    background: #0fc1a9;
  }
  .wrap-fixed a{ color:#fff;}
  .list-block {
      margin: 0;
      position: fixed;
      top: 0;
      z-index: 100;
      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      height: 3.1rem;
      box-shadow: 0 -1px 2px rgba(0,0,0,.1);
  }
  .content {
      position: absolute;
      top: 3rem;
      right: 0;
      bottom: 2.6rem;
      left: 0;
      background: #fff;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
  }
  .col-50_buttom{
      height: 4.2rem;
      margin: 0 0.8rem;
      border-top: 1px dotted #dddbdb;
      border-bottom: 1px dotted #dddbdb;
    }
  dl {
      display: block;
      -webkit-margin-before: 0.7em;
      -webkit-margin-after: 1em;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
  }
</style>

<script type="text/javascript">
import $ from 'zepto'
export default {
  ready () {
    $('.row .col-50.active').removeClass('active')
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '充值'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '充值'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$http.get('/api/merchants/' + window.user.merchantId + '/cards/' + window.card.id + '/rule/recharge').then(function (response) {
      this.$set('data', response.data)
    }, function (response) {
      this.$router.go('error')
    })
  },
  data () {
    return {
      activeIndex: '-1' //  为了防止页面加载时默认选中的是第一个
    }
  },
  methods: {
    recharge: function (item, $index) {
      this.money = item
      this.activeIndex = $index
    },
    submit: function (event) {
      if (this.money !== '') {
        var redirectUrl = '/oauth/' + window.user.merchantId + '/pay?url=' +
        encodeURIComponent('pay/go/card?id=' + window.user.cashCardId + '&money=' + this.money)
        window.location.href = redirectUrl
      } else {
        $.alert('请选择充值金额！')
        event.preventDefault()
      }
    }
  }
}
</script>