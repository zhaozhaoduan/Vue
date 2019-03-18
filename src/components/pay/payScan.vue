<script type="text/javascript">
export default {
  ready () {
    var redirectUrl = '/oauth/' + window.user.merchantId + '/pay?url=' +
        encodeURIComponent('pay/go/coupon?store=' + this.$route.query.store + '&merchant=' + window.user.merchantId)
    window.location.href = redirectUrl
  }
}
</script>