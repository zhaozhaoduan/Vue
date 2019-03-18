<template>
	<div class="password-set">
        <form action="">
            <label >创建新密码：<input type="password" placeholder="请输入6位数字密码"  pattern="[0-9]*" class="modal-text-input" v-model='newPassword' /></label>
            <label >&nbsp;&nbsp;&nbsp;确认密码：<input type="password" placeholder="请再次输入6位数字密码" pattern="[0-9]*" class="modal-text-input" v-model='repeatPassword' /></label>
            <div class="row">
                <div class="col-50" @click='confirm' ><a class="button button-big button-fill button-ok">确认</a></div>
                <div class="col-50"><a v-link="{name: 'user', params: {id: cashCardId}}" class="button button-big button-fill button-no">取消</a></div>
            </div>
        </form>
</div>
</template>
<style scoped type="text/css">
    .password-set input.modal-text-input{
    display: inline-block;
    width: 65%;
    }
    .password-set{
        margin: 5px 20px;
    }
    .password-set label{
        display: block;
    }
    .password-set .row .col-50{
        background-color: #EFEFEF;
    }
    .password-set .row .col-50 a{
        text-align: center;
        padding: 0;
    }
    .button.button-fill.button-ok{
        background-color: #0FC1A9;
    }
    .button.button-fill.button-no{
        background-color: #EFEFEF;
        color: #0FC1A9;
        border: 1px solid #0FC1A9;
    }
    .password-set .row .col-50{
        text-align: center;
        height: 6rem;
        margin-top: 3.5rem;
        border-radius: 6px;
        margin-bottom: 2%;
        margin-left: 2%;
        width: 48%;
    }
</style>
<script>
import $ from 'zepto'
$(function () {
  $('input').focus(function () {
    $(this).attr('type', 'password')
  })
})
export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '密码重置'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '密码重置'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
  },
  data: {
    newPassword: '',
    repeatPassword: '',
    cashCardId: window.user.cashCardId
  },
  methods: {
    confirm: function () {
      var password = {
        password: this.newPassword
      }
      if (this.newPassword === this.repeatPassword) {
        this.$http.patch('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/cards/' + window.user.cashCardId + '/password', password).then(function () {
          this.$router.go({name: 'user', params: {id: window.user.cashCardId}})
        }, function (response) {
          $.alert(response.status)
          if (response.status === 400) {
            $.alert('修改失败')
            this.newPassword = ''
            this.repeatPassword = ''
          } else {
            $.alert('修改成功', function () {
              this.$router.replace({name: 'user', params: {id: window.user.cashCardId}})
            })
          }
        })
      } else {
        $.alert('两次密码输入不一致，请重新输入！')
        this.newPassword = ''
        this.repeatPassword = ''
      }
    }
  }
}
</script>