/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import * as Rx from 'rxjs';

export type Interceptor<T, R> = HttpInterceptor<T, R>;

/**
 * 拦击请求
 */
export interface HttpInterceptor<T, R> {
    /**
     * 拦截
     * @param {string} method
     * @param {string} url
     * @param body
     * @param {Object} headers
     * @param {Observable<T>} call
     * @returns {Observable<R>}
     */
    intercept: (method: string, url: string, body: any, headers: Object, call: Rx.Observable<T>) => Rx.Observable<R>;
}