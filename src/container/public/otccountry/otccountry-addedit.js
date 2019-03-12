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
            field: 'interCode'
        }, {
            title: '国旗图片',
            field: 'pic',
            type: 'img'
        }, {
            title: '中文名称',
            field: 'chineseName'
        }, {
            title: '国际名称',
            field: 'interName'
        }, {
            title: '国际简码',
            field: 'interSimpleCode'
        }, {
            title: '所属洲际',
            field: 'continent'
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
            valueName: 'value'
        }, {
            title: '展示次序',
            field: 'orderNo'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625312
        });
    }
}

export default OtccountryAddedit;
