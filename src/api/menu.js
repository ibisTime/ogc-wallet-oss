import fetch from 'common/js/fetch';
import {getRoleCode} from 'common/js/util';
import {ROOT_MENU_CODE} from 'common/js/config';
// export const ROOT_APP_CODE = 'DH201810120023250000000';
/**
 * 获取当前菜单拥有的按钮列表
 * @param parentKey
 */
export function getOwnerBtns(parentCode) {
    // 805026
    return fetch(630020, {
        parentCode,
        roleCode: getRoleCode(),
        type: 2
    });
}

/**
 * 列表获取菜单和按钮
 */
export function getMenuBtnList() {
    return fetch(630017);
}
/**
 * 列表获取导航
 */
export function getMenuAppList(data) {
    return fetch(630508, {
        type: 'app_menu',
        ...data
    });
}

/**
 * 列表获取节点
 */
export function getNodeList() {
    return fetch(630147);
}

/**
 * 根据角色列表获取菜单
 */
export function getRoleMenuList() {
    // 805026
    return fetch(630020, {
        type: 1,
        roleCode: getRoleCode()
    });
}

/**
 * 根据角色列表获取菜单和按钮
 */
export function getRoleMenuBtnList(roleCode) {
    roleCode = roleCode || getRoleCode();
    return fetch(630020, {roleCode});
}

/**
 * 根据角色列表获取节点和按钮
 */
export function getRoleCodeBtnList(roleCode) {
    roleCode = roleCode || getRoleCode();
    return fetch(630167, {roleCode});
}
