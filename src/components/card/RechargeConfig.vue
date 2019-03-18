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
                                  <input type="text" required  placeholder="姓名" v-model='user.realName' />
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
                                  <select v-model="user.gender" required>
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
                                  <input type="date" required placeholder="生日" v-model='user.birthday'  />
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
                                  <input type="tel" required v-model="user.mobile"  placeholder="电话"  />
                              </div>
                          </div>
                      </li>
                  </ul>
                  <p class="content-block">
                      <button  class="button button-big button-fill button-ok" @click='save'>下一步</button>
                      <!-- <a class="button button-big button-fill button-ok" @click='submit'>下一步</a> -->
                  </p>
              </div>
            </div>
    </div>
</template>
<style scoped type="text/css">
	.page{
      color: #000;
      background-color: #EFEFEF;
      border-top: 1px solid #0FC1A9;
      font-family: "Microsoft YaHei";
      display: block;
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
	.list-block{
	margin: 0;
	margin-top: 3px;
  }
  button{
    width: 100%;
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
      document.title = '补全个人信息'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '补全个人信息'
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
      service: {},
      loading: false
    }
  },
  methods: {
    save: function () {
      console.log(this.user.mobile)
      var that = this
      if (this.user.mobile === undefined || this.user.mobile === '' || this.user.gender === undefined ||
        this.user.gender === '' || this.user.birthday === undefined || this.user.birthday === '' ||
        this.user.realName === undefined || this.user.realName === '') {
        $.alert('亲，请补全个人资料')
      } else {
        console.log('请补全个人')
        var prefile = {
          merchant_user: {
            realName: this.user.realName,
            gender: this.user.gender,
            birthday: this.user.birthday,
            mobile: this.user.mobile
          }
        }
        this.$http.put('/api/merchants/' + window.user.merchantId + '/users/' + window.user.id + '/profile', prefile).then(
          function (response) {
            that.$router.replace({name: 'card_recharge', params: {id: that.userCardId}})
          }, function (response) {
          $.alert(response.data.error.message)
        })
      }
    }
  }
}
</script>