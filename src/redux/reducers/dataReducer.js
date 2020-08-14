import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM } from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const updatedScream = { ...action.payload }
      const updatedScreams = state.screams.map(scream => {
        if (scream.screamId === action.payload.screamId) {
          return updatedScream
        }
        return scream
      })
      return { ...state, scream: updatedScream, screams: updatedScreams }
    case DELETE_SCREAM:
      return { 
        ...state, 
        screams: state.screams.filter(scream => scream.screamId !== action.payload)
      }
    default:
      return state
  }
}

export default dataReducer