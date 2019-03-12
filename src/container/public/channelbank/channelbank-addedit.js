import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class OtccountryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('id', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '状态',
            field: 'status',
            hidden: true
        }, {
            title: '类型',
            field: 'channelType',
            type: 'select',
            key: 'bank_card_type',
            search: true
        }, {
            title: '银行代号',
            required: true,
            field: 'bankCode'
        }, {
            title: '银行名称',
            field: 'bankName',
            required: true,
            search: true
        }, {
            title: '渠道给银行的代号',
            field: 'channelBank'
        }, {
            title: '每日限额',
            field: 'dayAmount',
            integer: true,
            required: true
        }, {
            title: '每日笔数限制',
            field: 'maxOrder',
            integer: true,
            required: true
        }, {
            title: '每月限额',
            integer: true,
            field: 'monthAmount',
            required: true
        }, {
            title: '单笔限额',
            field: 'orderAmount',
            required: true,
            integer: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            required: true,
            data: [{
                key: '0',
                value: '可用'
            }, {
                key: '1',
                value: '不可用'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true,
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: 802112,
            addCode: 802110,
            detailCode: 802117
        });
    }
}

export default OtccountryAddedit;
