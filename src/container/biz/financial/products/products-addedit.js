import React from 'react';
import {Form} from 'antd';
import {
    getQueryString,
    moneyFormat,
    dateTimeFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ProductsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '名称（中文简体）',
            field: 'nameZhCn',
            required: true
        }, {
            title: '名称（英文）',
            field: 'nameEn',
            required: true
        }, {
            title: '名称（韩文）',
            field: 'nameKo',
            required: true
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802265',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            required: true,
            readonly: !!this.code
        }, {
            title: '币种',
            field: 'symbol1',
            formatter: function (v, data) {
                return data.symbol;
            },
            hidden: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'product_type',
            required: true,
            readonly: !!this.code
        }, {
            title: '产品期限（天）',
            field: 'limitDays',
            required: true,
            number: true,
            isPositive: true,
            'Z+': true
        }, {
            title: '预期年化收益率(%)',
            field: 'expectYield',
            required: true,
            number: true,
            range: [0, 100],
            rate: true,
            formatter: function (v, data) {
                return v * 100;
            }
        }, {
            title: '总募集金额',
            field: 'amount',
            coinAmount: true,
            required: true,
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '募集成功金额',
            field: 'successAmount',
            coinAmount: true,
            required: true,
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '总份数',
            field: 'totalFen',
            'Z+': true,
            required: true
        }, {
            title: '限购份数',
            field: 'limitFen',
            'Z+': true,
            required: true
        }, {
            title: '募集时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            formatter: dateTimeFormat,
            twoDate: true,
            required: true
        }, {
            title: '起息时间',
            field: 'incomeDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '到期时间',
            field: 'arriveDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '还款日',
            field: 'repayDatetime',
            type: 'date',
            required: true
        }, {
            title: '回款方式',
            field: 'paymentType',
            value: '0',
            required: true,
            hidden: true
        }, {
            title: '购买属性（中文简体）',
            field: 'buyDescZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '购买属性（英文）',
            field: 'buyDescEn',
            type: 'textarea',
            required: true
        }, {
            title: '购买属性（韩文）',
            field: 'buyDescKo',
            type: 'textarea',
            required: true
        }, {
            title: '赎回属性（中文简体）',
            field: 'redeemDescZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '赎回属性（英文）',
            field: 'redeemDescEn',
            type: 'textarea',
            required: true
        }, {
            title: '赎回属性（韩文）',
            field: 'redeemDescKo',
            type: 'textarea',
            required: true
        }, {
            title: '说明书（中文简体）',
            field: 'directionsZhCn',
            type: 'textarea',
            required: true
        }, {
            title: '说明书（英文）',
            field: 'directionsEn',
            type: 'textarea',
            required: true
        }, {
            title: '说明书（韩文）',
            field: 'directionsKo',
            type: 'textarea',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '625500',
            editCode: '625501',
            detailCode: '625511'
        });
    }
}

export default ProductsAddedit;