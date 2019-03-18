<template>
  <div id="toolbar">
    <i  class="glyphicon glyphicon-plus" @click="addNote"></i>
    <i class="glyphicon glyphicon-star" @click="toggleFavorite"
     :class="{starred: activeNote.favorite}"></i>
    <i  class="glyphicon glyphicon-remove" @click="deleteNote"></i>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      store: this.$store
    }
  },
  methods:{
    addNote(){
      this.$store.dispatch('addNote')
    },
    deleteNote(){
      this.$store.dispatch('deleteNote')
    },
    toggleFavorite(){
      this.$store.dispatch('toggleFavorite')
    }
  },
  computed: {
    activeNote () {
      console.log(this.$store.getters.activeNote)
      return this.$store.getters.activeNote
    }
  }

}
</script>