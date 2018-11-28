/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */
import {XFClient} from "./XFClient";
import {Interceptor} from "./Interceptor";
import {Cache} from "./cache/Cache";
import {DefaultCache} from "./cache/DefaultCache";


export class XFClientBuilder {
    public baseUrl: string;
    //public interceptor: Interceptor;
    /**
     *  //默认json转换
     * @type {{Content-Type: string}}
     */
    private headerArrays: Array<object> = [{'Content-Type': 'application/json;charset=utf-8'}];
    /**
     * 拦截器
     * @type {Array}
     */
    private interceptor: any = null;
    /**
     * 默认5s
     * @type {number}
     */
    private connectTimeout: number = 5000;


    /**
     * 缓存
     * @type {DefaultCache}
     */
    private storageCache: Cache = new DefaultCache();

    /**
     * 获取超时时间
     * @returns {number}
     */
    public getConnectTimeout() {
        return this.connectTimeout;
    }

    /**
     * 获取cache
     * @returns {Cache}
     */
    public getCache(): Cache {
        return this.storageCache;
    }

    /**
     * 自定义cache
     * @param {Cache} cache
     */
    public cache(cache: Cache): XFClientBuilder {
        this.storageCache = cache;
        return this;
    }

    public constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    /**
     * 设置拦截器
     * @param {Interceptor} interceptor
     * @returns {XFClientBuilder}
     */
    setInterceptor(interceptor: Interceptor<any, any>): XFClientBuilder {
        this.interceptor = interceptor;
        return this;
    }

    /**
     * 设置拦截器
     * @param {Interceptor} interceptor
     * @returns {XFClientBuilder}
     */
    public getInterceptor(): Interceptor<any, any> {
        return this.interceptor;
    }

    /**
     * 添加header
     * @param {string} key
     * @param value
     * @returns {XFClientBuilder}
     */
    header(header: object): XFClientBuilder {
        if (header) {
            this.headerArrays.push(header);
        }
        return this;
    }

    /**
     * 获取请求头
     * @returns {Array<Object>}
     */
    public getHeaders(): Array<object> {
        return this.headerArrays;
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