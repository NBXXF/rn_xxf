/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import {ReactNode} from "react";

export interface XFInputErrorNoticeProps {
    /**
     * 错误展示
     */
    error?: string | ReactNode;
    /**
     * 错误点击
     */
    onErrorClick?: () => void;
}