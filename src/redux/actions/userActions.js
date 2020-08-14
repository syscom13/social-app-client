import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED } from '../types'
import axios from 'axios'
import loginService from '../../services/login'
import signupService from '../../services/signup'
import userService from '../../services/user'

const authenticateUserWith = async (userService, credentials, dispatch, history) => {
  dispatch({ type: LOADING_UI })
  try {
    const returnedToken = await userService(credentials)
    const FBToken = `Bearer ${returnedToken.token}`
    window.localStorage.setItem('FBToken', FBToken)
    axios.defaults.headers.common['Authorization'] = FBToken
    dispatch(getUserData())
    dispatch({ type: CLEAR_ERRORS })
    history.push('/')
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
}

export const loginUser = (credentials, history) => dispatch => {
  authenticateUserWith( loginService.login, credentials, dispatch, history)
}

export const signupUser = (credentials, history) => dispatch => {
  authenticateUserWith( signupService.signup, credentials, dispatch, history)
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER })
  try {
    const userData = await userService.getUser()
    dispatch({
      type: SET_USER,
      payload: userData
    })
  } catch (error) {
    console.log(error)
  }
}

export const uploadImage = formData => async dispatch => {
  dispatch({ type: LOADING_USER })
  try {
    await userService.uploadImage(formData)
    dispatch(getUserData())
  } catch (error) {
    console.log(error)
  }
}

export const editUserDetails = userDetails => async dispatch => {
  dispatch({ type: LOADING_USER })
  try {
    await userService.editDetails(userDetails)
    dispatch(getUserData())
  } catch (error) {
    console.log(error)
  }
}