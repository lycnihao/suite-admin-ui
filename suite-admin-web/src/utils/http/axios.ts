import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { useUserStoreWidthOut } from '/@/store/modules/user';
import { message as $message, Modal } from 'ant-design-vue';
import { checkStatus } from './checkStatus';

const authenticationScheme: string = 'Bearer';

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



    /**
     * @description: 添加请求拦截器
     */
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log('添加请求拦截器')
      // 在发送请求之前添加token
      const userStore = useUserStoreWidthOut();
      const token = userStore.getToken;
      if (token && config.headers) {
        // jwt token
        config.headers.Authorization = authenticationScheme ? `${authenticationScheme} ${token}` : token
      }
      return config;
    }, (error) => {
      // 对请求错误做些什么
      console.log(error)
    });

    /**
     * @description: 添加响应拦截器
     */
    this.axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      console.log('添加响应拦截器')
      return config;
    }, (error) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      $message.destroy()
      const { response, code, message } = error || {};
      const msg: string =
        response && response.data && response.data.message ? response.data.message : '';
      const err: string = error.toString();
      try {
        if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
          $message.error('接口请求超时，请刷新页面重试!');
          return;
        }
        if (err && err.includes('Network Error')) {
          Modal.confirm({
            title: '网络异常',
            content: '请检查您的网络连接是否正常',
            closable: false,
            maskClosable: false,
          });
          return Promise.reject(error);
        }
      } catch (error) {
        throw new Error(error as any);
      }
      // 请求是否被取消
      const isCancel = axios.isCancel(error);
      if (!isCancel) {
        checkStatus(error.response && error.response.status, msg);
      } else {
        console.warn(error, '请求被取消！');
      }
      //return Promise.reject(error);
      return Promise.reject(response?.data);
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
