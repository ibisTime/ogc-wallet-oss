import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class DataDictAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '父菜单编号',
            field: 'parentKey',
            listCode: '630036',
            params: {
                type: 0
            },
            keyName: 'dkey',
            valueName: 'dvalue'
        }, {
            title: '字典键',
            field: 'dkey',
            required: true,
            readonly: true,
            maxlength: 15
        }, {
            title: '字典值',
            field: 'dvalue',
            required: true,
            maxlength: 15
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: 630032,
            detailCode: 630037
        });
    }
}

export default DataDictAddEdit;
