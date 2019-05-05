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
} from '@redux/trade/complaintorder/complaintorder';
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
        ...state.ComplainTorder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ComplainTorder extends React.Component {
    state = {
        jyd: []
    };
    componentWillMount() {
        fetch(625229).then(data => {
            data.forEach((item, index) => {
                this.state.jyd.push({
                    kname: index,
                    kvalue: item
                });
            });
        });
    }
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '买家',
            field: 'buyUser',
            render: (v, data) => {
                return data.buyUserInfo ? data.buyUserInfo.nickname : '';
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '卖家',
            field: 'sellUser',
            render: (v, data) => {
                return data.sellUserInfo ? data.sellUserInfo.nickname : '';
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '交易对',
            field: 'tradeCurrency',
            type: 'select',
            data: this.state.jyd,
            keyName: 'kname',
            valueName: 'kvalue',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            title: '交易价格',
            field: 'tradePrice'
        }, {
            title: '交易数量',
            field: 'countString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + '-' + data.tradeCoin;
            }
        }, {
            title: '交易金额',
            field: 'tradeAmount',
            render: (v, data) => {
                return data.tradeAmount + '-' + data.tradeCurrency;
            }
        }, {
            title: '广告费',
            field: 'feeString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + '-' + data.tradeCoin;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '1',
                value: '已支付待释放'
            }, {
                key: '2',
                value: '已解冻待评价'
            }, {
                key: '3',
                value: '已完成'
            }, {
                key: '4',
                value: '已取消'
            }, {
                key: '5',
                value: '仲裁中'
            }, {
                key: '6',
                value: '仲裁买家胜'
            }, {
                key: '7',
                value: '仲裁卖家胜'
            }, {
              key: '8',
              value: '超时取消'
            }, {
                key: '9',
                value: '投诉待处理'
            }, {
                key: '10',
                value: '投诉已处理'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'updateDatetime',
            title: '完成时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625250',
            searchParams: {
                status: '9'
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/otcmanage/historicalorder/addedit?&code=${selectedRows[0].code}`);
                    }
                },
                cleck: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/trade/complaintorder/clack?&code=${selectedRows[0].code}`);
                    }
                }
            },
            beforeSearch: (params) => {
                if(params.tradeCurrency) {
                    let tradeCoin = params.tradeCurrency.split('-')[0];
                    let tradeCurrency = params.tradeCurrency.split('-')[1];
                    params.tradeCoin = tradeCoin;
                    params.tradeCurrency = tradeCurrency;
                }
                return params;
            }
        });
    }
}

export default ComplainTorder;
