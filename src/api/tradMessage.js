import fetch from 'common/js/fetch';

// 修改交易对开始时间与结束时间
export function setStartTimeAndEndTime(id, dailyStartTime, dailyEndTime) {
    return fetch(802904, {id, dailyStartTime, dailyEndTime});
}
