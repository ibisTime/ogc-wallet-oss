import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail-o2m';

@Form.create()
class StarRulesAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('starId', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'list',
            title: '星球规则',
            type: 'o2m',
            required: true,
            options: {
                add: true,
                edit: true,
                delete: true,
                rowKey: 'id',
                fields: [{
                    field: 'startTime',
                    title: '开始时间(0-23)',
                    required: true,
                    shijian: true
                }, {
                    field: 'endTime',
                    title: '结束时间(0-23)',
                    required: true,
                    shijian: true
                }, {
                    field: 'openDatetime',
                    title: '开奖时间(0-23)',
                    required: true,
                    shijian: true
                }, {
                    field: 'fitRate',
                    required: true,
                    title: '中奖人数比例(0-1)'
                }, {
                    field: 'randomRange',
                    required: true,
                    title: '中奖金额随机数'
                }]
            }
        }];
        return this.buildDetail({
            fields,
            key: 'starId',
            code: this.code,
            view: this.view,
            addCode: '640020',
            editCode: '640022',
            detailCode: '640025',
            detailParams: {
                start: 1,
                limit: 100
            },
            beforeSubmit: (params) => {
                params.starId = this.code;
                params.ruleList = JSON.parse(JSON.stringify(params.list));
                delete params.list;
                return params;
            }
        });
    }
}

export default StarRulesAddedit;