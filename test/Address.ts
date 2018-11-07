/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 * @Company Beijing dsb
 */

export default class Address {
    constructor(lon: any, level: any, address: any) {
        this.lon = lon;
        this.level = level;
        this.address = address;
    }

    lon: string;
    level: number;
    address: string;
}