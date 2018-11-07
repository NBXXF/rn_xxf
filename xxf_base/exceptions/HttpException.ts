/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */
import {Exception} from "./Exception";

export class HttpException extends Exception {
    code: number;

    constructor(code: number, message: string) {
        super('HttpException', message, '');
        this.code = code;
    }
}