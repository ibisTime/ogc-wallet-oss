import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AlertsAddedit extends DetailUtil {
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
            field: 'type',
            value: '0',
            hidden: true
        }, {
            title: '来源',
            field: 'source',
            hidden: !this.view,
            type: 'select',
            key: 'flash_source'
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            normalArea: true,
            required: true,
            placeholder: '快讯格式说明：【标题】快讯内容',
            style: {
                width: '100%'
            },
            autosize: {
                minRows: 8,
                maxRows: 28
            }
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.view
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'flash_status',
            hidden: !this.view
        }, {
            field: 'showDatetime',
            title: '发布时间',
            type: 'datetime',
            hidden: !this.view
        }, {
            field: 'updater',
            title: '最近修改人',
            hidden: !this.view
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            type: 'datetime',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 628090,
            editCode: 628091,
            detailCode: 628096,
            okText: '保存'
        });
    }
}

export default AlertsAddedit;
