import { API_ENDPOINT } from '@common/apiEndpoint'
import { axiosClient } from '@common/axiosClient'
import { DataResponseModel } from 'models/common'

const productService = {
    getProduct: async (query: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.INDEX}?${query}`).then(res => res.data)
    },
    getProductCategory: async (): Promise<DataResponseModel<any>> => {
        return axiosClient.get(API_ENDPOINT.CATEGORY).then(res => res.data)
    },
    getProductByCategory: async (catId: string): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.CATEGORY}/${catId}`).then(res => res.data)
    },
    getProductById: async (query: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.INDEX}?${query}`).then(res => res.data)
    },
    getNewProduct: async (query: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.NEW}?${query}`).then(res => res.data)
    },
    fetchComment: async (data: any): Promise<DataResponseModel<any>> => {
        return axiosClient.post(`${API_ENDPOINT.PRODUCT.COMMENT_PAGE}`, data).then(res => res.data)
    },
    fetchCommentRating: async (productId: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.COMMENT}/${productId}`).then(res => res.data)
    },
    fetchCategoryChild: async (categoryId: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.CATEGORY}/${categoryId}`).then(res => res.data)
    },
    searchProduct: async (query: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.CATEGORY}?${query}`).then(res => res.data)
    },
    getFacet: async (query: any): Promise<DataResponseModel<any>> => {
        return axiosClient.get(`${API_ENDPOINT.PRODUCT.FACET}?${query}`).then(res => res.data)
    },
}

export default productService
