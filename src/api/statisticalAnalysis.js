import fetch from 'common/js/fetch';

// 这里为统计分析相关的API

// 用户量统计
export function userAmount(date) {
    return fetch(610600, {date});
}

// 查询用户糖果节点分布数量
export function userDistribution() {
    return fetch(610601);
}

// 数据字典
export function dataDect(parentKey) {
    return fetch(630036, {parentKey});
}

// 币量分布
export function coinDistribution(date, symbol) {
    return fetch(610602, {date, symbol});
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
export function teamQueryList(loginName) {
    return fetch(610608, {loginName});
}
