/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description 防暴力点击
 * @Company Beijing dsb
 */
export class RAUtils {

    static DURATION_DEFAULT: number = 350;
    static LAST_CLICK_TIME: number = 0;

    /**
     * 是否在有效的时间段内
     * @param {number} duration
     * @returns {bool}
     */
    public static isLegal(duration: number) {
        let current: number = Date.now();
        if (RAUtils.LAST_CLICK_TIME == 0) {
            RAUtils.LAST_CLICK_TIME = current;
            return true;
        } else {
            let distance: number = current - RAUtils.LAST_CLICK_TIME;
            RAUtils.LAST_CLICK_TIME = current;
            return duration < distance;
        }
    }

}