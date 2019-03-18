<template>
<div class="page" id="page-infinite-scroll-bottom">
  <div class="buttons-tab">
    <a @click='consume' class="tab-link button">消费</a>
    <a class="tab-link active button">充值</a>
  </div>
  <div class="content pull-to-refresh-content infinite-scroll infinite-scroll-bottom" data-ptr-distance="55" data-distance="100">
    <!-- 默认的下拉刷新层 -->
    <div class="pull-to-refresh-layer">
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
    <div class="content-block">
      <div class="tabs">
        <div class="tab active" v-for="item in items">
          <div class="content-block1" >
            <div class="row">
              <p v-if="item.discount===0">充<span>{{ item.money }}</span>返<span>{{ item.rebate }}</span></p>
              <p v-else>充<span>{{ item.money }}</span>返<span>{{ item.rebate }}</span>享受{{ item.discount }}折优惠</p>
            </div>
            <div class="row">
              <div class="col-20">充值金额：</div>
              <div class="col-80"><span>{{ item.money }}</span>元</div>
            </div>
            <div class="row">
              <div class="col-20">返利：</div>
              <div class="col-80"><span>{{ item.rebate }}</span>元</div>
            </div>
            <div class="row">
              <div class="col-20">日期：</div>
              <div class="col-80">{{item.createdAt}}</div>
            </div>
            <div class="row">
              <div class="col-20">权益：</div>
  
              <div class="col-80" v-if="item.discount === 0">无权益</div>
              <div v-else class="col-80">
                <span>{{ item.discount }}</span>折
              </div>
              
            </div>
            <div class="row">
              <div class="col-20">状态：</div>
              <div v-if="item.tradeStatus===1" class="col-80">充值成功</div>
              <div v-else class="col-80">充值失败</div>
            </div>
          </div>
        </div>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
          <div class="preloader"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>
<style scoped type="text/css">
  .page{
    display: block;
  }
  .buttons-tab {
    width: 100%;
    background: #fff;
    position: fixed;
    border-top: 1px solid #0fc1a9;
    margin-bottom: 0.3rem;
    border-bottom: 0.2rem solid #efefef;
    z-index: 999;
    }
    .content {
      background-color: #fff;
      font-family: "Microsoft YaHei";
      border-top: 1px solid #0FC1A9;
    }
    .pull-to-refresh-content{
      top: 0;
    }
    .buttons-tab .button.active {
    color: #fff;
    border-color: #0fc1a9;
    z-index: 100;
    background: #0fc1a9;
    }
    .content-block {
        margin: 0;
        padding: 0 .75rem;
        color: #6d6d72;
    }
    p {
        margin: 0.3em 0;
    }
    .row {
        overflow: hidden;
        margin-left: 0%;
        padding-bottom: 0.1rem;
    }
    .row span{ color:#ff6c02;}
    .row p{ font-size:1rem;    color: #333333;font-size: 17px;}
    .row .col-20 {
        width: 30%;
        margin-left: 0%;
        text-align:left;
        font-size: 15px;
    }
    .row .col-80 {
        width: 70%;
        margin-left: 0%;
        text-align:right;
        font-size: 15px;
    }
    .content-block1 {
      margin: 0.3rem 0;
        padding: 0 .75rem;
        border-bottom: 0.2rem solid #efefef;
        max-height: 10.5rem;
        padding-bottom: 0.5rem;
        padding-top: 0.2rem;
    }
    .tabs .tab.active {
        display: block;
        
    }
    .buttons-tab .button {
        color: #0FC1A9;
        font-size: .8rem;
        width: 100%;
        height: 2.3rem;
        line-height: 2.3rem;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        border: 0;
        border-bottom: 2px solid transparent;
        border-radius: 0;
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
      document.title = '充值记录'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '充值记录'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    $('.infinite-scroll-preloader').css('display', 'none')
    // 下拉刷新页面
    $(document).on('pageInit', '.page', function (e, id, page) {
      var $content = $(page).find('.content').on('refresh', function (e) {
        // 模拟2s的加载过程
        setTimeout(function () {
          // $(window).scrollTop(0);
          // 加载完毕需要重置
          $.pullToRefreshDone($content)
        }, 2000)
      })
    })
    //  无限滚动
    var num = 1
    var that = this
    $(document).on('pageInit', '#page-infinite-scroll-bottom', function (e, id, page) {
      var loading = false
      that.$set('cardId', window.card.id)
      that.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId + '/consumers?type=2&page=' + num).then(function (response) {
        that.items = response.data
      })
      $(page).on('infinite', function (data) {
      // 如果正在加载，则退出
        if (loading) return
        // 设置flag
        loading = true
        // 模拟1s的加载过程
        $('.infinite-scroll-preloader').css('display', 'block')
        setTimeout(function () {
          num++
          that.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId + '/consumers?type=2&page=' + num).then(function (response) {
            that.items = that.items.concat(response.data)
            if (response.data.length === 0) {
              // 加载完毕，则注销无限加载事件，以防不必要的加载
              $.detachInfiniteScroll($('.infinite-scroll'))
              // 删除加载提示符
              $('.infinite-scroll-preloader').remove()
              return
            }
          })
          // 重置加载flag
          loading = false
          $.refreshScroller()
        }, 1000)
      })
    })
    $.init()
  },
  data () {
    return {
      items: [],
      profile: {},
      loading: false
    }
  },
  methods: {
    consume: function () {
      this.$router.replace({name: 'user_consume', params: {id: window.card.id}})
    }
  }
}
</script>