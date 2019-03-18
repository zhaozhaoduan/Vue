<template>
  <!-- <div v-if='cardNull' class="coupon-null">
    <img src="../assets/img/t/404.png">
    <p>你的卡包暂时空空如也！</p>  
  </div> -->
  <div  class="content">
      <div class="card" style="background-image: url('../assets/img/card.png')">
          <span class="card-num" style="color:#000">666666666</span>
      </div>
      <div class="content-padded">
          <div class="row particularly">
            <div class="col-50">
              <a  v-link="{ name: 'card_code', params:{id: 1} }"><img src="../assets/img/c/zhifu_icon.png"   style="display:inline-block;width: 2rem;height: 2.175rem;" alt=""/> <span>付款</span></a>
            </div>

            <div class="col-50"><a v-link="{ name: 'card_balance', params:{id: 1} }"><img src="../assets/img/c/yu_icon.png"   style="display:inline-block;width: 2.175rem;height: 2.175rem;" alt=""/> <span>余额</span></a></div>
            </div>
          <div class="row">
            <div class="col-50">
              <!-- 无手机号 -->
              <a  v-link="{ name: 'card_rechargeConfig', params:{id: 1} }"><img src="../assets/img/c/i-form-money.png"   style="display:inline-block;width: 1.55rem;height: 1.475rem;" alt=""/> <span>充值</span></a>
            </div>
            <div class="col-50"><a v-link="{ name: 'card_score', params:{id: 1} }"><img src="../assets/img/c/4.png"   style="display:inline-block;width: 1.55rem;height: 1.475rem;" alt=""/> <span>积分</span></a></div>
          </div>
          <div class="row">
            <div class="col-50"><a v-link="{ name: 'coupon'}"><img src="../assets/img/c/2.png"   style="display:inline-block;width: 1.375rem;height: 1.175rem;" alt=""/> <span>券包</span></a></div>
            <div class="col-50"><a v-link="{ name: 'user', params:{id: 1} }" ><img src="../assets/img/c/5.png"   style="display:inline-block;width: 1.175rem;height: 1.175rem;" alt=""/> <span>我的</span></a></div>
          </div>
      </div>
  </div>
</template>
<style scoped>
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

  body{
    font-family: Microsoft Yahei;
  }
  .card{
    width: 100%;
    height: 11rem;
    box-shadow:none;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0;
    position: relative;
    padding-top: 8rem;
  }
  .row .col-50{
      text-align: center;
      height: 6rem;
      line-height: 7rem;
      border-radius: 6px;
      margin-bottom: 2%;
      background-color: #ffffff;
      margin-left: 2%;
      width: 48%;
  }
  .card-num{
      color: #000;
      display: block;
      margin: 0 auto;
      border-top: 1px solid #000;
      width: 60%;
      font-size: 0.85rem;
      font-family:  Arial;
      font-weight: 700;
      text-align: center;
  }
  .content>.row{
    margin-left: 0;
  }
  .content-padded{
    margin:7px;
  }
  .content-padded>.row{
    margin-left: -2%;
  }
  .row .col-100{
      padding-left: 0;
      margin-left: 0%;
      width: 100%;
      height: 11rem;
      text-align: center;
  }
  
  .caption{
    display: block;
      margin-bottom: 0px;
      font-weight: bold;
      text-align: left;
      margin-left: 0.775rem;
      margin-top:0.725rem;
      font-size: 0.75rem;
  }
  .col-50 a{
      color: #3d4145;
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: left;
      padding-left: 2.425rem;
  }
  .particularly .col-50 a{
    padding-left: 2.15rem
  }
  .content-padded .row .col-50 span{
    font-size: 0.8rem;
    width: 3.6rem;
    height: 1.5rem;
  }
  .col-50 a span{
      font-family: Microsoft Yahei;
      font-size: 15px;
  }
</style>