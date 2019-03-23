import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'id',
            title: '攻略ID'
        }, {
            field: 'dappId',
            title: '应用ID'
        }, {
            field: 'title',
            title: '标题'
        }, {
            field: 'author',
            title: '作者'
        }, {
            field: 'content',
            title: '内容'
        }, {
            field: 'label',
            title: '标签'
        }, {
            field: 'orderNo',
            title: '排序'
        }, {
            field: 'status',
            title: '状态'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'date'
        } ];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 625467,
            editCode: 625462,
            addCode: 625450,
            deleteCode: 625451 //     beforeSumit: (parms) => {
            // }

        });
    }
}

export default AppmanagentAddedit;
