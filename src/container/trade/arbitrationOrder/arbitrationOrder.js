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
} from '@redux/trade/arbitrationOrder/arbitrationOrder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.tradeArbitrationOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ArbitrationOrder extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '被告',
            field: 'beigao',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                var html = '';
                if (data.beigaoInfo) {
                    html = data.beigaoInfo.nickname;
                    if(data.beigaoInfo.mobile) {
                        html += '(' + data.beigaoInfo.mobile + ')';
                    } else {
                        html += '(' + data.beigaoInfo.email + ')';
                    }
                }
                if(v === data.tradeOrder.buyUser) {
                    html += '-买家';
                }else{
                    html += '-卖家';
                }
                return <span style={{whiteSpace: 'nowrap'}}>{html}</span>;
            }
        }, {
            title: '原告',
            field: 'yuangao',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                var html = '';
                if (data.yuangaoInfo) {
                    html = data.yuangaoInfo.nickname;
                    if(data.yuangaoInfo.mobile) {
                        html += '(' + data.yuangaoInfo.mobile + ')';
                    } else {
                        html += '(' + data.yuangaoInfo.email + ')';
                    }
                }
                if(v === data.tradeOrder.buyUser) {
                    html += '-买家';
                }else{
                    html += '-卖家';
                }
                return <span style={{whiteSpace: 'nowrap'}}>{html}</span>;
            }
        }, {
            title: '针对订单编号',
            field: 'tradeOrderCode',
            search: true
        }, {
            field: 'coin',
            title: '币种',
            type: 'select',
            key: 'coin',
            render: (v, data) => {
                if (data.tradeOrder) {
                    return data.tradeOrder.tradeCoin;
                }
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'arbitrate_status',
            search: true
        }, {
            title: '申请原因',
            field: 'reason'
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            title: '处理结果',
            field: 'result',
            type: 'select',
            data: [{
                'key': '0',
                'value': '不通过'
            }, {
                'key': '1',
                'value': '通过'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'updateDatetime',
            title: '处理时间',
            type: 'datetime'
        }, {
            title: '处理说明',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625265',
            btnEvent: {
                resolve: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('只有待处理的订单才可以进行处理');
                    } else {
                        this.props.history.push(`/trade/arbitrationOrder/resolve?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ArbitrationOrder;
