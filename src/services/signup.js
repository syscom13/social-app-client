import axios from 'axios'

const baseUrl = '/signup'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { signup }