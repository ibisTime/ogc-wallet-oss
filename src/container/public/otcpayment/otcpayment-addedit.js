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
            search: true,
            required: true
        }, {
            title: '中文名称',
            field: 'name',
            required: true
        }, {
            title: '英文名称',
            field: 'nameEn',
            required: true
        }, {
            title: '次序',
            integer: true,
            required: true,
            field: 'orderNo',
            search: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'payment_method',
            search: true
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
            addCode: 625340,
            detailCode: 625352,
            editCode: 625341
        });
    }
}

export default OtccountryAddedit;
