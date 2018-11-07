/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 有开始监听
 * @Company Beijing dsb
 */
import {AjaxObservable} from "rxjs/internal/observable/dom/AjaxObservable";
import {PartialObserver, Subscription} from "rxjs/index";
//import {FullObserver, Fob} from "./FullObserver";

export default class HttpObservable<T> extends AjaxObservable<T> {
    /*subscribe(observerOrNext?: FullObserver<T> | PartialObserver<T> | ((value: T) => void),
              error?: (error: any) => void,
              complete?: () => void): Subscription {
        if (observerOrNext instanceof FullObserver) {
            let fob: FullObserver<T> = observerOrNext as FullObserver<T>;
            if (fob) {
                fob.start();
            }
        }
        return super.subscribe(observerOrNext as (PartialObserver<T> | ((value: T) => void)) , error, complete);
    }*/
}