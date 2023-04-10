import axios, { FILE_URL } from '~/utils/axios'

export const uploadFile = async (formData: FormData) => {
  return await axios.post<{ url: string }>(FILE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res?.data)
}

export const getQRCode = async () => {
  return await axios.get<{ qrcodeUrl: string }>('/qrcode/community/query')
    .then(res => res?.data)
}
