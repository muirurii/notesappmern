const StateReducer = (state, action) => {
    switch (action.type) {
        case 'setLoading':
            {
                return {...state, loading: action.payload }
            }
        case 'setUser':
            {
                return {...state, user: action.payload }
            }
        case 'setNotes':
            {
                return {...state, notes: [...action.payload] }
            }
        case 'removeNote':
            {
                return {...state, notes: state.notes.filter(note => note._id !== action.payload) }
            }
        case 'updateLiked':
            {
                return {...state, notes: state.notes.map(note => note._id !== action.payload ? note : {...note, favorite: !note.favorite }) }
            }
        default:
            {
                return state
            }
    }
}

export default StateReducer;