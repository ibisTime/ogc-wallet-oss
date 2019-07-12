import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CustomerIdentify extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('userId', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '昵称',
            field: 'nickname',
            readonly: true
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            readonly: true
        }, {
            field: 'idNo',
            title: '证件号',
            idCard: true,
            required: true
        }, {
            field: 'realName',
            title: '真实姓名',
            maxlength: 10,
            required: true
        }];
        return this.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            detailCode: '805121',
            editCode: '805075'
        });
    }
}

export default CustomerIdentify;
