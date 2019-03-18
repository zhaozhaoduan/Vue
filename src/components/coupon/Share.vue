<template>
  <div class="content" id="share">
    <div class="share-content">
          <img class="picture" :src="data.coupon.coverImage" alt=""/>
          <div class="shop-ticket">
              <div class="ticket" style="background-color:{{data.coupon.backgroundColor}}">
                <div class="ticket-content">
                  <div class="ticket-logo">
                    <span><img :src="data.userCoupon.logo" alt=""/></span>
                  </div>
                  <div class="ticket-detail">
                    <p class="ticket-title">{{{str}}}</p>
                    <span class="ticket-date">有效期至{{data.userCoupon.expiredAt}}</span>
                  </div>
                </div>
              </div>
          </div>
          <p class="recognition">长按识别一下二维码可以使用 <span>优惠券</span></p>
          <p class="img-position">
            <img class="two-dimension-code"  :src="data.qrcode" alt=""/>
          </p>
          <div class="share-use-rule">
              <p class="rule-title">使用规则</p>
              <p class="rule-content">{{data.coupon.instruction}}</p>
          </div>
          <div class="share-use-pic">
              <p class="share-pic">图文介绍</p>
              <p class="rule-content">{{{data.article.content}}}</p>
          </div>
    </div>
   <!--  <canvas id="canvas" class="canvas" @touchmove.prevent='touchmove' @click='change'   width="750px" height="1334px" ></canvas> -->
   <div class="mask" @click='change' @touchmove.prevent='touchmove'></div>
</div>
</template>
<script type="text/javascript">
import $ from 'zepto'

export default {
  ready () {
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/coupons/' + this.$route.params.id).then(function (response) {
      this.$set('data', response.data)
      var str = this.data.userCoupon.title
      str = str.replace(this.data.userCoupon.cashRebate, '<span style="font-size:2.1rem">' + this.data.userCoupon.cashRebate + '</span>')
      this.$set('str', str)
    })
    // window.onload = function () {
    //   var img = new window.Image()
    //   img.src = 'http://weixin.mcrst.com/pay/upload/qrcode/1/20160415/57108600dbf1b.jpg'
    //   var canvas = document.getElementById('canvas')
    //   var cvs = canvas.getContext('2d')
    //   img.onload = function () {
    //     cvs.save()
    //     if ($(window).height() === 667 & $(window).width() === 375) {
    //       cvs.drawImage(img, 238, 720, 276, 276)
    //       cvs.beginPath()
    //       cvs.globalCompositeOperation = 'destination-atop'
    //       cvs.arc(375, 855, 85, 0, 2 * Math.PI)
    //       console.log('iphone6')
    //     } else if ($(window).height() === 736 & $(window).width() === 414) {
    //       console.log('iphone6p')
    //       cvs.drawImage(img, 235, 721, 280, 280)
    //       cvs.beginPath()
    //       cvs.globalCompositeOperation = 'destination-atop'
    //       cvs.arc(378, 858, 85, 0, 2 * Math.PI)
    //     } else if ($(window).height() === 568 & $(window).width() === 320) {
    //       console.log('iphone5')
    //       cvs.drawImage(img, 85, 335, 144, 144)
    //       cvs.beginPath()
    //       cvs.globalCompositeOperation = 'destination-atop'
    //       cvs.arc(158, 408, 45, 0, 2 * Math.PI)
    //     } else {
    //       $('.canvas').css('display', 'none')
    //     }
    //     cvs.fill()
    //     cvs.restore()
    //   }
    //   var image = new window.Image()
    //   image.src = '../../assets/img/t/title.png'
    //   image.onload = function () {
    //     cvs.save()
    //     cvs.beginPath()
    //     cvs.moveTo(100, 50)
    //     cvs.lineTo(400, 50)
    //     cvs.lineTo(400, 500)
    //     cvs.lineTo(100, 500)
    //     cvs.clip()
    //     // cvs.drawImage(image, 165, 210, 100, 100)
    //     if ($(window).height() === 667 & $(window).width() === 375) {
    //       cvs.drawImage(image, 215, 245, 130, 130)
    //       console.log('iphone6')
    //     } else if ($(window).height() === 736 & $(window).width() === 414) {
    //       cvs.drawImage(image, 245, 315, 130, 130)
    //       console.log('iphone6p')
    //     } else if ($(window).height() === 568 & $(window).width() === 320) {
    //       cvs.drawImage(image, 195, 265, 115, 115)
    //       console.log('iphone5')
    //     } else {
    //       $('.canvas').css('display', 'none')
    //     }
    //     cvs.restore()
    //   }
    // }
  },
  methods: {
    change () {
      $('.canvas').css('display', 'none')
      $('.mask').css('display', 'none')
    },
    touchmove (e) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
      e.stopPropagation && e.stopPropagation()
      return false
    }
  }
}
</script>
<style scoped>
  .ticket{
    background: url(../../assets/img/t/coupons.png) no-repeat;
    background-size: 100% 103%;
    color: #fff;
    width: 100%;
    margin: 0 auto;
    height: 5.9rem;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    overflow: hidden;
    position: relative;
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
  .ticket-detail .ticket-date{
      bottom: 0.1rem;
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
    top: 6.5em;
  }
  
  @media screen and (device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio:   2){
      span.ticket-share{
          margin-top: 5px;
      }
  }
  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio:   2){
      span.ticket-share{
          margin-top: 5px;
      }
      .ticket-logo{
        width: 31.4%;
      }
      .ticket-detail{
        width: 68.6%;
      }
  }

  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../../assets/img/t/fenxiang1.png') no-repeat;
    background-size: 101%;
  }
  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
      .mask{
        background-size: 113%;/* iphone5*/
      }
    }
  .img-position{
    text-align: left;
    margin: -0.1rem 2rem;
  }
  .canvas {
      width: 100%;
      position: absolute;
      top:0;
      left: 0;
      z-index: 1;
      background-color: rgba(0,0,0,.3);
  }
  .picture{
    height: 7.8rem;
  }
  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
              .ticket-detail>span{
                  margin-top: -8px;
              }
              .picture{
                  height: 6.8rem;
              }
  }
  .shop-ticket{
      width: 90%;
      margin: 1rem auto;
  }
  .share-content{
      font-family: Microsoft Yahei;
      text-align:center;
  }
  .share-content>img{
      width: 100%;
  }
  .recognition span{
      color: #fead10;
  }
  .share-content .two-dimension-code{
      width: 7rem;
  }
  .share-use-rule,.share-use-pic{
      text-align: left;
      width: 90%;
      margin: 0 auto;
  }
  .rule-title,.share-pic{
      border-bottom: 1px solid #999; 
      margin: 0;
  }
  .rule-content,.pic-content{
      /*margin:0.3rem 1rem;*/
      font-size: 0.8rem;
  }
  .share-use-pic img{
      width: 100%;
  }
  #share{
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0;
      background-color: #fff;
  }
</style>