/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 网络客户端
 */
import {XFClientBuilder} from "./XFClientBuilder";
import {AjaxObservable, AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";
import {Observable} from "rxjs/index";
import XFUtils from "./utils/XFUtils";
import {mergeMap, tap, catchError, map} from "rxjs/internal/operators";
import {HttpException} from "../xxf_base/exceptions/HttpException";
import *as Rx from 'rxjs';
import {AjaxError} from "rxjs/internal/observable/dom/AjaxObservable";
import {NetUtils} from "../xxf_utils/NetUtils";
import {ResponseBody} from "./models/ResponseBody";

/*
 * @param {AjaxResponse} x
 * @param {number} index
 * @returns {any}
 */
export class XFClient {
    protected builder: XFClientBuilder;

    constructor(builder: XFClientBuilder) {
        this.builder = builder;
    }

    protected getDefaultObservable<T>(method: string, url: string, body?: any, headers?: Object): Observable<T> {
        let newHeaders: object = {};
        //先拷贝全局的header
        let globalHeaders: Array<object> = this.builder.getHeaders();
        if (globalHeaders) {
            for (let h of globalHeaders) {
                Object.assign(newHeaders, h);
            }
        }
        if (headers) {
            Object.assign(newHeaders, headers);
        }
        let call: Observable<T> = new AjaxObservable<AjaxResponse>(
            {
                method: method,
                url: url,
                body: body,
                headers: newHeaders,
                timeout: this.builder.getConnectTimeout()
            })
            .pipe(
                tap((next: AjaxResponse) => {
                    if (next.status == 200 && "json" == next.responseType) {
                        this.builder.getCache()
                            .setCache(next.request, next.response);
                    }
                }))
            .pipe(
                catchError((httpErr: any, httpCaught: Observable<AjaxResponse>) => {
                    if (httpErr instanceof AjaxError) {
                        let ae: AjaxError = httpErr as AjaxError;

                        return NetUtils.isConnected()
                            .pipe(
                                catchError(((err: any, caught: Observable<boolean>) => {
                                    return Rx.throwError(httpErr);
                                }))
                            )
                            .pipe(
                                mergeMap((isConnected: boolean) => {
                                    if (!isConnected) {
                                        return this.builder.getCache()
                                            .getCache(ae.request)
                                            .pipe(
                                                mergeMap((jsonStr: string) => {
                                                    let body: ResponseBody = JSON.parse(jsonStr);
                                                    body.isFromCache = true;
                                                    //输出200的返回reponse
                                                    let cacheResponse: object = {
                                                        status: 200,
                                                        xhr: ae.xhr,
                                                        request: ae.request,
                                                        response: body,
                                                        responseType: 'json'
                                                    };
                                                    let result: AjaxResponse = cacheResponse as AjaxResponse;
                                                    return Rx.of(result);
                                                }))
                                            .pipe(
                                                catchError((err: any, caught: Observable<AjaxResponse>) => {
                                                    return Rx.throwError(httpErr);
                                                }));
                                    }
                                    return Rx.throwError(httpErr);
                                }));
                    }
                    return Rx.throwError(httpErr);
                }))
            .pipe(
                mergeMap((res: AjaxResponse) => {
                    if (res.status != 200) {
                        let message: string = '';
                        try {
                            message = JSON.stringify(res);
                        } catch (error) {
                        }
                        return Rx.throwError(new HttpException(res.status, message));
                    }
                    return Rx.of(res.response);
                })
            );
        return this.builder.getInterceptor() ? this.builder.getInterceptor().intercept(call) : call;
    }

    /**
     *
     * @param {string} path 子路径
     * @param {Object} param 参数,对象类型
     * @param {Object} headers//
     * @returns {Observable<T>}
     */
    public get<T>(path: string, param?: Map<string, any>, headers?: Object): Observable<T> {
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
    public post<T>(path: string, body?: any, headers?: Object): Observable<T> {
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
    public delete<T>(path: string, param?: Map<string, any>, headers?: Object): Observable<T> {
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
    public put<T>(path: string, body?: any, headers?: Object): Observable<T> {
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
    public patch<T>(path: string, body?: any, headers?: Object): Observable<T> {
        let url: string = XFUtils.getMergeUrl(this.builder.baseUrl, path);
        return this.getDefaultObservable('PATCH', url, body, headers);
    }
}