<template>
    <div class="page" id="ticket_use" style="background-color: {{data.coupon.backgroundColor}};">
        <div class="use-detail">
            <div class="detail-header">
                <img :src="data.userCoupon.logo" alt=""/>
                <h1>{{data.userCoupon.title}}</h1>
            </div>
            <div class="detail-date-ma">
                <p>有效期：{{data.userCoupon.enabledAt}}至{{data.userCoupon.expiredAt}}</p>
                <img :src="data.userCoupon.barCode" alt=""/>
                <p>领取日期：{{createdAt}}</p>
            </div>
            <p class="circle">
                <span class="Cleft" style="background-color: {{data.coupon.backgroundColor}};"></span>
                <span class="Cright" style="background-color: {{data.coupon.backgroundColor}};"></span>
            </p>
            <hr style="margin: 1.5rem auto" />
            <div class="use-rule">
                <hr/>
                使用规则
                <hr/>
                <p>{{data.coupon.instruction}}</p>
            </div>
            <div class="apply-shop">
                <hr />
                使用门店
                <hr/>
                <p v-for='item in data.coupon.stores'>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  ready () {
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/coupons/' + this.$route.params.id).then(function (response) {
      console.log(response.data)
      this.$set('data', response.data)
      this.createdAt = this.data.userCoupon.createdAt.substring(0, 10)
      // this.publishEnabledAt = this.data.coupon.publishEnabledAt.substring(0, 10)
      console.log(this.createdAt)
    })
  }
}
</script>

<style scoped>
  body{
    z-index: -10;
    text-align: center;
  }
  .page{
    display: block;
    overflow:scroll;
  }
  .detail-header img,.detail-header h1{
    display: inline-block;
    vertical-align: middle;
  }
  .detail-header img{
    width: 68px;
    height: 68px;
    border-radius: 34px;
  }
  .detail-header h1{
    font-weight: 100;
    margin: 0;
  }
  #ticket_use .circle span {
    display: block;
    width: 1.2em;
    height: 1.2em;
    border-radius: 0.6em;
    position: absolute;
    top: 0em;
  }
  
  #ticket_use .circle span.Cleft {
      left: -0.6em;
  }
  #ticket_use .circle span.Cright {
      right: -0.6em;
  }
  .apply-shop{
      margin-top: 1rem;
  }
  
  .circle{
      position: relative;
  }
  #ticket_use{
      background-color: #fff;
      overflow: auto;
  }
  #ticket_detail .circle span {
      display: block;
      width: 1.2em;
      height: 1.2em;
      border-radius: 0.6em;
      background-color: #cf3e36;
      position: absolute;
      top: 14.8rem;
  }
  .detail-header img,.detail-header h1{
      display: inline-block;
      vertical-align: middle;
  }
  .detail-header img{
      width: 68px;
      border-radius: 34px;
  }
  .detail-header h1{
      font-weight: 100;
      margin: 0;
  }
  .detail-date-ma img{
      width: 12rem;
      height: 6rem;
  }
  .detail-date-ma p{
      margin: 0;
      margin-bottom: 1rem;
  }
  .use-detail{
      background-color: #fff;
      margin: 2rem 0.4rem 1rem 0.4rem;
      padding-top: 1rem;
      padding-bottom: 0.5rem;
      border-radius: 0.15rem;
      overflow: hidden;
      text-align: center;
      font-family: Microsoft Yahei;
  }
  .use-rule hr,.apply-shop hr{
      width: 35%;
      display: inline-block;
  }
  .use-rule p{
      text-align: left;
      width: 80%;
      margin: 0 auto;
  }
  hr {
      height: 0.3em;
      border: none;
      border-top: 1px dashed #999999;
      width: 90%;
      margin: 0 auto;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {
    #ticket_detail .circle span {
       top: 14.4rem; 
    }
  }
</style>