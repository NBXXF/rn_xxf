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
    public static getUrlWithParam(url: string, param: Map<string, any>): string {
        let paramUrl = ``;
        if (param) {
            for (let [key, value] of param) {
                paramUrl = `${paramUrl}&${key}=${value}`;
            }
            paramUrl = paramUrl.substring(1);
        }
        return `${url}?${paramUrl}`;
    }
}