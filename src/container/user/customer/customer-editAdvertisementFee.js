import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CustomerEditAdvertisementFee extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'mobile',
            title: '手机号',
            required: true,
            readonly: true
        }, {
            title: '昵称',
            field: 'nickname',
            readonly: true
        }, {
            field: 'realName',
            title: '真实姓名',
            readonly: true
        }, {
            field: 'tradeRate',
            title: '广告费率',
            number: true,
            min: '0',
            required: true
        }];
        return this.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            editCode: '805090',
            detailCode: '805121'
        });
    }
}

export default CustomerEditAdvertisementFee;
