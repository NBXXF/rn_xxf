/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 网络客户端
 */
import {XFClient} from "./xxf_http/XFClient";
import {XFClientBuilder} from "./xxf_http/XFClientBuilder";
import {Exception} from './xxf_base/exceptions/Exception';
import {HttpException} from './xxf_base/exceptions/HttpException';

export {
    XFClient,
    XFClientBuilder,
    Exception,
    HttpException
}


import {BaseItemView, BaseItemProps} from './xxf_component/list/BaseItemView';
import {SimpleBaseItemView} from './xxf_component/list/SimpleBaseItemView';

export {
    BaseItemView,
    BaseItemProps,
    SimpleBaseItemView
}

import {AndroidUtils, OnAndroidBackPressListener} from './xxf_utils/AndroidUtils'

export {
    AndroidUtils,
    OnAndroidBackPressListener
}

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
