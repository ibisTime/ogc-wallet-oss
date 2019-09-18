import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class RightsMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '序号',
            field: 'orderNo',
            required: true,
            formatter(v) {
                return v;
            }
        }, {
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '图标',
            field: 'icon',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '点击执行动作',
            field: 'action',
            required: true
        }, {
            title: '点击执行路径',
            field: 'url',
            required: true
        }, {
            title: '说明',
            field: 'note',
            type: 'textarea',
            required: true
        }, {
            title: '更新人',
            field: 'updaterName',
            readonly: true,
            hidden: !this.code
        }, {
            title: '更新时间',
            field: 'updateTime',
            type: 'datetime',
            readonly: true,
            hidden: !this.code
        }, {
            title: '创建时间',
            field: 'createTime',
            type: 'datetime',
            readonly: true,
            hidden: !this.code
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '805425',
            addCode: '805420',
            editCode: '805422'
        });
    }
}

export default RightsMessageAddedit;
