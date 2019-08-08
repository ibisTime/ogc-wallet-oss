import fetch from 'common/js/fetch';

// 修改交易对开始时间与结束时间
export function setStartTimeAndEndTime(id, dailyStartTime, dailyEndTime) {
    return fetch(802904, {id, dailyStartTime, dailyEndTime});
}

// 修改交易对闪兑次数
export function setFrequency(id, dailyLimit) {
    return fetch(802905, {id, dailyLimit});
}
