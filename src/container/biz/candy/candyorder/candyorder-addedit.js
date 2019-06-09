import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class candyOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'candyName',
            title: '糖果名称'
        }, {
            field: 'price',
            title: '价格',
            formatter: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            field: 'rate',
            title: '甜度'
        }, {
            field: 'quantity',
            title: '总可售数量'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'product_order_status'
        }, {
            field: 'incomeTime',
            title: '预计收益时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: true,
            detailCode: '610437'
        });
    }
}

export default candyOrderAddedit;
