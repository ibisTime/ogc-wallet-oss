import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class businessmenAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'shopName',
            title: '店铺名称',
            required: true
        }, {
            field: 'name',
            title: '店长姓名',
            required: true
        }, {
            field: 'idNo',
            title: '身份证',
            required: true
        }, {
            field: 'mobile',
            title: '手机号',
            required: true
        }, {
            field: 'pic',
            title: '图片',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'province',
            title: '省/市/区',
            type: 'citySelect',
            cFields: ['province', 'city', 'area'],
            required: true
        }, {
            field: 'address',
            title: '地址',
            required: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610500',
            editCode: '610501',
            detailCode: '610516',
            beforeSubmit: (data) => {
                return data;
            }
        });
    }
}

export default businessmenAddedit;
