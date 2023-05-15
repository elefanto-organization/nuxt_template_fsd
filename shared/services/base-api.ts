import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export interface BaseApiImpl {
  changeHttp(http: AxiosInstance): void;
  post<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData>;
  get<TResponseData>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<TResponseData>;
  patch<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData>;
  put<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData>;
}
export class BaseApi implements BaseApiImpl {
  constructor(private http: AxiosInstance) {
    this.http = http;
  }

  changeHttp(passedHttp: AxiosInstance) {
    this.http = passedHttp;
  }

  async post<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData> {
    const response = await this.http.post<
      TResponseData,
      AxiosResponse<TResponseData, TData>,
      TData
    >(path, data, config);
    return response.data;
  }

  async get<TResponseData>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<TResponseData> {
    const response = await this.http.get<TResponseData>(path, config);
    return response.data;
  }

  async patch<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData> {
    const response = await this.http.patch<
      TResponseData,
      AxiosResponse<TResponseData, TData>,
      TData
    >(path, data, config);
    return response.data;
  }

  async put<TResponseData, TData>(
    path: string,
    data: TData,
    config?: AxiosRequestConfig<TData>
  ): Promise<TResponseData> {
    const response = await this.http.put<
      TResponseData,
      AxiosResponse<TResponseData, TData>,
      TData
    >(path, data, config);
    return response.data;
  }
}
