import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class PreservationOrderAddedit extends DetailUtil {
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
            title: '关联产品编号',
            field: 'productCode'
        }, {
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            title: '购买币种',
            field: 'symbolIn'
        }, {
            title: '释放币种',
            field: 'symbolOut'
        }, {
            title: '购买数量',
            field: 'amountIn'
        }, {
            title: '释放数量',
            field: 'amountOut'
        }, {
            title: '有效期限（天）',
            field: 'daysLimit'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'right_product_order_status'
        }, {
            title: '创建人时间',
            field: 'createTime',
            type: 'datetime'
        }, {
            title: '到期时间',
            field: 'endTime',
            type: 'datetime'
        }, {
            title: '赎回时间',
            field: 'redeemTime',
            type: 'datetime'
        }, {
            title: '释放时间',
            field: 'releaseTime',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '805485'
        });
    }
}

export default PreservationOrderAddedit;
