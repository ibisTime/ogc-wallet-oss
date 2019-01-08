import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ApplicationListHelpSetAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.refCode = getQueryString('refCode', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '问题',
            field: 'question',
            required: true
        }, {
            title: '答案',
            field: 'answer',
            type: 'textarea',
            required: true
        }, {
            title: '序号',
            field: 'orderNo',
            required: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '625420',
            editCode: '625422',
            detailCode: '625426',
            beforeSubmit: function(data) {
                data.refCode = this.refCode;
                return data;
            }
        });
    }
}

export default ApplicationListHelpSetAddedit;
