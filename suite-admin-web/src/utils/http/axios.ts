import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export class VAxios {

  private axiosInstance: AxiosInstance;

  constructor(axiosOptions: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosOptions);
    this.setupInterceptors();
  }
  /**
   * @description: 拦截器配置
   */
  private setupInterceptors () {

    // 添加请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log('添加请求拦截器')
      return config;
    });

    // 添加响应拦截器
    this.axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      console.log('添加响应拦截器')
      return config;
    });

  }

  /**
 * @description:   请求方法
 */
  request<T = any> (config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<T>>(config)
        .then((res: AxiosResponse<T>) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res);
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }
}
