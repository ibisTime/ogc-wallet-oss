import React from 'react';
import { Form } from 'antd';
import { getQueryString, showWarnMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class privacyProtocolDetail extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '说明',
            field: 'remark1',
            readonly: true,
            formatter: (v, data) => {
                return data.remark;
            }
        }, {
            title: '说明',
            field: 'remark',
            hidden: true
        }, {
            title: '内容',
            field: 'cvalue',
            type: 'textarea'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: '630042',
            detailCode: '630046'
        });
    }
}

export default privacyProtocolDetail;
