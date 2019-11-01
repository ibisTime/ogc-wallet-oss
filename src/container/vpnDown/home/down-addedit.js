import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class DownAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'nameZh',
            title: '中文名称',
            required: true
        }, {
            field: 'nameEn',
            title: '英文名称'
        }, {
            field: 'type',
            title: '类型',
            key: 'down_type',
            type: 'select',
            required: true
        }, {
            field: 'icon',
            title: '图标',
            type: 'img',
            required: true,
            single: true
        }, {
            field: 'url',
            title: 'url地址',
            required: true
        }, {
            field: 'introduceZh',
            title: '中文介绍',
            required: true,
            type: 'textarea'
        }, {
            field: 'introduceEn',
            title: '英文介绍',
            type: 'textarea'
        }, {
            field: 'client',
            title: '客户端',
            type: 'select',
            data: [{
                key: '1',
                value: 'android'
            }, {
                key: '0',
                value: 'ios'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'flag',
            title: 'bundleID或包名',
            required: true
        }, {
            field: 'readNum',
            title: '阅读数量',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                key: '1',
                value: '上架'
            }, {
                key: '0',
                value: '下架'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: this.code
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 628220,
            editCode: 628221,
            detailCode: 628224
        });
    }
}

export default DownAddedit;
