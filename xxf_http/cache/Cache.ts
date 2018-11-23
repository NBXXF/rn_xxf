/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 缓存
 * @Company Beijing dsb
 */
import * as Rx from 'rxjs';
import {AjaxRequest} from 'rxjs/ajax';

export interface Cache {
    /**
     * 唯一token
     * @param {AjaxRequest} request
     * @returns {string}
     */
    getToken(request: AjaxRequest): string;

    /**
     * 存储
     * @param {AjaxRequest} request
     * @param response
     */
    setCache(request: AjaxRequest, response: any): void;

    /**
     * 获取
     * @param {AjaxRequest} request
     * @returns {Observable<string>}
     */
    getCache(request: AjaxRequest): Rx.Observable<string>;
}