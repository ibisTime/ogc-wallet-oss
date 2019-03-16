import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class MarketAdjustmentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'realName',
            title: '发布人',
            search: true,
            formatter: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            field: 'tradeCoin',
            title: '交易对',
            formatter: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            field: 'payType',
            title: '付款方式'
        }, {
            field: 'totalCountString',
            title: '已有总量',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.totalCountString);
            }
        }, {
            field: 'premiumRate',
            title: '溢价率',
            formatter: (v, data) => {
                return v * 100 + '%';
            }
        }, {
            field: 'maxTrade',
            title: '单笔最大量'
        }, {
            field: 'minTrade',
            title: '单笔最小量'
        }, {
            field: 'payLimit',
            title: '付款期限',
            formatter: (v, data) => {
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
        return this.buildDetail({
            fields,
            key: 'adsCode',
            code: this.code,
            view: this.view,
            editCode: '625221',
            detailCode: '625226'
        });
    }
}

export default MarketAdjustmentAddedit;
