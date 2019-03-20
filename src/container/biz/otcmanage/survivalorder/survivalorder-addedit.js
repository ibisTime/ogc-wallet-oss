import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class SurvivalorderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '买家',
            field: 'buyUser',
            formatter: (v, data) => {
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
            formatter: (v, data) => {
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
            type: 'tradeCoin',
            formatter: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            },
            search: true
        }, {
            title: '交易价格',
            field: 'tradePrice'
        }, {
            title: '交易数量',
            field: 'countString',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '交易金额',
            field: 'tradeAmount'
        }, {
            title: '广告费',
            field: 'feeString',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                'key': '0',
                'value': '待支付'
            }, {
                'key': '1',
                'value': '已支付'
            }, {
                'key': '3',
                'value': '仲裁中'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'updateDatetime',
            title: '下单时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            // rowKey: 'id',
            detailCode: '625251'
        });
    }
}

export default SurvivalorderAddedit;
