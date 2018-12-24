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
} from '@redux/user/customer/customer-blackList';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    dateTimeFormat,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.userCustomerBlackList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CustomerBlackList extends React.Component {
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
            render: (v, data) => {
                if(data.userInfo) {
                    return data.userInfo.nickname;
                }
            }
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                if(data.userInfo) {
                    return data.userInfo.mobile;
                }
            }
        }, {
            field: 'userId',
            title: '手机号',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C',
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            placeholder: '请输入关键搜索',
            search: true,
            noVisible: true
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                if(data.userInfo) {
                    return data.userInfo.mobile;
                }
            }
        }, {
            field: 'createDatetime',
            title: '拉黑时间',
            type: 'datetime'
        }, {
            field: 'updater',
            title: '操作人'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '805245',
            searchParams: {
                status: '1',
                updater: ''
            },
            singleSelect: false,
            btnEvent: {
                delete: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let idList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            idList.push(selectedRows[i].id);
                        }
                        if (idList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定删除？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(805241, {
                                        idList: idList,
                                        updater: getUserName()
                                    }).then(() => {
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
            }
        });
    }
}

export default CustomerBlackList;
