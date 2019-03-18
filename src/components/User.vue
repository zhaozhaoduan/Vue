<template>
	<div class="page center" >
        <div class="content native-scroll" >
            <div class="list-block">
                <ul>
                    <li><a v-link="{ name: 'user_profile', params:{merchantId: merchantId, id: cashCardId} }" class="item-link item-content">
                        <div class="item-media">
                            <i class="list-style"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">
                                修改个人资料
                            </div>
                        </div>
                    </a></li>
                    <li><a v-link="{ name: 'user_consume', params:{merchantId: merchantId, id: cashCardId} }" class="item-link item-content">
                        <div class="item-media">
                            <i class="list-style"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">
                                消费记录查询
                            </div>
                        </div>
                    </a></li>
                   <!--  <li><a v-link="{ name: 'user_password', params:{merchantId: merchantId, id: cashCardId} }" class="item-link item-content">
                        <div class="item-media">
                            <i class="list-style"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">
                                支付密码管理
                            </div>
                        </div>
                    </a></li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped type="text/css">
    .page{
        color: #000;
        border-top: 1px solid #0FC1A9;
        font-family: "Microsoft YaHei";
        display: block;
    }
    .list-block{
    	margin: 0;
    	margin-top: 3px;
    }
    .list-style{
    	display: inline-block;
    	width: 8px;
    	height: 8px;
    	border-radius: 4px;
    	background-color: #0FC1A9;
    }
    .label-switch input[type=checkbox]:checked+.checkbox{
    	background-color: #1CC4AD;
    }
    .list-block ul:before,.list-block ul:after{
    	background-color: #ccc;
    }
    .list-block .item-text{
    	height: 21px;
    }
    .item-after span,.pay .item-title span{
    	color: #FF7E21;
    }
    a{
    	color: #000;
    }
    .list-block .item-subtitle,.list-block .item-text{
    	font-size: 0.85rem;
    }
    .consume_list .list-style{
    	margin-bottom: 3px;
    	vertical-align: initial;
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
      document.title = '我的'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '我的'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$set('merchantId', window.user.merchantId)
    this.$set('cashCardId', window.user.cashCardId)
  }
}
</script>
