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
} from '@redux/public/otccountry';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicOtcCountry,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Otcpayment extends React.Component {
    render() {
        const fields = [{
            title: '国际代码',
            field: 'interCode',
            search: true
        }, {
            title: '国旗图片',
            field: 'pic',
            type: 'img'
        }, {
            title: '中文名称',
            field: 'chineseName'
        }, {
            title: '国际名称',
            field: 'interName'
        }, {
            title: '国际简码',
            field: 'interSimpleCode'
        }, {
            title: '所属洲际',
            field: 'continent'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '禁用'
            }, {
                key: '1',
                value: '启用'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '展示次序',
            field: 'orderNo'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625311,
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('不是可以启用的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定上架该国家？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625302, {
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
                },
                down: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '0') {
                        showWarnMsg('不是可以禁用的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定下架该国家？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625303, {
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

export default Otcpayment;
