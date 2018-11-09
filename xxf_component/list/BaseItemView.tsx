import React from "react";
import {ListRenderItemInfo, TouchableOpacity} from "react-native";

/**
 * 参数约定
 */
export interface BaseItemProps<T> {
    /**
     * items数据
     */
    itemInfo: ListRenderItemInfo<T>;
    /**
     * item点击事件
     */
    itemClick?: (index: number, t: T, itemInfo: ListRenderItemInfo<T>) => {};
}

/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 转为flatlist,listview 设计的item布局适配,规范参数和自动解析参数
 * @Company Beijing dsb
 */
export class BaseItemView<T, P extends BaseItemProps<T>, S>
    extends React.Component<P, S> {

    protected itemInfo: ListRenderItemInfo<T>;
    protected itemClick: any;


    constructor(props: P) {
        super(props);
        this.itemInfo = props.itemInfo;
        this.itemClick = props.itemClick;
    }

    /**
     * 包装点击事件
     * @returns {any}
     */
    public render() {
        return (
            <TouchableOpacity onPress={() => this.onItemClick(this.itemInfo.index, this.itemInfo.item, this.itemInfo)}>
                {this.onRenderItem(this.itemInfo.index, this.itemInfo.item, this.itemInfo)}
            </TouchableOpacity>
        );
    }


    /**
     * item渲染的方法
     * @param {number} index
     * @param {T} t
     * @param {ListRenderItemInfo<T>} itemInfo
     * @returns {React.ReactElement}
     */
    protected abstract onRenderItem(index: number, t: T, itemInfo: ListRenderItemInfo<T>): React.ReactNode;

    /**
     * 点击事件,默认分发父组件定义的监听点击
     * @param {number} index
     * @param {T} t
     * @param {ListRenderItemInfo<T>} itemInfo
     */
    protected onItemClick(index: number, t: T, itemInfo: ListRenderItemInfo<T>): void {
        if (!this.itemClick) {
            this.itemClick(index, t, itemInfo);
        }
    }
}