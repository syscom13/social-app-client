import axios from 'axios'

const baseUrl = '/screams'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const likeScream = async screamId => {
  const response = await axios.post(`${baseUrl}/${screamId}/like`)
  return response.data
}

const unlikeScream = async screamId => {
  const response = await axios.post(`${baseUrl}/${screamId}/unlike`)
  return response.data
}

const deleteScream = async screamId => {
  const response = await axios.delete(`${baseUrl}/${screamId}`)
  return response.data
}

export default { getAll, likeScream, unlikeScream, deleteScream }