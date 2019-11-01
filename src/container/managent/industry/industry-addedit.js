import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class IndustryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'informerNickname',
            title: '举报人',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'titleZh',
            title: '中文标题',
            required: true
        }, {
            field: 'titleEn',
            title: '英文标题',
            required: true
        }, {
            field: 'contentZh',
            title: '中文内容',
            required: true,
            type: 'textarea'
        }, {
            field: 'contentEn',
            title: '英文内容',
            required: true,
            type: 'textarea'
        }, {
            field: 'type',
            title: '类型',
            required: true,
            key: 'industry_type',
            type: 'select'
        }, {
            field: 'reportId',
            title: '被举报人id',
            required: true
        }, {
            field: 'origin',
            title: '来源',
            required: true,
            key: 'industry_origin'
        }, {
            field: 'isAnonymous',
            title: '是否匿名',
            required: true,
            type: 'select',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'occurrenceTime',
            title: '发生时间',
            required: true,
            type: 'datetime'
        }, {
            field: 'isHot',
            title: '是否热门',
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
            search: true
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
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'kind',
            title: '举报人的用户类型',
            type: 'select',
            data: [{
                key: 'C',
                value: 'c端用户'
            }, {
                key: 'P',
                value: 'p平台用户'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'industry_status',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'approveUserName',
            title: '审核人',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: this.code
        }, {
            field: 'remark',
            title: '备注',
            hidden: !this.code,
            readonly: this.code
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 628200,
            editCode: 628201,
            detailCode: 628213
        });
    }
}

export default IndustryAddedit;
