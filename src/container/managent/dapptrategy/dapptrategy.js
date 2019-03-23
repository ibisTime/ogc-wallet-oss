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
} from '@redux/managent/dappmanagent';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.DappManagent,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Aboutus extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            title: '攻略ID'
        }, {
            field: 'dappId',
            title: '应用ID'
        }, {
            field: 'title',
            title: '标题'
        }, {
            field: 'author',
            title: '作者'
        }, {
            field: 'content',
            title: '内容'
        }, {
            field: 'label',
            title: '标签'
        }, {
            field: 'orderNo',
            title: '排序'
        }, {
            field: 'status',
            title: '状态'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date'
        } ];
        return this.props.buildList({
            fields,
            pageCode: '625465',
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
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
                            content: `确定显示该应用攻略？`,
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
                },
                down: (selectedRowKeys, selectedRows) => {
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
                            content: `确定不显示该应用攻略？`,
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
            }
        });
    }
}

export default Aboutus;
