import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from './mutations'
import {actions} from './actions'

Vue.use(Vuex)

console.log(mutations)

export default new Vuex.Store({
    state: {
        notes: [],
        activeNote: {}
    },
    getters: {
        activeNoteText: (state) => {
            return state.activeNote.text
        },
        activeNote: (state) => {
            return state.activeNote
        }
    },
    mutations,
    actions
})