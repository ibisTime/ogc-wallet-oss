import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg, getCoinList} from 'common/js/util';

@Form.create()
class CoinRecordsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'parkSellCode',
            title: '车位预售场次编号'
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            formatter(v, d) {
                return v && `${d.user.nickname}-${d.user.loginName}`;
            }
        }, {
            field: 'symbolPrice',
            title: '标价币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key'
        }, {
            field: 'symbolPriceMarket',
            title: '标价币种行情'
        }, {
            field: 'totalPrice',
            title: '出价(E-USDT)'
        }, {
            title: '支付币种',
            field: 'symbolPay',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key'
        }, {
            title: '支付币种行情',
            field: 'symbolPayMarket'
        }, {
            title: '实际支付币个数',
            field: 'totalPay'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_park_order_status'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'readFlag',
            title: '结果是否已通知用户',
            type: 'select',
            data: [{
                key: '0',
                value: '否'
            }, {
                key: '1',
                value: '是'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'carParkSell',
            title: '场次信息',
            formatter(v) {
                return v && v.name;
            }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '200085'
        });
    }
}

export default CoinRecordsAddedit;
