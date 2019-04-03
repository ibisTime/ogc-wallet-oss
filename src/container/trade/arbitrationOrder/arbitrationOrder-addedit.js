import React from 'react';
import {Form} from 'antd';
import {getQueryString, moneyFormat} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ArbitrationOrderAddedit extends DetailUtil {
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
            field: 'sellUser',
            formatter: (v, data) => {
                return data.sellUserInfo ? data.sellUserInfo.nickname + '-卖家' : '';
            }
        }, {
            title: '原告',
            field: 'buyUser',
            formatter: (v, data) => {
                return data.buyUserInfo ? data.buyUserInfo.nickname + '-买家' : '';
            }
        }, {
            title: '交易对',
            type: 'select',
            formatter: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            field: 'tradeAmount',
            title: '涉案金额',
            formatter: (v, d) => {
                return d.tradeAmount + '-' + d.tradeCurrency;
            }
        }, {
            title: '申请原因',
            field: 'arbitrateReason',
            readonly: true
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime',
            readonly: true
        }, {
            field: 'updateDatetime',
            title: '处理时间',
            type: 'datetime',
            readonly: true
        }, {
            title: '处理说明',
            field: 'arbitrateResult',
            type: 'textarea',
            normalArea: true,
            readonly: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'trade_order_status',
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625266'
        });
    }
    }

    export
    default
    ArbitrationOrderAddedit;
