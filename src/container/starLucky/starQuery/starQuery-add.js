import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class starQueryAdd extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'starId',
            title: '星球名称',
            search: true,
            type: 'select',
            pageCode: '640003',
            keyName: 'id',
            valueName: '{{name.DATA}}-{{symbol.DATA}}'
        }, {
            field: 'startTime',
            title: '开始时间(0-24)'
        }, {
            field: 'endTime',
            title: '结束时间(0-24)'
        }, {
            field: 'openDatetime',
            title: '开奖时间(0-24)'
        }, {
            field: 'fitRate',
            title: '中奖比例(0-1之间的小数)'
        }, {
            field: 'randomRange',
            title: '中奖金额随机数'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '640032',
            editCode: '640033',
            detailCode: '640034'
        });
    }
}

export default starQueryAdd;
