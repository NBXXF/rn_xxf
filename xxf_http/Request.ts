/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import {AjaxRequest} from "rxjs/internal/observable/dom/AjaxObservable";
import {Subscriber} from "rxjs/index";

export class Request implements AjaxRequest {

    url?: string;
    body?: any;
    user?: string;
    async?: boolean;
    method?: string;
    headers?: Object;
    timeout?: number;
    password?: string;
    hasContent?: boolean;
    crossDomain?: boolean;
    withCredentials?: boolean;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: Subscriber<any>;
    responseType?: string;

}