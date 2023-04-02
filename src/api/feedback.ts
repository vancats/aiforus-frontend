import axios from '~/utils/axios'

export const searchFeedback = async (context: string) => {
  return await axios.post('/feedback/add', { context, type: 0, extra: '' })
}
