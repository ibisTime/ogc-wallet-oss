import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class ClassificationAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            buyType: true
        };
        this.index = 0;
    }
    render() {
        const fields = [{
            field: 'orderNo',
            title: '展示顺序',
            required: true
        }, {
            field: 'name',
            title: '名称',
            required: true
        }, {
            field: 'status',
            title: '状态',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '不显示'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            required: true
        }, {
            field: 'creatorName',
            title: '创建人',
            readonly: true,
            hidden: !this.code
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            readonly: true,
            hidden: !this.code
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '629000',
            editCode: '629002',
            detailCode: '629005'
        });
    }
}

export default ClassificationAddedit;
