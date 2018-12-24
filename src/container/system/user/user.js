import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/system/user';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, showSucMsg} from 'common/js/util';
import {activateSysUser} from 'api/user';

@listWrapper(
    state => ({
        ...state.systemUser,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class User extends React.Component {
    render() {
        const fields = [{
            title: '关键字',
            field: 'keyword',
            search: true,
            noVisible: true
        }, {
            title: '用户名',
            field: 'loginName'
        }, {
            title: '真实姓名',
            field: 'realName',
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'user_status'
        }, {
            title: '角色',
            field: 'roleCode',
            type: 'select',
            listCode: '630007',
            keyName: 'code',
            valueName: 'name',
            search: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 630065,
            rowKey: 'userId',
            singleSelect: false,
            btnEvent: {
                reset: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/user/resetPwd?userId=${selectedRowKeys[0]}&userName=${selectedRows[0].loginName}`);
                    }
                },
                active: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let userIdList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status === '0') {
                                showWarnMsg(selectedRows[i].realName + ' 用户已是正常状态');
                                userIdList = [];
                                return;
                            }
                            userIdList.push(selectedRows[i].userId);
                        }
                        if (userIdList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确认激活用户？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return activateSysUser(userIdList).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                },
                rock: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let userIdList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status === '2') {
                                showWarnMsg(selectedRows[i].realName + ' 用户已禁止登陆');
                                userIdList = [];
                                return;
                            }
                            userIdList.push(selectedRows[i].userId);
                        }
                        if (userIdList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确认注销用户？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return activateSysUser(userIdList).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                },
                assign: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/user/role?userId=${selectedRowKeys[0]}`);
                    }
                },
                addPost: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/user/post?userId=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default User;
