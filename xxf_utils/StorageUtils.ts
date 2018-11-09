/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 由于它的操作是全局的，官方建议我们最好针对 AsyncStorage 进行一下抽象的封装再使用，而且不是直接拿 AsyncStorage 进行使用。
 * @Company Beijing dsb
 */
import {
    AsyncStorage,
} from 'react-native';
import * as Rx from 'rxjs';
import {map} from "rxjs/internal/operators";

/**
 * Rxjs访问方式
 */
export class StorageUtils {

    /**
     * 获取
     * @param {string} key
     * @returns {Observable}
     */
    public static getItem(key: string): Rx.Observable<string> {
        return Rx.from<string | null>(AsyncStorage.getItem(key))
            .pipe<string>(map((x) => {
                return String(x);
            }));
    }

    /**
     * 清除
     * @param {string} key
     * @returns {Promise<void>}
     */
    public static removeItem(key: string): Rx.Observable<void> {
        return Rx.from<void>(AsyncStorage.removeItem(key));
    }

    /**
     * 存储
     * @param {string} key
     * @param {string} value
     * @returns {Observable<void>}
     */
    public static setItem(key: string, value: string): Rx.Observable<void> {
        return Rx.from<void>(AsyncStorage.setItem(key, value));
    }

}