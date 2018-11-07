/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 网络客户端
 */
import {XFClientBuilder} from "./XFClientBuilder";
import {AjaxObservable, AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";
import {Observable} from "rxjs/index";
import XFUtils from "./utils/XFUtils";
import {map} from "rxjs/internal/operators";
import {HttpException} from "../xxf_base/exceptions/HttpException";

const mapResponse = (x: AjaxResponse, index: number) => {
    if (x.status != 200) {
        let message: string = '';
        try {
            message = JSON.stringify(x);
        } catch (error) {
        }
        throw new HttpException(x.status, message);
    }
    return x.response;
};

export class XFClient {
    private builder: XFClientBuilder;

    constructor(builder: XFClientBuilder) {
        this.builder = builder;
    }

    getDefaultObservable<T>(method: string, url: string, body?: any, headers?: Map<string, any>): Observable<T> {
        let headerMap: Map<string, any> = new Map<string, any>(this.builder.headers);
        if (headers) {
            for (let [key, value] of headers) {
                headerMap.set(key, value);
            }
        }
        return new AjaxObservable<AjaxResponse>(
            {
                method: method,
                url: url,
                body: body,
                headers: headerMap,
                timeout: this.builder.connectTimeout
            })
            .pipe(
                map(mapResponse)
            );
    }

    /**
     *
     * @param {string} path 子路径
     * @param {Object} param 参数,对象类型
     * @param {Object} headers//
     * @returns {Observable<T>}
     */
    public get<T>(path: string, param?: Map<string, any>, headers?: Map<string, any>): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        if (param) {
            url = XFUtils.getUrlWithParam(url, param);
        }
        return this.getDefaultObservable('GET', url, null, headers);
    }


    /**
     * post请求
     * @param {string} path
     * @param body
     * @param {Map<string, any>} headers
     * @returns {Observable<T>}
     */
    public post<T>(path: string, body?: any, headers?: Map<string, any>): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        return this.getDefaultObservable('POST', url, body, headers);
    }

    /**
     * 删除
     * @param {string} path
     * @param {Map<string, any>} param
     * @param {Map<string, any>} headers
     * @returns {Observable<T>}
     */
    public delete<T>(path: string, param?: Map<string, any>, headers?: Map<string, any>): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        if (param) {
            url = XFUtils.getUrlWithParam(url, param);
        }
        return this.getDefaultObservable('DELETE', url, null, headers);
    }

    /**
     * 更改
     * @param {string} path
     * @param body
     * @param {Map<string, any>} headers
     * @returns {Observable<T>}
     */
    public put<T>(path: string, body?: any, headers?: Map<string, any>): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        return this.getDefaultObservable('PUT', url, body, headers);
    }

    /**
     *
     * @param {string} path
     * @param body
     * @param {Map<string, any>} headers
     * @returns {Observable<T>}
     */
    public patch<T>(path: string, body?: any, headers?: Map<string, any>): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        return this.getDefaultObservable('PATCH', url, body, headers);
    }
}