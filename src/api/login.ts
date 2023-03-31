import axios from '~/utils/axios'

export const login = () => {
  return axios.get('/user/login')
}
