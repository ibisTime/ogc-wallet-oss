import fetch from 'common/js/fetch';

// 列表查询角色
export function getRoleList(params) {
    return fetch(630007, params);
}

// 新增用户
export function addUser(params) {
    return fetch(630050, params);
}