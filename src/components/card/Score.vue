<template>
	<div class="content" >
		<img src="../../assets/img/c/integral.png" alt=""/>
    	<p class="integral-title">我的积分</p>
    	<!-- <h1>总计：{{ data.score }}分</h1> -->
      <h1>总计：0分</h1>
	</div>
	
</template>
<style scoped type="text/css">
	.content{
    text-align: center;
    }
    .content>img{
        width: 6.5rem;
        margin-top: 5rem;
    }
    .content p{
        font-size: 1.3rem;
        font-family: Microsoft Yahei;
    }
    .content h1{
        font-size: 2.2rem;
        font-family: Microsoft Yahei;
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
      document.title = '积分'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '积分'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/0/cards/' + window.user.cashCardId).then(function (response) {
      this.$set('data', response.data)
    })
  }
}
</script>