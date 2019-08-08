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
        this.isNotEmail = true;
        this.isNotTel = true;
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
            field: 'registerType',
            title: '注册类型',
            type: 'select',
            data: [{
                'key': '0',
                'value': '手机'
            }, {
                'key': '1',
                'value': '邮箱'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            onChange: (v) => {
                if (v === '0') {
                    this.isNotEmail = true;
                    this.isNotTel = false;
                }else{
                    this.isNotEmail = false;
                    this.isNotTel = true;
                }
            }
        }, {
            field: 'mobile',
            title: '手机号',
            hidden: this.isNotTel,
            required: this.isNotEmail
        }, {
            field: 'email',
            title: '邮箱',
            hidden: this.isNotEmail,
            required: this.isNotTel
        }, {
            field: 'pic',
            title: '店铺logo',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'province',
            title: '详细地址',
            type: 'citySelect',
            cFields: ['province', 'city', 'area'],
            required: true
        }, {
            field: 'address',
            title: '店铺地址',
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
            beforeSubmit: (data) => {
                console.log(data);
                return data;
            }
        });
    }
}

export default businessmenAddedit;