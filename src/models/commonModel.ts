
export interface ListResponseModel<T> {
  message?: string;
  error?: number;
  data?: T[];
}

export interface DataResponseModel<T> {
  message?: string;
  error?: number;
  data?: T;
}
