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
} from '@redux/user/customer/customer';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ} from 'api/user';

@listWrapper(
    state => ({
        ...state.userCustomer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Customer extends React.Component {
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
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
            field: 'kind',
            title: '类型',
            type: 'select',
            data: [{
                key: 'C',
                value: 'c端'
            }, {
                key: 'Q',
                value: '渠道商'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'userReferee',
            title: '推荐人',
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            required: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'user_status',
            search: true
        }, {
            field: 'isRealname',
            title: '是否实名',
            render: (v, data) => {
                return data.realName ? '是' : '否';
            }
        }, {
            field: 'realName',
            title: '真实姓名',
            render: (v, data) => {
                return data.realName ? data.realName : '-';
            }
        }, {
        //     field: 'tradeRate',
        //     title: '广告费率'
        // }, {
            field: 'createDatetime',
            title: '注册时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            field: 'lastLogin',
            title: '最后登录时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805120',
            singleSelect: false,
            searchParams: {
            },
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
                // 发展为渠道商
                setQ: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].kind === 'Q') {
                        showWarnMsg('该用户已经是渠道商');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定发展用户为渠道商？`,
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
                },
                // 修改广告费率
                editAdvertisementFee: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/customer/editAdvertisementFee?code=${selectedRowKeys[0]}`);
                    }
                },
                // 账户查询
                accountQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/customer/accountQuery?userId=${selectedRowKeys[0]}`);
                    }
                },
                // 委托单查询
                entrustQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/user/customer/entrustQuery?userId=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default Customer;
