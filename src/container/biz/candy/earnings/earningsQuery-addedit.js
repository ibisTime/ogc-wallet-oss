import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class earningsQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'refCode',
            title: '订单编号'
        }, {
            field: 'buyName',
            title: '购买人',
            formatter(v, d) {
                return `${d.buyUserRealName}-${d.buyUserMobile}`;
            }
        }, {
            field: 'beneName',
            title: '收益人',
            formatter(v, d) {
                return `${d.benefitUserRealName}-${d.benefitUserMobile}`;
            }
        }, {
            field: 'type',
            title: '收益类型',
            type: 'select',
            key: 'candy_income_type ',
            search: true
        }, {
            field: 'income',
            title: '收益金额',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'candyName',
            title: '计划名称',
            formatter(v, d) {
                return d.candyOrder.candyName;
            }
        }, {
            field: 'rate',
            title: '计划收益',
            formatter(v, d) {
                return d.candyOrder.rate;
            }
        }, {
            field: 'price',
            title: '价格',
            formatter: function (v, d) {
                return moneyFormat(d.candyOrder.price.toString(), '', d.symbol);
            }
        }, {
            field: 'income',
            title: '收益金额',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol) + data.symbol;
            }
        }, {
            field: 'status',
            title: '状态',
            formatter: () => '已结算'
        }, {
            field: 'incomeTime',
            title: '收益时间',
            type: 'datetime',
            search: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: true,
            detailCode: '610444'
        });
    }
}

export default earningsQueryAddedit;
