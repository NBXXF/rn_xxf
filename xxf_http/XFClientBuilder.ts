/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */
import {XFClient} from "./XFClient";
import {Interceptor} from "./Interceptor";


export class XFClientBuilder {
    public baseUrl: string;
    //public interceptor: Interceptor;
    /**
     *  //默认json转换
     * @type {{Content-Type: string}}
     */
    public headers: Object = {'Content-Type': 'application/json;charset=utf-8'};
    /**
     * 默认5s
     * @type {number}
     */
    public connectTimeout: number = 5000;

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * 添加拦截器
     * @param {Interceptor} interceptor
     * @returns {XFClientBuilder}
     */
    addInterceptor(interceptor: Interceptor): XFClientBuilder {
        // this.interceptor = interceptor;
        return this;
    }

    /**
     * 添加header
     * @param {string} key
     * @param value
     * @returns {XFClientBuilder}
     */
    header(header: Object): XFClientBuilder {
        if (header) {
            this.headers = Object.assign(this.headers, header);
        }
        return this;
    }

    /**
     * 链接超时
     * @param {number} time
     * @returns {XFClientBuilder}
     */
    connectTimeOut(time: number): XFClientBuilder {
        this.connectTimeout = time;
        return this;
    }

    build(): XFClient {
        return new XFClient(this);
    }
}