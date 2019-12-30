import fetch from 'common/js/fetch';

// 这里为统计分析相关的API

// 用户量统计
export function userAmount(date) {
    return fetch(800000, {date});
}

// 查询用户糖果节点分布数量
export function userDistribution() {
    return fetch(625818);
}

// 数据字典
export function dataDect(parentKey) {
    return fetch(630036, {parentKey});
}

// 币量分布
export function coinDistribution(date, symbol) {
    return fetch(800010, {date, symbol});
}

// 今日玖佰玖统计
export function todayNineStatistics() {
    return fetch(610603);
}

// 历史玖佰玖统计
export function historyStatistics() {
    return fetch(610604);
}

// 团队查询
export function teamQueryList(userId) {
    return fetch(610608, {userId});
}

// 行为分布
export function behaviorDistribution(days, symbol, userId) {
    return fetch(610607, {days, symbol, userId});
}

// 流水条数统计
export function flowStatistics(currency, userId) {
    return fetch(610606, {currency, userId});
}

// 散取用户详情
export function bulkCollectionUserInfo(code) {
    return fetch(802356, {code});
}

// 今日已提币数量
export function toDaysWithdrawMoneyCount(code) {
    return fetch(802357, {code});
}

// 流水查询接口（今日历史组合查询）
export function flowSelectListOrDetail(accountNumber, status, start, limit) {
    return fetch(802327, {accountNumber, status, start, limit});
}

// 查询用户列表
export function findUserList(start, limit, loginName) {
    return fetch(805120, {start, limit, loginName});
}

// 团队本人查询
export function groupUserInfo(userId) {
    return fetch(610609, {userId, start: 1, limit: 1000});
}

// 产品收益统计
export function productRevenueStatistics() {
    return fetch(610760);
}

// 营销支出统计
export function marketingExpenditure() {
    return fetch(610761);
}

// 分红池余额查询
export function poolAmount(symbol) {
    return fetch(625801, {symbol});
}
