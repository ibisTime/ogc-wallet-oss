import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, getUserName, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class TokenManagementAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'level',
            title: '用户等级',
            required: true,
            number: true,
            readonly: !!this.code
        }, {
            field: 'name',
            title: '等级名称',
            required: true
        }, {
            field: 'dappTickets',
            title: 'DAPP门票',
            required: true,
            type: 'select',
            listCode: '625454',
            keyName: 'dappCode',
            valueName: 'name',
            multiple: true
        }, {
            field: 'weights',
            title: '超级节点权重（数字型）',
            required: true,
            number: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '625814',
            addCode: '625810',
            editCode: '625812'
        });
    }
}

export default TokenManagementAddedit;
