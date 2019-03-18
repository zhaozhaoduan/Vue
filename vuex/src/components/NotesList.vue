<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>Notes | coligo</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'all'"
            :class="{active: show === 'all'}">
            All Notes
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'favorites'"
            :class="{active: show === 'favorites'}">
            Favorites
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="(note, index) in filteredNotes" :key="index"
          class="list-group-item" href="#"
          :class="{active: activeNote === note}"
          @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            {{note.text.trim().substring(0, 30)}}
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
// import { vuex } from 'Vuex'

export default {
  created(){
    console.log(this.$store._actions.updateActiveNote)
  },
  data () {
    return {
      show: 'all'
    }
  },
  methods:{
    updateActiveNote (e){
      this.$store.dispatch('updateActiveNote', e)
    }
  },
  /* vuex: {
    getters: {
      notes: state => state.notes,
      activeNote: state => state.activeNote
    },
    actions: {
      updateActiveNote: this.store._actions.updateActiveNote
    }
  }, */
  computed: {
    notes () {
      return this.$store.state.notes
    },
    activeNote () {
      return this.$store.getters.activeNote
    },
    filteredNotes () {
      console.log('helllo')
      if (this.show === 'all'){
        return this.notes
      } else if (this.show === 'favorites') {
        console.log('helllo')
        return this.notes.filter(note => note.favorite)
      }
    }
  }
}
</script>
