/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */

import {ajax} from 'rxjs/ajax';
import {from, Observable} from "rxjs/index";
import {AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";
import {map} from "rxjs/internal/operators";

import Address from "./Address";
import {XFClient} from "../xxf_http/XFClient";
import {XFClientBuilder} from "../xxf_http/XFClientBuilder";

/**
 * json 测试ok
 * 1: `http://gc.ditu.aliyun.com/regeocoding?l=39.938133,116.395739&type=001`
 * 2: `http://gc.ditu.aliyun.com/geocoding?a=苏州市`
 *
 * 非json接口:
 * `https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=17611639080`
 *
 *  getJSON解析的
 * @param {string} url
 * @returns {(target: any, methodName: any, descriptor: PropertyDescriptor) => PropertyDescriptor}
 * @constructor
 */


export class TestService {
    private static INSTANCE: TestService;
    private xFClient: XFClient = new XFClientBuilder('http://gc.ditu.aliyun.com/')
        .connectTimeOut(5000)
        .build();

    public static getInstance(): TestService {
        if (!TestService.INSTANCE) {
            TestService.INSTANCE = new TestService();
        }
        return TestService.INSTANCE;
    }


    /**
     * 获取城市信息
     * @param {string} name
     * @returns {Observable<Address>}
     */
    getCity(name: string): Observable<Address> {
        let param: Map<string, any> = new Map;
        param.set('a', name);
        return this.xFClient.get('geocoding', param);
    }
}

export const testService = TestService.getInstance();