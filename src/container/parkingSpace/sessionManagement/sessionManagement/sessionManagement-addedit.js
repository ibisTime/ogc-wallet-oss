import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg, getCoinList} from 'common/js/util';

@Form.create()
class SessionManagementAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'name',
            title: '场次名称',
            required: true
        }, {
            field: 'pic',
            title: '场次图片',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'symbolPrice',
            title: '标价币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            required: true
        }, {
            field: 'maxPrice',
            title: '最高价',
            number: true,
            required: true
        }, {
            field: 'minPrice',
            title: '最低价',
            number: true,
            required: true
        }, {
            field: 'quantityExpect',
            title: '预计车位投放数量',
            required: true,
            number: true
        }, {
            field: 'startDatetime',
            title: '开始时间',
            type: 'datetime',
            required: true,
            isMinutes: true
        }, {
            field: 'endDatetime',
            title: '结束时间',
            type: 'datetime',
            required: true,
            isMinutes: true
        }, {
            field: 'releaseDatetimeExpect',
            title: '预计投放时间',
            type: 'datetime',
            required: true
        }, {
            field: 'releaseDatetimeActual',
            title: '实际投放时间',
            type: 'datetime',
            hidden: !this.code,
            readonly: true
        }, {
            field: 'nextStartDatetime',
            title: '预计下轮开始时间',
            type: 'datetime',
            required: true,
            isMinutes: true
        }, {
            field: 'nextEndDatetime',
            title: '预计下轮结束时间',
            type: 'datetime',
            required: true,
            isMinutes: true
        }, {
            title: '规则说明',
            field: 'note',
            required: true,
            type: 'textarea',
            normalArea: true
        }, {
            title: '实际车位投放数量',
            field: 'quantityActual',
            hidden: !this.code,
            readonly: true
        }, {
            title: '参与人数',
            field: 'buyCount',
            hidden: !this.code,
            readonly: true
        }, {
            title: '总投币数量(USDT)',
            field: 'totalAmount',
            hidden: !this.code,
            readonly: true
        }, {
            title: '成交均价',
            field: 'priceAvg',
            hidden: !this.code,
            readonly: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_park_sell_status',
            hidden: !this.code,
            readonly: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '200065',
            addCode: '200060',
            editCode: '200062'
        });
    }
}

export default SessionManagementAddedit;
