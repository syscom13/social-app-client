import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types'

const initialState = {
  loading: false,
  errors: null
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_UI:
      return { ...state, loading: true }
    case SET_ERRORS:
      return { ...state, errors: action.payload, loading: false }
    case CLEAR_ERRORS:
      return { ...state, errors: null, loading: false }
    default:
      return state
  }
}

export default uiReducer