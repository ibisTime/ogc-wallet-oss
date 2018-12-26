import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class Assign extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('userId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '用户名',
            field: 'loginName',
            readonly: true
        }, {
            title: '手机号',
            field: 'mobile',
            readonly: true
        }, {
            title: '角色编号',
            field: 'roleCode',
            type: 'select',
            required: true,
            listCode: 630007,
            keyName: 'code',
            valueName: 'name'
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];

        return this.props.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            editCode: 630057,
            detailCode: 630067
        });
    }
}

export default Assign;
