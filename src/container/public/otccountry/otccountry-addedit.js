import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OtccountryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '编号',
            field: 'code',
            required: true
        }, {
            title: '国际编号',
            field: 'interCode',
            required: true
        }, {
            title: '中文名称',
            field: 'chineseName',
            required: true
        }, {
            title: '英文名称',
            field: 'interName',
            required: true
        }, {
            title: '国际简称',
            field: 'interSimpleCode',
            required: true
        }, {
            title: '排序',
            field: 'orderNo',
            required: true,
            integer: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '禁用'
            }, {
                key: '1',
                value: '启用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625312
        });
    }
}

export default OtccountryAddedit;
