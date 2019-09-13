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
            title: '国际代码',
            field: 'interCode',
            search: true,
            required: true
        }, {
            title: '国旗图片',
            field: 'pic',
            single: true,
            type: 'img',
            required: true
        }, {
            title: '中文名称',
            field: 'chineseName',
            required: true
        }, {
            title: '国际名称',
            field: 'interName',
            required: true
        }, {
            title: '国际简称',
            required: true,
            field: 'interSimpleCode'
        }, {
            title: '所属洲际',
            required: true,
            field: 'continent'
        }, {
            title: '展示次序',
            field: 'orderNo'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 625300,
            detailCode: 625312,
            editCode: 625301
        });
    }
}

export default OtccountryAddedit;
