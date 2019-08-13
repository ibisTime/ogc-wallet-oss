import fetch from 'common/js/fetch';

// 修改交易对开始时间与结束时间
export function setStartTimeAndEndTime(id, dailyStartTime, dailyEndTime) {
    return fetch(802904, {id, dailyStartTime, dailyEndTime});
}

// 修改交易对闪兑次数
export function setFrequency(id, dailyLimit) {
    return fetch(802905, {id, dailyLimit});
}

// 修改法币行情
export function setCoinMaket(id, rate) {
    return fetch(802038, {id, rate});
}
// 修改币种行情
export function setCoinTypeMaket(id, price) {
    return fetch(650108, {id, price});
}
