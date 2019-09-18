import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class LevelMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '编号',
            field: 'code',
            readonly: true
        }, {
            title: '名称',
            field: 'name',
            readonly: true
        }, {
            title: '等级(数字越大级别越高)',
            field: 'level',
            readonly: true
        }, {
            title: '持币数量大于多少',
            field: 'scopeStart',
            required: true
        }, {
            title: '持币数量小于多少',
            field: 'scopeEnd',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '805405',
            editCode: '805402'
        });
    }
}

export default LevelMessageAddedit;
