import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
    notes: [],
    activeNote: {}
}

const mutations = {
    Add_NOTE(state)  {
        const newNote = {
            text: 'New Note',
            favorite: false
        };
        state.notes.push(newNote)
        state.activeNode = newNote
    },

    EDIT_NOTE (state, text) {
        state.activeNode.text = text
    },

    DELETE_NOTE (state) {
        state.notes.$remove(state.activeNode)
        state.activeNode = state.notes[0]
    },

    TOGGLE_FAVORITE (state) {
        state.activeNode.favorite = !state.activeNode.favorite
    },

    SET_ACTIVE_NOTE (state, note) {
        state.activeNode = state.note
    }

}

export default new Vuex.Store({
    state,
    mutations
})