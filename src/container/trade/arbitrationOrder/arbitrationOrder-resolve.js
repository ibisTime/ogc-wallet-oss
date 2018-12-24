import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/trade/arbitrationOrder/arbitrationOrder-resolve';
import {getQueryString, moneyFormat, showSucMsg, getUserId} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.tradeArbitrationOrderResolve,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class ArbitrationOrderResolve extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            readonly: true
        }, {
            title: '被告',
            field: 'beigao',
            formatter: (v, data) => {
                var html = '';
                if (data.beigaoInfo) {
                    html = data.beigaoInfo.nickname;
                    if(data.beigaoInfo.mobile) {
                        html += '(' + data.beigaoInfo.mobile + ')';
                    } else {
                        html += '(' + data.beigaoInfo.email + ')';
                    }
                }
                if (v === data.tradeOrder.buyUser) {
                    html += '-买家';
                } else {
                    html += '-卖家';
                }
                return html;
            },
            readonly: true
        }, {
            title: '原告',
            field: 'yuangao',
            formatter: (v, data) => {
                var html = '';
                if (data.yuangaoInfo) {
                    html = data.yuangaoInfo.nickname;
                    if(data.yuangaoInfo.mobile) {
                        html += '(' + data.yuangaoInfo.mobile + ')';
                    } else {
                        html += '(' + data.yuangaoInfo.email + ')';
                    }
                }
                if (v === data.tradeOrder.buyUser) {
                    html += '-买家';
                } else {
                    html += '-卖家';
                }
                return html;
            },
            readonly: true
        }, {
            title: '针对订单编号',
            field: 'tradeOrderCode',
            readonly: true
        }, {
            title: '币种',
            field: 'tradeCoin',
            formatter: (v, data) => {
                if (data.tradeOrder) {
                    return data.tradeOrder.tradeCoin;
                }
            },
            readonly: true
        }, {
            title: '申请原因',
            field: 'reason',
            readonly: true
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime',
            readonly: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'arbitrate_status',
            readonly: true
        }, {
            title: '处理说明',
            field: 'remark',
            type: 'textarea',
            normalArea: true,
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625266',
            buttons: [{
                title: '通过',
                handler: (param) => {
                    param.result = '1';
                    param.updater = getUserId();
                    this.props.doFetching();
                    fetch(625260, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    param.result = '0';
                    param.updater = getUserId();
                    this.props.doFetching();
                    fetch(625260, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ArbitrationOrderResolve;
