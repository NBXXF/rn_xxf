/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */
import {XFClient} from "./XFClient";
import {Interceptor} from "./Interceptor";


export class XFClientBuilder {
    public baseUrl: string;
    //public interceptor: Interceptor;
    public headers: Map<string, any> = new Map<string, any>();
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
    header(key: string, value: any): XFClientBuilder {
        this.headers.set(key, value);
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