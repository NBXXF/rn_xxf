/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import * as Rx from 'rxjs';

export type Interceptor<T, R> = HttpInterceptor<T, R>;

export interface HttpInterceptor<T, R> {

    /**
     * 请求拦截
     * @param {string} requestMethod
     * @param {string} requestUrl
     * @param requestBody
     * @param {Object} requestHeaders
     * @param {Observable<T>} call
     * @returns {Observable<R>}
     */
    intercept: (requestMethod: string, requestUrl: string, requestBody: any, requestHeaders: Object, call: Rx.Observable<T>) => Rx.Observable<R>;
}