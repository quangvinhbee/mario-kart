import customAxios from '@/configs/axios.config'
import { AxiosRequestConfig } from 'axios'

const PromotionBannerApi = {
  getBanners: async (options: object = {}, config: AxiosRequestConfig = {}) => {
    config.params = options
    const res = await customAxios.get('/api/promote-banner/get-all', config)
    return res.data
  },
}

export default PromotionBannerApi
