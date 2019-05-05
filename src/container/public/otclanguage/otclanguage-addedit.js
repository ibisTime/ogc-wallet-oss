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
            title: '中文',
            field: 'dvalue',
            required: true
        }, {
            field: 'enDvalue',
            title: '英文',
            required: true
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '630030',
            editCode: '630032',
            detailCode: '630037',
            beforeSubmit: (data) => {
                data.parentKey = 'often_sentence';
                data.dkey = data.dvalue;
                data.type = 1;
                return data;
            }
        });
    }
}

    export
    default
    NotifierofwithdrawalAddedit;
