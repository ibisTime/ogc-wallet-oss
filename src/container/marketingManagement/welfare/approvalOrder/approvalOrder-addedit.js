import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class ApprovalOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'type',
            title: '活动类型',
            type: 'select',
            data: [{
                key: '1',
                value: '注册送'
            }, {
                key: '2',
                value: '邀请送'
            }, {
                key: '3',
                value: '充值送'
            }, {
                key: '4',
                value: '空投'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '针对用户',
            field: 'userName',
            formatter(v, d) {
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
            }
        }, {
            title: '活动币种',
            field: 'currency'
        }, {
            title: '申请划转数量',
            field: 'amount'
        }, {
            title: '发放说明',
            field: 'bizNote'
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
            detailCode: '806056'
        });
    }
}
export default ApprovalOrderAddedit;
