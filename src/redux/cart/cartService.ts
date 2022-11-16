import axiosClient from "../../helpers/axiosClient";
import { DataResponseModel } from "../../models";

const cartService = {
  checkOut(data: any): Promise<DataResponseModel<any>> {
    return axiosClient.post(`/carts/add`, data);
  },
};

export default cartService;
