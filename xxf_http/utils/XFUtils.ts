/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */

export default class XFUtils {
    /**
     * 合并url
     * @param {string} url
     * @param {string} path
     * @returns {string}
     */
    public static getMergeUrl(url: string, path: string,): string {
        if (path && (path.startsWith('http') || path.startsWith('ftp'))) {
            return path;
        }
        return `${url}${path}`;
    }

    /**
     * 合并url
     * @param {string} url
     * @param {string} path
     * @returns {string}
     */
    public static getUrlWithParam(url: string, param: Map<string, any>, urlEncode: boolean): string {
        let paramUrl = ``;
        if (param) {
            for (let [key, value] of param) {
                paramUrl = `${paramUrl}&${key}=${(urlEncode ? XFUtils.getUrlEncodeText(value) : value)}`;
            }
            paramUrl = paramUrl.substring(1);
        }
        return `${url}?${paramUrl}`;
    }


    /**
     * url encode
     * @param {string} txt
     * @returns {string}
     */
    public static getUrlEncodeText(txt: string) {
        try {
            return encodeURIComponent(txt)
        }
        catch (error) {
        }
        return txt;
    }

}