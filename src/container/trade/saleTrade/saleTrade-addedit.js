import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/trade/saleTrade/saleTrade-addedit';
import {getQueryString, moneyFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.tradeSaleTradeAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class SaleTradeAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.weekDict = {
            '1': '周一',
            '2': '周二',
            '3': '周三',
            '4': '周四',
            '5': '周五',
            '6': '周六',
            '7': '周日'
        };
    }

    render() {
        const fields = [{
            field: 'code',
            title: '编号'
        }, {
            title: '发布人',
            field: 'userId',
            formatter: (v, data) => {
                return data.user ? data.user.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            formatter: (v, data) => {
                return data.user ? data.user.mobile : '';
            }
        }, {
            field: 'email',
            title: '邮箱',
            formatter: (v, data) => {
                return data.user ? data.user.email : '';
            }
        }, {
            title: '币种',
            field: 'tradeCoin'
        }, {
            title: '售卖总量',
            field: 'totalCountString',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            field: 'leftCountString',
            title: '剩余可售卖',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '行情价格',
            field: 'marketPrice'
        }, {
            title: '溢价率',
            field: 'premiumRate',
            readonly: true
        }, {
            title: '保护价',
            field: 'protectPrice'
        }, {
            title: '售价',
            field: 'truePrice'
        }, {
            title: '单笔最大量',
            field: 'maxTrade'
        }, {
            title: '单笔最小量',
            field: 'minTrade'
        }, {
            title: '可交易的对象',
            field: 'onlyTrust',
            type: 'select',
            data: [{
                'key': '0',
                'value': '任何人都可以交易'
            }, {
                'key': '1',
                'value': '只有受信任的人可以交易'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'payType',
            title: '支付方式',
            type: 'select',
            data: [{
                'key': '0',
                'value': '支付宝'
            }, {
                'key': '1',
                'value': '微信'
            }, {
                'key': '2',
                'value': '银行卡转账'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'ads_status',
            search: true
        }, {
            field: 'displayTime',
            title: '广告展示时间:',
            type: 'o2m',
            options: {
                add: true,
                edit: true,
                delete: true,
                scroll: {x: 900},
                fields: [{
                    field: 'week',
                    title: '周几',
                    formatter: (v, data) => {
                        return this.weekDict[v];
                    }
                }, {
                    field: 'startTime',
                    title: '开始时间',
                    formatter: (v, data) => {
                        if(v < 10) {
                            return '0' + v + ':00';
                        } else if(v === 24 && data.endTime === '24') {
                            return '关闭';
                        } else {
                            return v + ':00';
                        }
                    }
                }, {
                    field: 'endTime',
                    title: '结束时间',
                    formatter: (v, data) => {
                        if(v < 10) {
                            return '0' + v + ':00';
                        } else if(v === 24 && data.startTime !== '24') {
                            return '23:59';
                        } else if(v === 24 && data.startTime === '24') {
                            return '关闭';
                        } else {
                            return v + ':00';
                        }
                    }
                }]
            }
        }, {
            title: '广告留言',
            field: 'leaveMessage'
        }, {
            title: '支付超时时间（分）',
            field: 'payLimit'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            type: 'datetime'
        }, {
            title: '最后更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildDetail({
            fields,
            key: 'adsCode',
            code: this.code,
            view: this.view,
            detailCode: '625226'
        });
    }
}

export default SaleTradeAddedit;
