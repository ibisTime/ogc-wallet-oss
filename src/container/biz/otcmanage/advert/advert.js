import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/otcmanage/advert';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName,
    getCoinList
} from 'common/js/util';
import {Modal} from 'antd';
@listWrapper(
    state => ({
        ...state.OtcManageAdvert,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Advert extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '发布人',
            type: 'select',
            pageCode: '805120',
            // params: {
            //     kind: 'Q'
            // },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            title: '交易对',
            field: 'tradeCurrency',
            type: 'select',
            listCode: 625370,
            search: true,
            searchName: 'tradeCurrency',
            keyName: 'simpleName',
            valueName: 'BTC-{{simpleName.DATA}}',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            field: 'payType',
            type: 'select',
            search: 'true',
            pageCode: '625351',
            searchName: 'keyword',
            keyName: 'code',
            valueName: 'name',
            title: '付款方式',
            render: (v, data) => {
                return data.paymentName;
            }
        }, {
            field: 'totalCountString',
            title: '已买出/购买',
            render: (v, data) => {
                if (data.totalCountString === '0') {
                    return data.totalCountString + '-' + data.tradeCoin;
                } else {
                    return moneyFormat(v, '', data.tradeCoin) + '-' + data.tradeCoin;
                }
            }
        }, {
            field: 'premiumRate',
            title: '溢价率(%)',
            render: (v, data) => {
                return v * 100 + '%';
            }
        }, {
            field: 'minTrade',
            title: '单笔最小量'
        }, {
            field: 'maxTrade',
            title: '单笔最大量'
        }, {
            field: 'payLimit',
            title: '付款期限(分钟)',
            render: (v, data) => {
                return data.payLimit + '分钟';
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [ {
                key: '0',
                value: '上架'
            }, {
                key: '1',
                value: '隐藏'
            }, {
                key: '2',
                value: '已下架'
            }, {
                key: '3',
                value: '删除'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            // rowKey: 'id',
            pageCode: '625225',
            searchParams: {
                statusList: ['0', '1', '2', '3']
            },
            btnEvent: {
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1' && selectedRows[0].status !== '0') {
                        showWarnMsg('不是可以上架的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定上架该广告？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625223, {
                                    adsCode: selectedRows[0].adsCode,
                                    user: selectedRows[0].user,
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
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/otcmanage/advert/addedit?&code=${selectedRowKeys[0]}&adsCode=${selectedRows[0].adsCode}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/otcmanage/advert/addedit?&code=${selectedRows[0].code}`);
                    }
            },
                down: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].status !== '1') {
                        showWarnMsg('该广告不可下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定下架该广告？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625222, {
                                    adsCode: items[0].adsCode,
                                    user: items[0].user,
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
            // searchParams: {
            //     type: 'coin_price_x'
            // }
        });
    }
}

export default Advert;
