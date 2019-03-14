import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class NoticesAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'lang',
            value: '1',
            hidden: true
        }, {
            title: '标题',
            field: 'title',
            maxlength: 50,
            required: true
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            required: true
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 30
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 805300,
            editCode: 805301,
            detailCode: 805307,
            okText: this.code ? '发布' : '保存'
        });
    }
}

export default NoticesAddedit;
