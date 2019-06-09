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
    componentDidMount() {
        if(!this.view) {
            setTimeout(() => {
                let pricePar = document.getElementById('price').parentNode;
                let spHtml = document.createElement('span');
                spHtml.innerText = ' TOSP';
                spHtml.style.color = 'red';
                pricePar.appendChild(spHtml);
            }, 100);
        }
    }
    render() {
        const fields = [{
            field: 'name',
            title: '糖果名称',
            required: true
        }, {
            field: 'price',
            title: '糖果单价',
            required: true,
            formatter: function (v, data) {
                if(v) {
                    return moneyFormat(v.toString(), '', data.symbol) + (this.view ? data.symbol : null);
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
            single: true,
            help: '图片大小为210*158'
        }, {
            field: 'inventory',
            title: '糖果库存数量',
            required: true
        // }, {
        //     field: 'description',
        //     title: '糖果描述',
        //     type: 'textarea',
        //     required: true
        // }, {
        //     field: 'saleAmountFake',
        //     title: '虚拟数量'
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
                params.symbol = 'TOSP';
                params.price = moneyParse(params.price, '', params.symbol);
                return true;
            }
        });
    }
}

export default candyManagementAddedit;
