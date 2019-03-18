<template>
	<div class="page">
        <div class="content native-scroll">
            <div class="list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-media">
                            <i class="icon icon-form-name"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title label">姓名:</div>
                            <div class="item-input">
                                <input type="text" v-model='user.realName'  placeholder="姓名" />
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-media">
                            <i class="icon icon-form-gender"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title label">性别:</div>
                            <div class="item-input">
                                <select v-model="user.gender">
                                    <option value='m'>先生</option>
                                    <option value='f'>女士</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-media">
                            <i class="icon icon-form-calendar"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title label">生日:</div>
                            <div class="item-input">
                                <input type="date"  v-model="user.birthday" placeholder="生日" />
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-media">
                            <i class="icon icon-form-phone"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title label">手机:</div>
                            <div class="item-input">
                                <input type="tel" v-model="user.mobile"  placeholder="电话"  />
                            </div>
                        </div>
                    </li>
                </ul>
                <p class="content-block">
                    <a @click='submit' v-link="{ name: 'user', params:{id: userCardId} }" class="button button-big button-fill button-ok">保存</a>
                </p>
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
    .page p{
        position: fixed;
        width: 100%;
        bottom: -1rem;
        font-weight: bold; 
    }
    .icon{
    width: 0.975rem;
    height: 0.975rem;
    }
    .icon.icon-form-name{
        background-image: url(../../assets/img/c/i-form-name.png);
        
    }
    .icon.icon-form-gender{
        background-image: url(../../assets/img/c/i-form-gender.png);
    }
    .icon.icon-form-calendar{
        background-image: url(../../assets/img/c/i-form-calendar.png);
    }
    .icon.icon-form-phone{
        background-image: url(../../assets/img/c/i-form-phone.png);
    }
    .button.button-fill.button-ok{
        background-color: #0FC1A9;
    }
</style>
<script type="text/javascript">
import $ from 'zepto'
export default {
  ready: function () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '个人资料'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '个人资料'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
    this.$set('userCardId', window.user.cashCardId)
    this.$set('user', window.user)
  },
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  methods: {
    submit: function () {
      var prefile = {
        merchant_user: {
          realName: this.user.realName,
          gender: this.user.gender,
          birthday: this.user.birthday,
          mobile: this.user.mobile
        }
      }
      console.log(this.profile)
      this.$http.put('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/profile', prefile).then(function () { console.log('put成功！') })
    }
  }
}
</script>