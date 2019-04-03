import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class StayorderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
        }, {
            title: '活动币种',
            field: 'currency',
            select: 'type',
            search: true
        }, {
            title: '申请划转数量',
            field: 'amount',
            formatter: (v, data) => {
                return moneyFormat(v.toString(), '', data.currency);
            }
        }, {
            title: '申请人',
            field: 'applyUser',
            formatter: (v, d) => {
                return d.userInfo ? d.userInfo.nickname : '';
            }
        }, {
            title: '申请时间',
            type: 'datetime',
            field: 'applyDatetime'
        }, {
            title: '申请说明',
            field: 'approveNote'
        }, {
            title: '状态',
            field: 'status',
           key: 'transfer_status',
            type: 'select'
        }, {
            title: '操作人',
            field: 'approveUser'
        }, {
            title: '操作时间',
            type: 'datetime',
            field: 'approveDatetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 802813
        });
    }
}

export default StayorderAddedit;
