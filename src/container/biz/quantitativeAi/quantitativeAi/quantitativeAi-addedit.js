import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId} from 'common/js/util';

@Form.create()
class CloudMessageAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'name',
            title: '产品名称',
            required: true
        }, {
            field: 'symbolBuy',
            title: '购买币种',
            type: 'select',
            key: 'gplh_buy_coin',
            required: true
        // }, {
        //     field: 'symbolIncome',
        //     title: '收益币种',
        //     type: 'select',
        //     listCode: '802007',
        //     keyName: 'symbol',
        //     valueName: 'symbol',
        //     required: true
        }, {
            field: 'rate',
            title: '日息',
            required: true,
            help: '如果您想输入10%，请输入0.1'
        }, {
            field: 'lockDays',
            title: '锁仓天数',
            required: true
        }, {
            field: 'buyMin',
            title: '最小投注币数量',
            required: true
        }, {
            field: 'buyMax',
            title: '最大投注币数量',
            required: true
        }, {
            field: 'feeRate',
            title: '提前取款手续费',
            required: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'gplh_project_status',
            hidden: !this.view
        }, {
            field: 'description',
            title: '描述',
            required: true,
            type: 'textarea'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '610300',
            editCode: '610302',
            detailCode: '610307',
            beforeSubmit(params) {
                params.updater = getUserId();
                return true;
            }
        });
    }
}

export default CloudMessageAddedit;
