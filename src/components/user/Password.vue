<template>
	<div class="page">
        <div class="content native-scroll">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">支付密码</div>
                                <div class="item-after">
                                    <div class="item-input">
                                        <label class="label-switch switch">
                                            <input v-if='password' type="checkbox" class="checkbox-input" checked />
                                            <input v-else type="checkbox" class="checkbox-input" />
                                            <div class="checkbox" @click="openPanel" ></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="reset-password" v-show='password'>
                      <a v-link="{ name: 'user_password_reset', params:{id: cashCardId} }" class="item-link item-content">
                        <div class="item-inner">
                            <div class="item-title">
                                修改支付密码
                            </div>
                        </div>
                      </a>
                    </li>
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
  .label-switch input[type=checkbox]:checked+.checkbox{
      background-color: #1CC4AD;
  }
</style>
<script>
import $ from 'zepto'

export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '密码设置'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '密码设置'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$set('cashCardId', window.user.cashCardId)
    this.$http.get('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId).then(function (response) {
      if (response.isPassword === false) {
        this.password = false
        console.log('false')
      } else {
        this.password = true
        console.log('true')
      }
    })
  },
  methods: {
    openPanel () {
      if ($('.checkbox-input').is(':checked')) {
        $('.reset-password').css('display', 'none')
      } else {
        $('.reset-password').css('display', 'block')
      }
      console.log($('.checkbox-input').is(':checked'))
    }
  }
}
</script>