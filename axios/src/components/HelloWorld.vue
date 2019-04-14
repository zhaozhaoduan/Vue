<template>
  <div class="hello">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import http from '../http/index'
import api from '../http/api'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      let params = {}
      const res = await http.get(api.error, params)
      if (res.data.success) {
        alert('请求成功')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
