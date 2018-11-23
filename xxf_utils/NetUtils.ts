/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 网络工具类
 * @Company Beijing dsb
 */
import {ConnectionInfo, ConnectionType, NetInfo} from "react-native";
import {Observable} from "rxjs/index";
import {fromPromise} from "rxjs/internal/observable/fromPromise";

export enum NetEvent {
    NET_CONNECTION_INFO_CHANGE = 'connectionChange',
    NET_IS_CONNECTED_CHANGE = 'change',
}

export class NetUtils {

    /**
     * 获取网络连接信息
     * @returns {Observable<ConnectionInfo>}
     */
    public static getConnectionInfo(): Observable<ConnectionInfo> {
        return fromPromise(NetInfo.getConnectionInfo())
    }

    /**
     * 获取网络是否连接
     * @returns {Observable<boolean>}
     */
    public static isConnected(): Observable<boolean> {
        return fromPromise(NetInfo.isConnected.fetch());
    }

    /**
     * 网络连接监听
     * @param {(isConnected: boolean) => void} listener
     */
    public static addConnectionChangeListener(listener: (isConnected: boolean) => void): void {
        return NetInfo.isConnected.addEventListener(NetEvent.NET_IS_CONNECTED_CHANGE, listener);
    }

    /***
     * 网络连接监听移除
     * @param {(isConnected: boolean) => void} listener
     */
    public static removeConnectionChangeListener(listener: (isConnected: boolean) => void): void {
        return NetInfo.isConnected.removeEventListener(NetEvent.NET_IS_CONNECTED_CHANGE, listener);
    }

    /**
     * 网络连接详情监听
     * @param {(result: (ConnectionInfo | ConnectionType)) => void} listener
     */
    public static addConnectionInfoChangeListener(listener: (result: ConnectionInfo | ConnectionType) => void): void {
        return NetInfo.addEventListener(NetEvent.NET_CONNECTION_INFO_CHANGE, listener);
    }

    /**
     * 网络连接详情取消监听
     * @param {(result: (ConnectionInfo | ConnectionType)) => void} listener
     */
    public static removeConnectionInfoChangeListener(listener: (result: ConnectionInfo | ConnectionType) => void): void {
        return NetInfo.removeEventListener(NetEvent.NET_CONNECTION_INFO_CHANGE, listener);
    }

}