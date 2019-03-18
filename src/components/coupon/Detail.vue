<template>
  <!-- <div class="page" id="ticket_detail" style="background-color: {{data.coupon.backgroundColor}};">
    <div class="detail-content">
      <img :src="data.coupon.logo" style='border:1px solid {{data.coupon.backgroundColor}}' alt=""/>
      <p class="shop-name">{{data.coupon.subtitle}}</p>
      <h1 class="ticket-detail-title">{{data.coupon.title}}</h1>
      <a v-link="{ name: 'coupon_detail_consume', params: {id: this.$route.params.id}}" class="button">立即使用</a>
      <p class="ticket-detail-date">有效期：{{data.userCoupon.enabledAt}}至{{data.userCoupon.expiredAt}}</p>
      <hr>
      <div class="list-block">
        <ul>
          <li>
            <a v-link="{ name: 'coupon_detail_article', params: {id: this.$route.params.id}}" class="item-content">
              <div class="item-inner pic">
                  <div class="item-title" style="background: url({{data.coupon.coverImage}}) no-repeat center;background-size: contain;height: 10em;width: 100%;">
                      <p class="pic-title">{{data.coupon.coverTitle}}</p>
                  </div>
              </div>
            </a>
          </li>
          <li>
            <a v-link="{ name: 'coupon_detail_consume', params: {id: this.$route.params.id}}" class="item-link item-content">
              <div class="item-inner">
                <div class="item-title">
                    适用门店
                </div>
              </div>
            </a>
          </li>
          <li>
            <a class="item-link item-content"  @click='share'>
              <div class="item-inner">
                <div class="item-title">
                  转增好友
                    </div>
                </div>
            </a>
          </li>
        </ul>
      </div>
      <p class="circle">
        <span class="Cleft" style="background-color: {{data.coupon.backgroundColor}};"></span>
        <span class="Cright" style="background-color: {{data.coupon.backgroundColor}};"></span>
      </p>
    </div>
    <div class="mask" @click='out' @touchmove.prevent='touchmove'>
      <img src="../../assets/img/t/fenxiang.png">
    </div>
  </div> -->
   <div class="content" style="background-color: {{data.coupon.backgroundColor}};">
      <div class="row1"> <img :src="data.userCoupon.logo" > </div>
      <div class="row"> <span class="row_1">{{data.coupon.subtitle}}</span> <span class="row_2">{{data.coupon.title}}</span> <span class="row_1"><a v-link="{ name: 'coupon_detail_consume', params: {id: this.$route.params.id}}" class="button button-fill button-success">立即使用</a></span> <span class="row_3">有效期至{{data.userCoupon.expiredAt}}</span> <span class="row_4">
        <div class="list-block">
          <ul>
            <li> <a v-link="{ name: 'coupon_detail_article', params: {id: this.$route.params.id}}"  class="item-link item-content">
              <div class="item-inner">
                <div class="item-title">{{data.coupon.coverTitle}}</div>
              </div>
              </a> </li>
          </ul>
        </div>
        <img v-link="{ name: 'coupon_detail_article', params: {id: this.$route.params.id}}" :src="data.coupon.coverImage"> </span> <span class="row_5">
        <div class="list-block1 media-list inset">
          <ul>
            <li style="border-bottom:1px solid #eee;"> <a v-link="{ name: 'coupon_detail_consume', params: {id: this.$route.params.id}}" class="item-link item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">适用门店</div>
                </div>
              </div>
              </a> </li>
            <li style="border-bottom:1px solid #eee;"> <a @click='share' class="item-link item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">转赠好友</div>
                </div>
              </div>
              </a> </li>
             <li> <a v-link="{ name: 'coupon_share', params: {id: this.$route.params.id}}" class="item-link item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">公众号</div>
                </div>
              </div>
              </a> </li>
          </ul>
        </div>
        </span> </div>
      <p class="circle"> 
        <span class="Cleft" style="background-color: {{data.coupon.backgroundColor}};"></span> 
        <span class="Cright" style="background-color: {{data.coupon.backgroundColor}};"></span>
      </p>
      <div class="row_88">
      </div>
    </div>
    <div class="mask" @click='out' @touchmove.prevent='touchmove'>
      <img src="../../assets/img/t/fenxiang.png">
    </div>
</template>

<script type="text/javascript">
import $ from 'zepto'
import wx from 'wx'
export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '优惠券详情'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '优惠券详情'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    $.showPreloader()
    setTimeout(function () {
      $.hidePreloader()
    }, 500)
    $('.mask').css('display', 'none')
    var data = {
      url: window.location.href
    }
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/coupons/' + this.$route.params.id, data).then(function (response) {
      console.log(response.data)
      this.$set('data', response.data)
      if (response.data.userCoupon.shared && response.data.userCoupon.receiveTimes === 0) {
        wx.showOptionMenu()
        // 分享接口
        wx.config({
          debug: false,
          appId: response.data.share.config.appId,
          timestamp: response.data.share.config.timestamp,
          nonceStr: response.data.share.config.nonceStr,
          signature: response.data.share.config.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        })
        // 发送到朋友
        wx.onMenuShareAppMessage({
          title: response.data.share.title, // 分享标题
          desc: response.data.share.title + '优惠券，快来抢',
          link: response.data.share.link, // 分享链接
          imgUrl: response.data.share.imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        // 发送到朋友圈
        wx.onMenuShareTimeline({
          title: response.data.share.title, // 分享标题
          link: response.data.share.link, // 分享链接
          imgUrl: response.data.share.imgUrl, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        wx.error(function (res) {
          $.alert('微信接口出现错误:' + res.errMsg)
        })
      } else {
        wx.hideOptionMenu()
      }
    })
  },
  methods: {
    share: function () {
      $('.mask').toggle()
    },
    touchmove (e) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
      e.stopPropagation && e.stopPropagation()
      return false
    },
    out: function () {
      $('.mask').toggle()
    }
  }
}
</script>

<style scoped>
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .mask img{
    position: absolute;
    right: 1rem;
    top: 0;
    width: 70%;
  }
</style>
<style scoped type="text/css">
  body {
  height: 100%;
  overflow: hidden;
  background: #fff;
  }
  .list-block ul:before { opacity:0;}
  .content {
    font-family: 'Microsoft Yahei';
    padding-top: 2rem;
    padding-bottom: 2rem;
    min-height: 25rem;
  }
  .row1 img {
    width: 3.0rem;
    height: 3.0rem;
    border-radius: 50%;
  }
  .row1 {
    overflow: hidden;
    text-align: center;
    position: absolute;
    margin: 0 auto;
    top: 0.6rem;
    width: 100%;
  }
  .row {
    width: 90%;
    min-height: 25.5rem;
    background: #fff;
    background-size: 100% 100%;
    overflow: hidden;
    text-align: center;
    padding-top: 2.8rem;
    margin: 0 auto;
  }
  .list-block.media-list .item-inner {
    display: block;
   padding-top: .3rem;
   padding-bottom: .2rem;
  }
  .row_1 {
    width: 100%;
    display: block;
    color: #9a9a9a;
    font-size: 0.8rem;
    text-align: center;
  }
  .row_2 {
    width: 100%;
    display: block;
    color: #000;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    text-align: center;
    padding-top: 0.5rem;
  }
  .row_3 {
    width: 100%;
    display: block;
    color: #000;
    font-size: 0.7rem;
    text-align: center;
    padding-top: 0.2rem;
  }
  .row_4 {
    width: 100%;
    display: block;
    color: #000;
    font-size: 0.7rem;
    text-align: center;
    padding-top: 1.8rem;
  }
  .list-block1 li {
    position: relative;
  }
  .list-block .item-content {
   padding-left: .75rem;
    min-height: 1.2rem;
    align-items: center;
  }
  .list-block1 .item-content {
    padding-left: 0rem;
    min-height: 2.2rem;
    align-items: center;
  }
  .list-block .item-inner {
   padding-right: .75rem;
    position: relative;
    width: 100%;
   padding-top: .3rem;
    min-height: 1.2rem;
    padding-bottom: 0rem;
    overflow: hidden;
    align-items: center;
  }
  .list-block li {
    box-sizing: border-box;
    position: relative;
    height: 1.55rem;
  }
  .list-block1 .item-link .item-inner {
    padding-right: 1.5rem;
    background-image: url(../../assets/img/t/you.png);
   background-size: .7rem;
    background-repeat: no-repeat;
    background-position: 97% center;
   background-position: -webkit-calc(100% - .5rem) center;
   background-position: calc(100% - .5rem) center;
  }
  .row_5 {
    width: 100%;
    display: block;
    color: #000;
    font-size: 0.7rem;
    text-align: center;
  }
  .row_4 img {
    width: 90%;
    height: 6.8rem;
  }
  .list-block1 .item-inner {
   padding-right: .75rem;
    position: relative;
    width: 100%;
   padding-top: .4rem;
   padding-bottom: .35rem;
    min-height: 2.2rem;
    overflow: hidden;
    align-items: center;
  }
  .list-block .item-title {
    position: relative;
    overflow: hidden;
    font-size: 0.7rem;
    max-width: 100%;
    min-height: 1.2rem;
  }
  .list-block1 .item-title {
    color: #2e2e2e;
    flex-shrink: 1;
    position: relative;
    text-align: left;
    overflow: hidden;
    max-width: 100%;
  }
  .button.button-fill {
    color: #fff;
    background: #fdad10;
    border: none;
    line-height: 2rem;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .button {
    border: 1px solid #0894ec;
    color: #0894ec;
    text-align: center;
    display: block;
    border-radius: 0.1rem;
    line-height: 1.25rem;
    appearance: none;
    background: 0 0;
   padding: 0 .5rem;
    width: 55%;
    margin: 0 auto;
    height: 2rem;
    white-space: nowrap;
    position: relative;
    font-size: 0.7rem;
    font-family: inherit;
    cursor: pointer;
  }
  .list-block {
    width: 100%;
    margin: 0 auto;
   font-size: .85rem;
  }
  .list-block {
    width: 100%;
    margin: 0 auto;
   font-size: .85rem;
  }
  .list-block ul {
    list-style: none;
    color: #fff;
    width: 90.4%;
    padding: 0;
    top: 6.8rem;
    bottom: 0;
    background-color: #000;
    opacity: 0.8;
    background-color: rgba(0, 0, 0);
    margin: 0 auto;
  }
  .list-block1 ul {
    list-style: none;
    color: #fff;
    width: 90.4%;
    padding: 0;
    bottom: 0;
    margin: 0 auto;
    position: relative;
  }
  .button-success.button-fill:active {
    background-color: #fdad10;
  }
  .list-block.inset ul {
    border-radius: 0.35rem;
    margin-top: 3.5rem;
    background: #fff;
    list-style: none;
    color: #000;
  }
  .list-block.inset li:first-child:last-child>a {
    border-radius: 0.35rem;
    padding: 0;
  }
  .list-block.media-list .item-inner {
    display: block;
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    align-self: stretch;
    line-height: 1.5rem;
  }
  .list-block .item-link.active-state, html:not(.watch-active-state) .list-block .item-link:active {
    background-color: #131212;
  }
  #mess_share {
    margin: 15px 0;
  }
  #share_1 {
    float: left;
    width: 49%;
  }
  #share_2 {
    float: right;
    width: 49%;
  }
  #mess_share img {
    width: 22px;
    height: 22px;
  }
  #cover {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 18888;
    background-color: #000000;
    opacity: 0.7;
    pointer-events: auto;
  }
  #guide {
    display: none;
    position: absolute;
    right: 18px;
    top: 5px;
    z-index: 19999;
  }
  #guide img {
    width: 260px;
    height: 180px;
  }
  .Cleft {
    display: block;
    width: 1.2em;
    height: 1.2em;
    border-radius: 0.6em;
    position: absolute;
    top: 16.35em;
    right: 0.4rem;
  }
  .Cright {
    display: block;
    width: 1.2em;
    height: 1.2em;
    border-radius: 0.6em;
    position: absolute;
    top: 16.35em;
    left: 0.4rem;
  }
  .content_1 hr {
    height: 1px;
    border: none;
    border-top: 1px dashed #999;
    margin-bottom: 2em;
    margin: 0 auto;
    width: 95%;
  }
  .row_88 hr {
    height: 0.3em;
    border: none;
    border-top: 1px dashed #a2a2a2;
    width: 85%;
    margin: 0 auto;
    position: absolute;
    top: 16.1rem;
    left: 8%;
  }
  .row_88 {
    height: 0.3em;
    border: none;
    border-top: 1px dashed #a2a2a2;
    width: 80%;
    margin: 0 auto;
    position: absolute;
    top: 14.4rem;
    left: 10%;
  }
</style>