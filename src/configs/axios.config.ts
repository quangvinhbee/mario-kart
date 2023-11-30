import axios from 'axios'
import store from '@/redux/store'
import Router from 'next/router'
import { toast } from 'react-hot-toast'

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
})

customAxios.interceptors.request.use(
  async (config: any) => {
    // const state = store.getState()
    // const authToken: any = state.auth.token
    // if (authToken) {
    //   config.headers['Authorization'] = 'Bearer ' + authToken
    // }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

customAxios.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    if (axios.isCancel(error)) {
    }
    const response = error?.response?.data
    if (response?.status == 401) {
      return Router.push('/login')
    }
    if (Array.isArray(response?.message) && response?.message?.length > 0) {
      toast.error(response?.message?.['0'])
    }
    throw error?.response?.data
  }
)
export default customAxios
