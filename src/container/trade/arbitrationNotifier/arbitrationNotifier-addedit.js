import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ArbitrationNotifierAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '手机号',
            field: 'dvalue',
            required: true,
            mobile: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '630030',
            editCode: '630032',
            detailCode: '630037',
            beforeSubmit: (data) => {
                data.remark = this.props.pageData.remark;
                data.parentKey = 'zc_sms_notice';
                data.dkey = data.dvalue;
                data.type = 1;
                return data;
            }
        });
    }
}

export default ArbitrationNotifierAddedit;
