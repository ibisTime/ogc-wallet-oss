import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class DropManagementAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            required: true,
            hidden: this.code
        }, {
            title: '用户',
            field: 'userName',
            hidden: !this.code,
            formatter(v, d) {
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
            },
            readonly: true
        }, {
            title: '币种',
            field: 'currency',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            required: true,
            hidden: this.code
        }, {
            title: '币种',
            field: 'currency1',
            hidden: !this.code,
            formatter(v, d) {
              return d && d.currency;
            },
            readonly: true
        }, {
            title: '数量',
            field: 'amount',
            required: true,
            number: true
        }, {
            title: '状态',
            field: 'status',
            required: true,
            key: 'account_adjust_status',
            type: 'select',
            hidden: !this.code,
            readonly: true
        }, {
            title: '申请人',
            field: 'applyUserName',
            hidden: !this.code,
            readonly: true
        }, {
            title: '申请时间',
            field: 'applyDatetime',
            type: 'datetime',
            hidden: !this.code,
            readonly: true
        }, {
            title: '申请说明',
            field: 'applyNote',
            type: 'textarea',
            required: true,
            normalArea: true
        }, {
            title: '审核人',
            field: 'approveUserName',
            hidden: !this.code,
            readonly: true
        }, {
            title: '审核时间',
            field: 'approveDatetime',
            type: 'datetime',
            hidden: !this.code,
            readonly: true
        }, {
            title: '审核备注',
            field: 'approveNote',
            hidden: !this.code,
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '806030',
            detailCode: '806036',
            beforeSubmit(params) {
              params.type = '0';
              return params;
            }
        });
    }
}

export default DropManagementAddedit;
