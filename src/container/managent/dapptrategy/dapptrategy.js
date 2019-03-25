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
} from '@redux/managent/dapptrategy';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName,
    getQueryString
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.DappTrateGy,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Aboutus extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'title',
            title: '标题'
        }, {
            field: 'author',
            title: '作者'
        }, {
            field: 'orderNo',
            title: '排序'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                'key': '0',
                'value': '隐藏'
            }, {
                'key': '1',
                'value': '显示'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date'
        } ];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625465',
            singleSelect: false,
            buttons: [{
                code: 'edit',
                name: '新增',
                handler: (keys, items) => {
                    this.props.history.push(`/managent/dapptrategy/addedit?&dappId=${this.id}`);
                },
                check: true
            }, {
                code: 'addedit',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/managent/dapptrategy/edit?&code=${selectedRowKeys[0]}&label=${selectedRows[0].label}&id=${this.id}`);
                    }
                },
                check: true
            }, {
                code: 'up',
                name: '显示',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625463, {
                                    id: selectedRows[0].id,
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
            }, {
                code: 'down',
                name: '不显示',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定不显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625463, {
                                    id: selectedRows[0].id,
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
            }, {
                code: 'delete',
                name: '删除',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定删除？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(625461, {
                                        id: selectedRows[0].id,
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
            }, {
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/managent/dapptrategy/detail?code=${selectedRowKeys[0]}&v=1&id=${this.id}`);
                    }
                },
                check: false
            }]
        });
    }
}

export default Aboutus;
