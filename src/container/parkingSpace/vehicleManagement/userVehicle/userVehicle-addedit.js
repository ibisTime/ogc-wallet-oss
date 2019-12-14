import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

@Form.create()
class UserVehicleAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'code',
            title: '车辆编号'
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return v && d.user ? `${d.user.nickname}-${d.user.loginName}` : '-';
            }
        }, {
            field: 'source',
            title: '来源',
            data: [{
                key: '0',
                value: '购买'
            }, {
                key: '1',
                value: '组装'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'refCode',
            title: '来源关联编号'
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'pic',
            title: '产品图片',
            type: 'img'
        }, {
            field: 'level',
            title: '车辆等级',
            key: 'car_park_level_limit',
            type: 'select'
        }, {
            field: 'symbolPrice',
            title: '标价币种'
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            field: 'totalPay',
            title: '保养费(针对购买价格的百分比)'
        }, {
            field: 'symbolIncome',
            title: '收益币种'
        }, {
            field: 'daysLimit',
            title: '寿命（天）'
        }, {
            field: 'symbolIncome',
            title: '收益率(针对购买价格的百分比)'
        }, {
            field: 'status',
            title: '车辆状态',
            key: 'car_status',
            type: 'select'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'maintainCount',
            title: '保养次数'
        }, {
            field: 'startDatetime',
            title: '寿命开始时间',
            type: 'datetime'
        }, {
            field: 'endDatetime',
            title: '寿命结束时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '200045'
        });
    }
}

export default UserVehicleAddedit;
