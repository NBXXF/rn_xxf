/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */
import {
    BackHandler
} from 'react-native';

export interface OnAndroidBackPressListener {
    onAndroidBackPress(): boolean;
}

export class AndroidUtils {

    public static addAndroidBackPressListener(listener: OnAndroidBackPressListener): void {
        BackHandler.addEventListener("hardwareBackPress", () => listener.onAndroidBackPress());
    }

    public static removeAndroidBackPressListener(listener: OnAndroidBackPressListener) {
        BackHandler.removeEventListener("hardwareBackPress", () => listener.onAndroidBackPress());
    }

    public static exitApp() {
        BackHandler.exitApp();
    }
}