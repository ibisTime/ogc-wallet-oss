import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class candyManagementAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '糖果名称',
            required: true
        }, {
            field: 'symbol',
            title: '糖果购买可用币种',
            type: 'select',
            listCode: '802007',
            keyName: 'symbol',
            valueName: 'symbol',
            required: true
        }, {
            field: 'price',
            title: '糖果单价',
            required: true,
            formatter: function (v, data) {
                if(v) {
                    return moneyFormat(v.toString(), '', data.symbol);
                }
            }
        }, {
            field: 'rate',
            title: '糖果甜度（0-1）',
            required: true
        }, {
            field: 'picture',
            title: '糖果图片',
            required: true,
            type: 'img',
            single: true
        }, {
            field: 'inventory',
            title: '糖果库存数量',
            required: true
        }, {
            field: 'description',
            title: '糖果描述',
            type: 'textarea',
            required: true
        }, {
            field: 'saleAmountFake',
            title: '虚拟数量'
        }, {
            field: 'status',
            title: '状态',
            key: 'candy_product_status',
            type: 'select',
            hidden: !this.view
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.view
        }, {
            field: 'updateTime',
            title: '更新时间',
            type: 'datetime',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610400',
            editCode: '610402',
            detailCode: '610417',
            beforeSubmit: (params) => {
                params.price = moneyParse(params.price, '', params.symbol);
                return true;
            }
        });
    }
}

export default candyManagementAddedit;
