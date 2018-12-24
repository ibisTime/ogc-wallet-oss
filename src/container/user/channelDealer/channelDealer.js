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
} from '@redux/user/channelDealer/channelDealer';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ} from 'api/user';

@listWrapper(
    state => ({
        ...state.userChannelDealer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelDealer extends React.Component {
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称'
        }, {
            field: 'realName',
            title: '姓名',
            search: true
        }, {
            field: 'mobile',
            title: '手机号',
            search: true
        }, {
            field: 'email',
            title: '邮箱',
            search: true
        }, {
            field: 'respArea',
            title: '负责区域'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'user_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '注册时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805120',
            searchParams: {
                kind: 'Q'
            },
            singleSelect: false,
            btnEvent: {
                active: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let userIdList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status === '0') {
                                showWarnMsg(selectedRows[i].nickname + '用户已是正常状态');
                                userIdList = [];
                                return;
                            }
                            userIdList.push(selectedRows[i].userId);
                        }
                        if (userIdList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定禁止用户登录？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return activateUser(userIdList).then(() => {
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
                                showWarnMsg(selectedRows[i].nickname + '用户已禁止登陆');
                                userIdList = [];
                                return;
                            }
                            userIdList.push(selectedRows[i].userId);
                        }
                        if (userIdList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定禁止用户登录？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return activateUser(userIdList).then(() => {
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
                // 账户查询
                accountQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/channelDealer/accountQuery?isCDealer=1&userId=${selectedRowKeys[0]}`);
                    }
                },
                // 查看下级
                lowerLevelQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/channelDealer/lowerLevelQuery?userId=${selectedRowKeys[0]}`);
                    }
                },
                // 分佣账户
                divideAccount: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/channelDealer/divideAccount?userId=${selectedRowKeys[0]}`);
                    }
                },
                // 发展为渠道商
                setC: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].kind === 'C') {
                        showWarnMsg('该用户已经是渠道商');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定设置为普通用户？`,
                            onOk: () => {
                                this.props.doFetching();
                                return setQ(selectedRows[0].userId).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default ChannelDealer;
