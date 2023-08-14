import customAxios from '@/configs/axios.config'
import { AxiosRequestConfig } from 'axios'

const ChainApi = {
  getChains: async (options: object = {}, config: AxiosRequestConfig = {}) => {
    config.params = options
    const res = await customAxios.get('/api/chains/get-all', config)
    return res.data
  },
}

export default ChainApi
