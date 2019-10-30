import fetch from 'common/js/fetch';
import {getUserId, getRoleCode, getTeamCode} from 'common/js/util';

// 分页查询我的公告
export function getPageMyNotice() {
    return fetch(805305, {start: 1, limit: 5, status: '1', type: '2', target: '3'});
}

// 分页查询我的公司制度
export function getPageMyCompanysystem() {
    return fetch(632738, {userId: getUserId(), start: 1, limit: 5, status: 1});
}