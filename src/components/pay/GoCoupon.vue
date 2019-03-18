<template>
<div class="content">
	<div class="list-block">
		<ul>
			<li>
				<div class="item-content">
					<div class="item-inner">
						<div class="item-title label">¥</div>
						<div class="item-input">
							<input type="number" @keyup='change' v-model="money" placeholder="输入支付金额">
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="row">
				<ul>
					<li>
						<a @click='available' class="item-link item-content open-popup">
							<div class="item-inner">
								<div class="item-title">使用优惠劵</div>
                <div class="item-after">{{{title}}}</div>
							</div>
						</a>
					</li>
				</ul>
	</div>
	<div class="content-block-title">支付方式</div>
				<div class="list-block_list">
					<ul>
						<!-- <li>
							<div class="item-content">
								<div class="item-media"><i class="icon icon-form-name"></i>
		
									<div class="item-inner">
										<div class="item-title label">会员卡支付</div>
										<div class="item-input">
											<label class="label-checkbox item-content">
												<input type="radio" name="my-radio">
												<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
											</label>
										</div>
									</div>
								</div>
							</div>
						</li> -->
						<li>
							<div class="item-content">
								<div class="item-media"><i class="icon icon-form-namepay"></i>
									<div class="item-inner">
										<div class="item-title label">微信支付</div>
										<div class="item-input">
											<label class="label-checkbox item-content">
												<input type="radio" name="my-radio" checked>
												<div class="item-media"><i class="icon icon-form-checkbox"></i></div>
											</label>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div v-if='money - totalPayable > 0' class="row_j no-gutter">
					<div class="col-50">优惠劵</div>
					<div class="col-500">-¥<span>{{rebate}}</span></div>
				</div>
	<div class="row_db">
					<div class="col-20">待支付：¥<span>{{totalPayable}}</span></div>
					<div class="col-80">
						<a @click = 'pay'>确认支付</a>
					</div>
	</div>
</div>
<div class="popup popup-about">
  <div v-if='items.length > 0' class="content-coupon">
    <div class="tickets-list">
        <a v-for="item in items"  @click='choose(item.title,item.id)' class="close-popup">
          <div class="ticket" style="background-color:{{item.backgroundColor}}">
            <div class="ticket-content">
              <div class="ticket-logo">
                <span><img :src="item.logo" alt=""/></span>
              </div>
              <div class="ticket-detail">
                <p class="ticket-title">{{{item.title}}}</p>
                <span class="ticket-date">有效期至{{item.expiredAt.substring(0, 10)}}</span>
              </div>
            </div>
          </div>
        </a>
    </div>
  </div>
  <div v-else class="coupon-null">
    <img src="../../assets/img/t/empty.png" >
    <p>主人，没有可用的<br>优惠劵了哦~</p>
    <a class="button button-big button-fill button-success close-popup">返回</a>
  </div>
</div>
</template>
<style scoped>
	input::-webkit-input-placeholder {
		color:#cccccc;
		font-size: 0.8rem;
	}
	.content {
		font-family: 'Microsoft Yahei';
	}
	.list-block{
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		background: #009eff;
		margin: 0 auto;
		border-bottom: 1px dashed #90c9e7;
	}
	.list-block .item-inner{
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.list-block ul{
		width: 85%;
		margin: 0 auto;
		border-radius: 0.3rem;
	}
	.list-block ul:before{ opacity: 0;}
	.list-block ul:after{ opacity: 0;}
	.list-block .item-title.label{
		width: 13%;
		text-align: center;
		color: #009ffb;
		margin: 0px 0;
		font-size: 1.1rem;
		font-weight: bold;
	}
	.row{
		background: url("../../assets/img/t/paybj.png") no-repeat;
		background-size: 100% 100%;
		margin-left: -2%;
	}
	.row ul li{
		list-style-type: none;
	
		}
	.row .item-link .item-inner{
		background:url("../../assets/img/t/you.png") right no-repeat;
		color: #fff;
		background-size: 0.7rem;
		background-position: calc(100% - 1rem) center;
	}
	.content-block-title{
		background: #fff;
		border-bottom: 1px solid #e3e3e3;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		padding-left: 1rem;
		color: #999999;
		font-size: 1rem;
		margin: 0 auto;
	}
	.list-block_list{
		margin: 0rem 0;
		font-size: 0.85rem;
	}
	.list-block_list ul{
		background: #ffffff;
		list-style: none;
		padding: 0;
		margin: 0;
		position: relative;
	}
	.list-block_list ul li {
		position: relative;
		border-bottom: 1px solid #e3e3e3;
		padding-left: 0.75rem;
		padding-top: 0.6rem;
		min-height: 1.2rem;
		padding-bottom: 0.6rem;
		align-items: center;
	}
	.list-block_list .item-content{
	
	}
	.list-block_list .item-inner {
		padding-right: 0.75rem;
		position: relative;
		width: 100%;
		padding-top: 0.4rem;
		padding-bottom: 0.35rem;
		overflow: hidden;
		display: flex;
		align-items: center;
	}
	.list-block_list .item-media {
		height:1.2rem ;
		display: flex;
		-ms-flex: 0 0 auto;
		align-items: center;
		padding-top: 0.35rem;
		padding-bottom: 0.4rem;
	}
	.icon.icon-form-name {
		width: 1.45rem;
		height: 1.45rem;
		background: url("../../assets/img/t/members.png") center no-repeat;
		background-size: 100% auto;
	}
	.icon.icon-form-namepay {
		width: 1.45rem;
		height: 1.45rem;
		background: url("../../assets/img/t/wechatpay.png") center no-repeat;
		background-size: 100% auto;
	}
	.list-block_list .item-inner {
		padding-right: 0.75rem;
		position: relative;
		width: 100%;
		padding-top: 0.4rem;
		padding-bottom: 0.35rem;
		min-height: 2.2rem;
		overflow: hidden;
		display: flex;
		align-items: center;
	}
	.list-block_list .item-title.label {
		width: 35%;
		color: #666666;
		flex-shrink: 0;
		font-size: 0.8rem;
		padding-left: 4%;
		text-align: left;
		margin: 0px 0;
	}
	.list-block_list .item-input {
		width: 100%;
		padding-left: 57%;
		margin-top: -0.4rem;
		margin-bottom: -0.35rem;
		flex-shrink: 1;
	}
	.row_j{
		margin-top: 0.2rem;
		height: 2.5rem;
		background: #fff;
		line-height: 2.5rem;
		border-bottom: 1px solid #e3e3e3;
		border-top: 1px solid #e3e3e3;
	}
	.row_j.no-gutter .col-50 {
		width: 50%;
		margin: 0;
		padding-left: 4%;
		color: #656565;
		text-align: left;
		float: left;
	}
	.row_j.no-gutter .col-500 {
		width: 50%;
		margin: 0;
		color: #656565;
		padding-right: 4%;
		text-align: right;
		float: right;
	}
	.row_j.no-gutter .col-500 span{color: #fe3434;}
	.row_db{
		position: fixed;
		bottom: 0;
		z-index: 100;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		height: 2.8rem;
		font-size: 0.8rem;
		line-height: 56px;
		box-shadow: 0 -1px 2px rgba(0,0,0,.1);
		border-top: 1px solid #cecece;
		background: #fff;
	}
	.row_db .col-20 {
		width: 50%;
		font-size: 0.9rem;
		margin: 0;
		color: #989898;
		text-align: left;
		padding-left: 4%;
		float: left;
	}
	.row_db .col-20 span{color: #fe3434;}
	.row_db .col-80 {
		width: 40%;
		margin: 0;
		float: right;
	}
	.col-80 a{
		width: 100%;
		min-height: 3rem;
		color: #fff;
		background: #009eff;
		display: block;
		font-size: 1rem;
		font-weight: bold;
		text-align: center;
		line-height: 2.6rem;
	}
	label.label-checkbox i.icon-form-checkbox:after{
		content: ' ';
		position: absolute;
		left: 50%;
		margin-left: -0.35rem;
		top: 50%;
	
		margin-top: -0.35rem;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 15rem;
	}
</style>
<style scoped type="text/css">
  div.coupon-null{
    text-align: center;
    margin-top: 5rem;
  }
  .coupon-null img{
    width: 7rem;
  }
  .coupon-null a{
    width: 90%;
    margin:  0 auto;
  }
  .coupon-null p{
      font-family: Microsoft Yahei;
      text-align: center;
  }

  .tickets-list{
      width: 95%;
      margin: 0 auto;
      padding-bottom: 0.7rem;
  }
  .tickets-list a{
    display: block;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }
  .ticket{
    background: url(../../assets/img/t/coupons.png) no-repeat;
    background-size: 100% 103%;
    color: #fff;
    width: 95%;
    margin: 0 auto;
    height: 5.9rem;
  }
  .content-coupon{
      background-color: #fff;
      height: 100%;
      width: 100%;
      overflow: auto;
  }
  .ticket-logo{
      width: 27.4%;
      height: 100%;
      text-align: center;
      float: left;
      display: table;
      margin-top: 1.2rem;
  }
  .ticket-detail{
      width: 72.6%;
      height: 100%;
      float: left;
      position: relative;
  }
  .ticket-logo span{
      display: table-cell;
      vertical-align: middle;
      border-right: 1px #B1AFAF dashed;
  }
  .ticket-logo img{
      width: 3.0rem;
      height: 3.0rem;
      border-radius: 50%;
  }
  .ticket-detail>span{
      float: right;
      margin-right: 0.25rem;
      font-size: 14px;
      padding-top: 1px;
      padding-right: 6px;
      position: absolute;
      right: 0px;
  }
  .ticket-detail .ticket-title{
      font-size: 1.0rem;
      padding-left: 1.5rem;
      margin: 0;
      line-height: 5.5rem;
  }
  .ticket-detail .ticket-title .num{
      font-size: 2.1rem;
  }
  .ticket{
      border-top-left-radius:10px;
      border-bottom-left-radius:10px;
      overflow: hidden;
      position: relative;
    }
  .ticket:before,.ticket:after{
    display: block;
    content: '';
    position: absolute;
    background-color: #fff;
    width: 1.2em;
    height: 0.6em;    
    top: 0em;
    left: 4.05rem;
  }
  .ticket:before{
    border-bottom-left-radius:0.6em;
    border-bottom-right-radius:0.6em;
  }
  .ticket:after{
    border-top-left-radius:0.6em;
    border-top-right-radius:0.6em;
    top: 6.4em;
  }
  .ticket-detail .ticket-date{
      bottom: 0.1rem;
    }
    .ticket-detail .ticket-share{
      top: 0.1rem;
    }

  @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio:2){
      .ticket-logo{
        width: 31.4%;
      }
      .ticket-detail{
        width: 68.6%;
      }
  }
</style>
<script type="text/javascript">
import $ from 'zepto'
import wx from 'wx'
export default {
  ready () {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      document.title = '付款'
    } else if (isiOS) {
      var $body = $('body')
      document.title = '付款'
      var $iframe = $('<iframe src="/favicon.ico"></iframe>')
      $iframe.on('load', function () {
        window.setTimeout(function () {
          $iframe.off('load').remove()
        }, 0)
      }).appendTo($body)
    }
  },
  data: {
    'show': '',
    'money': '',
    'coupon': ''
  },
  methods: {
    change: function () {
      this.$set('totalPayable', this.money)
    },
    available: function () {
      if (this.money) {
        this.$http.get('/api/merchants/' + this.$route.query.merchant + '/users/0/coupons.json?store=' + this.$route.query.store + '&money=' + this.money).then(function (response) {
          this.$set('items', response.data)
          if (this.items === 0) {
            this.show = false
          }
        })
      }
    },
    pay: function () {
      // var that = this
      var data = {
        money: this.money.toString(),
        url: encodeURIComponent(window.location.href),
        coupon: this.couponsID
      }
      this.$http.post('/api/merchants/' + this.$route.query.merchant + '/stores/' + this.$route.query.store + '/pays/wechats', data).then(
        function (response) {
          wx.config({
            debug: false,
            appId: response.data.config.appId,
            timestamp: response.data.config.timestamp,
            nonceStr: response.data.config.nonceStr,
            signature: response.data.config.signature,
            jsApiList: ['chooseWXPay']
          })
          wx.chooseWXPay({
            timestamp: response.data.preOrder.timestamp,
            nonceStr: response.data.preOrder.nonceStr,
            package: response.data.preOrder.package,
            signType: response.data.preOrder.signType,
            paySign: response.data.preOrder.paySign,
            success: function (res) {
              if (response.data.merchantUserId <= 0) {
                wx.closeWindow()
              } else {
                window.location.href = '/w/' + response.data.merchantId + '/#!/coupon'
              }
            }
          })
          wx.error(function (res) {
            $.alert('微信接口出现错误:' + res.errMsg)
          })
        })
    },
    choose: function (title, id) {
      this.$set('title', title)
      this.$set('couponsID', id)
      this.$http.get('/api/merchants/' + this.$route.query.merchant + '/stores/' + this.$route.query.store + '/pay/preview', {money: this.money, coupon: id}).then(function (response) {
        this.money = response.data.money
        this.$set('rebate', response.data.rebate)
        this.totalPayable = response.data.totalPayable
      })
    }
  }
}
</script>