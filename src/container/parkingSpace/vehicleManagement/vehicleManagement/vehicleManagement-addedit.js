import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg, getCoinList} from 'common/js/util';

@Form.create()
class VehicleManagementAddedit extends DetailUtil {
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
            field: 'pic',
            title: '产品图片',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'level',
            title: '车辆等级',
            required: true,
            number: true
        }, {
            field: 'symbolPrice',
            title: '标价币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            required: true
        }, {
            field: 'price',
            title: '购买单价',
            required: true
        }, {
            title: '保养费(针对购买价格%)',
            field: 'maintainRate',
            required: true
        }, {
            title: '收益币种',
            field: 'symbolIncome',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            required: true
        }, {
            title: '寿命（天）',
            field: 'daysLimit',
            required: true
        }, {
            title: '收益率(针对购买价格%)',
            field: 'incomeRate',
            required: true
        }, {
            field: 'orderNo',
            title: '显示顺序',
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_product_status',
            required: true
        }, {
            field: 'creatorName',
            title: '创建人',
            hidden: !this.code,
            readonly: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '200005',
            addCode: '200000',
            editCode: '200002'
        });
    }
}

export default VehicleManagementAddedit;
