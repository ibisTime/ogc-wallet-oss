import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OtccountryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('id', this.props.location.search);
        // this.id = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '中文名称',
            field: 'name',
            required: true
        }, {
            title: '英文名称',
            field: 'nameEn',
            required: true
        }, {
            title: '排序',
            field: 'orderNo',
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '下架'
            }, {
                key: '1',
                value: '上架'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            key: 'id',
            detailCode: 625332,
            addCode: 625320,
            editCode: 625321
        });
    }
}

export default OtccountryAddedit;
