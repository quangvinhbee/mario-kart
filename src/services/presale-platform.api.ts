import customAxios from '@/configs/axios.config'
import { AxiosRequestConfig } from 'axios'

interface IFilterPresalePlatform {
  sortBy?: string
  sortDirection?: 'desc' | 'asc' | 'DESC' | 'ASC'
  page?: number
  pageSize?: number
}

const PresalePlatformApi = {
  getAll: async (options: IFilterPresalePlatform = {}, config: AxiosRequestConfig = {}) => {
    config.params = options
    const res = await customAxios.get('/api/presale-platform/get-all', config)
    return res.data
  },
  getDetailById: async (_id: string, config: AxiosRequestConfig = {}) => {
    config.params = { _id }
    const res = await customAxios.get('/api/presale-platform/detail', config)
    return res.data
  },
}

export default PresalePlatformApi
