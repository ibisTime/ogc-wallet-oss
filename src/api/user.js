import fetch from 'common/js/fetch';
import {getUserName, getUserId} from 'common/js/util';
import {PIC_PREFIX} from 'common/js/config';

export function setRoleMenus(menuCodeList, roleCode) {
    return fetch(630027, {
        menuCodeList,
        roleCode,
        updater: getUserName()
    });
}
export function setAppMenus(codeList) {
    return fetch(630509, {
        codeList
    });
}

//  保存节点
export function setNodeMenus(nodeList, roleCode) {
    return fetch(630160, {
        nodeList,
        roleCode,
        updater: getUserName()
    });
}

// 取消用户节点身份
export function cancelNode(userId) {
    return fetch(805099, {
        userId
    });
}

// 注销激活平台用户
export function activateSysUser(userIdList) {
    return fetch(630056, {userIdList, updater: getUserName()});
}

// 注销激活c端用户
export function activateUser(userIdList) {
    return fetch(805084, {userIdList, updater: getUserName()});
}

// 获取用户详情
export function getUser() {
    return getUserById(getUserId());
}

// 获取用户详情
export function getUserById(userId) {
    return fetch(630067, {userId});
}

// 列表查询平台用户
export function getSysUsers() {
    return fetch(630066, {status: '0'});
}

// 发展为渠道商
export function setQ(userId) {
    return fetch(805093, {userId});
}
