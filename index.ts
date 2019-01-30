/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 网络客户端
 */
import {XFClient} from "./xxf_http/XFClient";
import {XFClientBuilder} from "./xxf_http/XFClientBuilder";
import {Interceptor, HttpInterceptor} from "./xxf_http/Interceptor";
import {Cache} from "./xxf_http/cache/Cache";
import {DefaultCache} from "./xxf_http/cache/DefaultCache";
import {ResponseBody} from "./xxf_http/models/ResponseBody";
import {Exception} from './xxf_base/exceptions/Exception';
import {HttpException} from './xxf_base/exceptions/HttpException';
import {NullPointException} from './xxf_base/exceptions/NullPointException';
import {Stack} from './xxf_base/datastructure/Stack';

export {
    XFClient,
    XFClientBuilder,
    Interceptor,
    DefaultCache,
    Cache,
    ResponseBody,
    HttpInterceptor,
    Exception,
    NullPointException,
    HttpException,
    Stack,
}

import {BaseItemView, BaseItemProps} from './xxf_component/list/BaseItemView';
import {SimpleBaseItemView} from './xxf_component/list/SimpleBaseItemView';
import {XFButton, XFButtonProps} from './xxf_component/button/XFButton';
import {XFSwitch} from './xxf_component/button/XFSwitch';
import {XFVerificationCodeInput} from './xxf_component/input/XFVerificationCodeInput';
import {XFInputErrorNoticeProps} from './xxf_component/input/XFInputErrorNoticeProps';
import {XFTabBar} from './xxf_component/tab/XFTabBar';


export {
    BaseItemView,
    BaseItemProps,
    SimpleBaseItemView,
    XFButton,
    XFSwitch,
    XFButtonProps,
    XFVerificationCodeInput,
    XFInputErrorNoticeProps,
    XFTabBar,
}

import {AndroidUtils, OnAndroidBackPressListener} from './xxf_utils/AndroidUtils';
import {StorageUtils} from './xxf_utils/StorageUtils';
import {RAUtils} from './xxf_utils/RAUtils';
import {NetUtils} from './xxf_utils/NetUtils';

export {
    AndroidUtils,
    OnAndroidBackPressListener,
    StorageUtils,
    RAUtils,
    NetUtils,
}

