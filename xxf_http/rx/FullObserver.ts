/*
/!**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 *!/
import {CompletionObserver} from "rxjs/index";

export type Fob<T> = FullObserver<T>;

export class FullObserver<T> implements CompletionObserver<T> {
    start?: () => void;
    closed?: boolean;
    next?: (value: T) => void;
    error?: (err: any) => void;
    complete: () => void;
}*/
