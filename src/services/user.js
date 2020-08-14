import axios from 'axios'

const baseUrl = '/user'

const getUser = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const uploadImage = async formData => {
  const response = await axios.post(`${baseUrl}/image`, formData)
  return response.data
}

const editDetails = async userDetails => {
  const response = await axios.post(baseUrl, userDetails)
  return response.data
}

export default { getUser, uploadImage, editDetails }