<template>
    <div class="page" id="pic_detail">
      <div class="pic-content">
          <div class="content-block-title">代金券详情</div>
          <div class="list-block">
              <ul>
                  <li>
                      <div class="row no-gutter">
                          <div class="col-20">优惠说明</div>
                          <div class="col-80">{{items.coupon.discountDesc}}</div>
                      </div>
                  </li>
                  <li>
                      <div class="row no-gutter">
                          <div class="col-20">有效日期</div>
                          <div class="col-80">{{items.userCoupon.enabledAt}}至{{items.userCoupon.expiredAt}}</div>
                      </div>
                  </li>
                  <li>
                      <div class="row no-gutter">
                          <div class="col-20">可用时段</div>
                          <div class="col-80" v-if='enabledWeeks'>
                           全天时段
                          </div>
                          <div class="col-80" v-else>
                           {{items.coupon.enabledWeeks}}
                          </div>
                      </div>
                  </li>
                  <li>
                      <div class="row no-gutter">
                          <div class="col-20">商户服务</div>
                          <div class="col-80"><button v-for="item in items.coupon.services">{{item | json}}</button></div>
                      </div>
                  </li>
                  <li>
                      <div class="row no-gutter">
                          <div class="col-20">使用须知</div>
                          <div class="col-80">{{items.coupon.instruction}}</div>
                      </div>
                  </li>
              </ul>
          </div>
          <div class="content-block-title">图文介绍</div>
          <div v-if='items.article === undefined ' class="pic-text">
              <img :src="items.coupon.coverImage">
          </div>
          <div v-else class="pic-text">
              {{{items.article.content}}}
          </div>
      </div>
    </div>
</template>

<script type="text/javascript">
export default {
  ready () {
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/coupons/' + this.$route.params.id).then(function (response) {
      this.$set('items', response.data)
      if (this.items.coupon.enabledWeeks.length === 0) {
        this.$set('enabledWeeks', 'ture')
      }
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
  #pic_detail{
      background-color: #fff;
      font-family: "Microsoft YaHei";
      overflow: auto;
  }
  #pic_detail li{
      padding-top: 1.1rem;
  }
  .content-block-title{
      text-align: left;
      font-weight: bold;
      font-size: 0.8rem;
  }
  #pic_detail .col-20{
      width: 23%;
      padding-left: 4%;
      text-align: center;
      color: #999;
      font-size: 0.7rem;
  }
  #pic_detail .col-80{
      width: 77%;
      text-align: left;
      padding:0 2%;
      font-size: 0.7rem;
  }
  #pic_detail .list-block ul:after{
      content:none;
  }
  #pic_detail .list-block ul:before{
      position: relative;
      width: 95%;
      margin: 0 auto;
  }
  .pic-text{
    width: 17.0rem;
    overflow: hidden;
    margin: 0 auto;
  }
  .pic-text-title{
      text-align: left;
      font-size: 0.8rem;
      margin:0.4em 1.3em;
  }
  .pic-text img{
      width: 17.0rem;
      display: block;
      margin: 15px auto;
  }
  #pic_detail .content-block-title{
      margin-top: 1.0rem;
  }
  #pic_detail button{
      border: none;
      display: inline-block;
      background-color: #eee;
      color: #777;
      font-size: 0.6rem;
      margin-right: 10px;
  }
</style>