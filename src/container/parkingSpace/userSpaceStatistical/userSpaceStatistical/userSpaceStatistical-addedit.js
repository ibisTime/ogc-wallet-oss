import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg, getCoinList} from 'common/js/util';

@Form.create()
class UserSpaceStatisticalAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'loginName',
            title: '用户'
        }, {
            field: 'level',
            title: '统计层数'
        }, {
            title: '伞下用户车位数',
            field: 'totalQuantity'
        }, {
            title: '直推用户车位满位人数',
            field: 'firstFullQuantity'
        }, {
            field: 'date',
            title: '日期'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            key: 'userId',
            view: this.view,
            detailCode: '200291'
        });
    }
}

export default UserSpaceStatisticalAddedit;
