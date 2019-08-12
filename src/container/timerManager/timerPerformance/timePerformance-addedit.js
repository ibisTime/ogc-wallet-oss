import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class timePerformanceAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.id = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'type',
            title: '类型'
        }, {
            field: 'name',
            title: '名称'
        }, {
            field: 'count',
            title: '任务数量'
        }, {
            field: 'startDatetime',
            title: '启动时间',
            type: 'datetime'
        }, {
            field: 'endDatetime',
            title: '结束时间',
            type: 'datetime'
        }, {
            field: 'consuming',
            title: '耗时（分）'
        }, {
            field: 'description',
            title: '描述'
        }, {
            field: 'createDate',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.id,
            view: this.view,
            detailCode: 610592,
            searchParams: {
                id: this.code
            }
        });
    }
}

export default timePerformanceAddedit;
