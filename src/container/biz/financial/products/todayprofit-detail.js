import React from 'react';
import {Form} from 'antd';
import {
    getQueryString,
    moneyParse,
    moneyFormat,
    showSucMsg,
    getUserName
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class ProductsDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('id', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [
            {
                field: 'id',
                hidden: true
            }, {
            title: '产品编号',
            field: 'productCode'
        }, {
            title: '收益',
            field: 'totalAmount',
            formatter: (v) => {
                return moneyFormat(v.toString(), '', this.symbol);
            }
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'product_day_benefit_type',
            search: true
        }, {
            title: '收益时间',
            field: 'benefitDate',
            type: 'datetime'
        }, {
            title: '创建时间',
            field: 'createDatetime',
            search: true,
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '625555',
            editCode: 625551,
            beforeSubmit: (params) => {
                params.id = this.code();
                return params;
            },
            buttons: [ {
                code: 'back',
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default ProductsDetail;
