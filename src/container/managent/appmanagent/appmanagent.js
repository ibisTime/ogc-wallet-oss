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
} from '@redux/managent/appmanagent';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.AppManagent,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class AppManagent extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '首创玩法',
            search: true
        }, {
            field: 'description',
            title: '首创玩法概要介绍'
        }, {
            field: 'slogan',
            title: '提示'
        }, {
            field: 'position',
            title: '链接'
        }, {
            title: '次序',
            field: 'orderNo'
        }, {
            field: 'location',
            title: '位置',
            type: 'select',
            key: 'banner_location',
            search: true
        }, {
            field: 'status',
            title: '状态'
        }, {
            field: 'remark',
            title: '备注'
        }, {
            field: 'updateDatetime',
            type: 'datetime',
            title: '更新时间'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625410',
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('已经是显示的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定显示该配置？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625403, {
                                    code: selectedRows[0].code,
                                    location: selectedRows[0].location,
                                    orderNo: selectedRows[0].orderNo,
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
                },
                down: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('已经是不显示的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定不显示该配置？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625404, {
                                    code: selectedRows[0].code,
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
        });
    }
}

export default AppManagent;
