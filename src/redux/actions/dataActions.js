import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM } from '../types'
import screamService from '../../services/screams'

export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA })
  try {
    const results = await screamService.getAll()
    dispatch({
      type: SET_SCREAMS,
      payload: results
    })
  } catch (error) {
    dispatch({
      type: SET_SCREAMS,
      payload: []
    })
  }
}

export const likeScream = screamId => async dispatch => {
  try {
    const results = await screamService.likeScream(screamId)
    dispatch({
      type: LIKE_SCREAM,
      payload: results
    })
  } catch (error) {
    console.log(error)
  }
}

export const unlikeScream = screamId => async dispatch => {
  try {
    const results = await screamService.unlikeScream(screamId)
    dispatch({
      type: UNLIKE_SCREAM,
      payload: results
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteScream = screamId => async dispatch => {
  try {
    await screamService.deleteScream(screamId)
    dispatch({
      type: DELETE_SCREAM,
      payload: screamId
    })
  } catch (error) {
    console.log(error)
  }
}