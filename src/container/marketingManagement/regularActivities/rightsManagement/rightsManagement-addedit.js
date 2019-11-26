import React from 'react';
import {Form} from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, getUserId} from 'common/js/util';

@Form.create()
class RightsManagementAddedit extends DetailUtil {
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
            }
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
            field: 'currency',
            hidden: !this.code
        }, {
            title: '状态',
            field: 'status',
            required: true,
            key: 'right_status',
            type: 'select',
            hidden: !this.code
        }, {
            title: '权益总量',
            field: 'totalAmount',
            required: true
        }, {
            title: '已释放数量',
            field: 'releasedAmount',
            hidden: !this.code
        }, {
            title: '每次释放数量',
            field: 'singleAmount',
            required: true
        }, {
            title: '开始时间',
            field: 'startDatetime',
            type: 'datetime',
            required: true
        }, {
            title: '释放周期(小时)',
            field: 'cycle',
            required: true
        }, {
            title: '来源',
            field: 'source',
            hidden: !this.code,
            type: 'select',
            key: 'right_source'
        }, {
            title: '关联订单号',
            field: 'refNo',
            hidden: !this.code
        }, {
            title: '权益说明',
            field: 'note',
            type: 'textarea',
            normalArea: true
        }, {
            title: '规则说明',
            field: 'rule',
            type: 'textarea',
            normalArea: true
        }, {
            title: '审核人',
            field: 'approveUserName',
            hidden: !this.code
        }, {
            title: '审核时间',
            field: 'approveDatetime',
            type: 'datetime',
            hidden: !this.code
        }, {
            title: '审核备注',
            field: 'approveNote',
            hidden: !this.code
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '670000',
            detailCode: '670016'
        });
    }
}

export default RightsManagementAddedit;
