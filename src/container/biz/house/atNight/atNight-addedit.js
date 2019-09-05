import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class atNightAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '产品名称',
            required: true
        }, {
            field: 'picture',
            title: '图片',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'price',
            title: '购买单价',
            required: true
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            key: 'fpp_jy_symbol_in',
            required: true
        }, {
            field: 'stockTotal',
            title: '库存',
            required: true
        }, {
            field: 'orderNo',
            title: '显示顺序',
            required: true
        }, {
            field: 'description',
            title: '描述'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610750',
            editCode: '610752',
            detailCode: '610756'
        });
    }
}

export default atNightAddedit;
