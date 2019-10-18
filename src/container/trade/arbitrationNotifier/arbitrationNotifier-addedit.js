import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ArbitrationNotifierAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'type',
            title: '类型',
            type: 'select',
            data: [{
                key: '0',
                value: '申请通知人'
            }, {
                key: '1',
                value: '广播通知人'
            }, {
                key: '2',
                value: '预警通知人'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'startDate',
            title: '开始时间',
            shijian: true,
            required: true,
            integer: true,
            placeholder: '请输入0-23的整数'
            // formatter: (v, data) => {
            //     if (v < 10) {
            //         return '0' + v + ':00';
            //     } else if (v === 24 && data.endTime === '24') {
            //         return '关闭';
            //     } else {
            //         return v + ':00';
            //     }
            // }
        }, {
            field: 'endDate',
            title: '结束时间',
            required: true,
            placeholder: '请输入0-23的整数',
            shijian: true,
            integer: true
        }, {
            field: 'name',
            title: '通知人',
            required: true
        }, {
            field: 'email',
            title: '通知人邮箱',
            required: true,
            email: true
        }];
        return this.buildDetail({
            fields,
            // key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802890',
            beforeSubmit: (data) => {
                return data;
            }
        });
    }
}

export
default
ArbitrationNotifierAddedit;
