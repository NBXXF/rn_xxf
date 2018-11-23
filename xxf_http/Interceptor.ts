/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import * as Rx from 'rxjs';

export type Interceptor<T, R> = HttpInterceptor<T, R>;

export interface HttpInterceptor<T, R> {

    /**
     * 拦截
     * @param {Observable<T>} call
     * @returns {Observable<R>}
     */
    intercept: (call: Rx.Observable<T>) => Rx.Observable<R>;
}