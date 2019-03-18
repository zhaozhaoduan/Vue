<template>
  <div id="note-editor">
    <textarea
      :value="activeNoteText"
      @input="editNote"
      class="form-control">
    </textarea>
  </div>
</template>

<script>

export default {
    methods: {
      editNote (e) {
        this.$store.dispatch('editNote', e)
      } 
    },
    computed: {
      activeNoteText () {
         return this.$store.state.activeNote.text
      }
    }
  
}
</script>