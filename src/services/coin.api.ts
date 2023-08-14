import customAxios from '@/configs/axios.config'
import { AxiosRequestConfig } from 'axios'

interface IFilterCoin {
  search?: string
  chainId?: number
  listingType?: 'coin' | 'presale'
  filter?: boolean
  approved?: boolean
  promoted?: boolean
  sortBy?: string
  sortDirection?: 'desc' | 'asc' | 'DESC' | 'ASC'
  page?: number
  pageSize?: number
}

const CoinApi = {
  getCoins: async (options: IFilterCoin = {}, config: AxiosRequestConfig = {}) => {
    const defaultOption: IFilterCoin = {
      approved: true,
    }
    config.params = Object.assign(defaultOption, options)
    const res = await customAxios.get('/api/coins/get-all', config)
    return res.data
  },
  createCoin: async (body: object = {}, config: AxiosRequestConfig = {}) => {
    const res = await customAxios.post('/api/coins/create', body, config)
    return res.data
  },
  getCoinBySlug: async (slug: string, config: AxiosRequestConfig = {}) => {
    config.params = { slug }
    const res = await customAxios.get(`/api/coins/detail`, config)
    return res.data
  },
  approveCoinBySlug: async (slug: string, config: AxiosRequestConfig = {}) => {
    const res = await customAxios.post(`/api/coins/approval`, { slug }, config)
    return res.data
  },
  upvoteCoinBySlug: async (body: object = {}, config: AxiosRequestConfig = {}) => {
    const res = await customAxios.post(`/api/coins/vote`, body, config)
    return res.data
  },
  checkCoinExist: async (body: object = {}, config: AxiosRequestConfig = {}) => {
    const res = await customAxios.post(`/api/coins/check`, body, config)
    return res.data
  },
}

export default CoinApi
