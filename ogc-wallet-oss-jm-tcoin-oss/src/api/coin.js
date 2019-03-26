import {getUserName} from 'common/js/util';
import fetch from 'common/js/fetch';

// 获取币种列表
export function getCoinList() {
    return fetch(802007, {updater: ''});
}

// 重新发布币种
export function upCoin(config) {
    return fetch(802003, {updater: getUserName(), ...config});
}

// 撤下币种
export function downCoin(config) {
    return fetch(802004, {updater: getUserName(), ...config});
}