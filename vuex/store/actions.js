export const actions = {
        addNote: ({commit}) => {
            commit('ADD_NOTE')
        },
        editNote: ({commit}, e) => {
            commit('EDIT_NOTE', e.target.value)
        },
        deleteNote: ({commit}) => {
            commit('DELETE_NOTE')
        },
        updateActiveNote: ({commit}, note) => {
            commit('SET_ACTIVE_NOTE', note)
        },
        toggleFavorite: ({commit}) => {
            commit('TOGGLE_FAVORITE')
        }
    }