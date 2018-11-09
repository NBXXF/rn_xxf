import {BaseItemView, BaseItemProps} from "./BaseItemView";

interface State {
}

/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 简化item 布局
 * @Company Beijing dsb
 */
export abstract class SimpleBaseItemView<T> extends BaseItemView<T, BaseItemProps<T>, State> {

}