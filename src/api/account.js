import fetch from 'common/js/fetch';

/**
 * 分页查询账号
 * @param start
 * @param limit
 * @param type
 * @param currency
 * @param currencyList
 * @param userId
 */
export function getPageAccount(param) {
    return fetch(802300, {
        start: 1,
        limit: 10,
        ...param
    });
}
/**
 * 列表查询用户账号
 * @param userId
 * @param currency
 */
export function getListUserAccount(params) {
    return fetch(802301, params);
}
export function gettotalAcount() {
    return fetch(630900);
}

/**
 * 单个渠道商/用户佣金分布统计
 * @param userId
 * @param coin
 */
export function getCommissionStatistics(userId, coin) {
    return fetch(802397, {userId, coin});
}