import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class NotifierofwithdrawalAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'type',
            value: 0,
            hidden: true
        }, {
            field: 'startDate',
            title: '开始时间',
            shijian: true,
            required: true,
            integer: true
        }, {
            field: 'endDate',
            title: '结束时间',
            required: true,
            shijian: true,
            integer: true
        }, {
            field: 'name',
            title: '通知人',
            required: true
        }, {
            field: 'phone',
            title: '通知手机号',
            required: true,
            mobile: true
        }];
        return this.buildDetail({
            fields,
            // key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802890',
            beforeSubmit: (data) => {
                let {pageData} = this.state;
                // data.remark = pageData.remark;
                // data.parentKey = 'zc_sms_notice';
                // data.dkey = data.dvalue;
                data.type = 0;
                return data;
            }
        });
    }
    }

    export
    default
    NotifierofwithdrawalAddedit;
