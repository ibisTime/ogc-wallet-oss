import React from 'react';
import { Form } from 'antd';
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
            field: 'beigao',
            formatter: (v, data) => {
                return data.sellUserInfo ? data.sellUserInfo.nickname + '-卖家' : '';
            }
        }, {
            title: '原告',
            field: 'yuangao',
            formatter: (v, data) => {
                return data.buyUserInfo ? data.buyUserInfo.nickname + '-买家' : '';
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
            }
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
            valueName: 'value'
        }, {
            field: 'updateDatetime',
            title: '处理时间',
            type: 'datetime',
            readonly: true
        }, {
            title: '处理说明',
            field: 'remark',
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

export default ArbitrationOrderAddedit;
