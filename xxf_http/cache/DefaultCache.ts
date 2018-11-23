/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 默认存储
 * @Company Beijing dsb
 */
import {Cache} from "./Cache";
import {AjaxRequest} from "rxjs/ajax";
import {Observable} from "rxjs";
import {StorageUtils} from "../../xxf_utils/StorageUtils"

export class DefaultCache implements Cache {
    getToken(request: AjaxRequest): string {
        return `${request.method}_${request.url}_${JSON.stringify(request.headers)}`;
    }

    setCache(request: AjaxRequest, response: any): void {
        StorageUtils
            .setItem(this.getToken(request), JSON.stringify(response))
            .subscribe(function (next: any) {

            });
    }

    getCache(request: AjaxRequest): Observable<string> {
        return StorageUtils.getItem(this.getToken(request));
    }

}