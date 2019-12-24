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
} from '@redux/parkingSpace/sessionManagement/sessionManagement';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.parkingSpaceSessionManagement,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SessionManagement extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '场次名称',
            search: true
        }, {
            field: 'symbolPrice',
            title: '标价币种'
        }, {
            field: 'startDatetime',
            title: '开始时间',
            type: 'datetime'
        }, {
            field: 'endDatetime',
            title: '结束时间',
            type: 'datetime'
        }, {
            field: 'quantityExpect',
            title: '预计车位投放数量'
        }, {
            title: '参与人数',
            field: 'buyCount'
        }, {
            title: '总投币数量',
            field: 'totalAmount'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_park_sell_status',
            search: true
        }, {
            field: 'releaseDatetimeExpect',
            title: '预计投放时间',
            type: 'datetime'
        }, {
            title: '实际车位投放数量',
            field: 'quantityActual'
        }, {
            field: 'releaseDatetimeActual',
            title: '实际投放时间',
            type: 'datetime'
        }, {
            title: '成交均价',
            field: 'priceAvg'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200063,
            deleteCode: '200061',
            btnEvent: {
                toSale: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('该状态下不能进行该操作');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `车位开售？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(200069, {
                                    code: selectedRowKeys[0]
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
                putOn: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('该状态下不能进行该操作');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `是否投放？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(200070, {
                                    code: selectedRowKeys[0]
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

export default SessionManagement;
