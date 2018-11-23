/**
 * @author youxuan  E-mail:xuanyouwu@163.com
 * @Description
 */
import {Exception} from "./Exception";

export class NullPointException extends Exception {

    constructor(message: string) {
        super('NullPointException', message, '');
    }
}