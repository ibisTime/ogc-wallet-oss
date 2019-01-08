import React from 'react';
import {Form} from 'antd';
import {
    getQueryString,
    moneyFormat,
    dateTimeFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class ReceiveQueryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.isDetail = !!getQueryString('isDetail', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '符号',
            field: 'symbol',
            readonly: !!this.symbol,
            maxlength: 6,
            minlength: 1,
            required: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            data: {
                '1': '基于ETH的token币',
                '2': '基于WAN的token币'
            }
        }, {
            title: '英文名称',
            field: 'ename',
            required: true
        }, {
            title: '中文名称',
            field: 'cname',
            required: true
        }, {
            title: '图标',
            field: 'icon',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '单位',
            field: 'unit',
            readonly: !!this.symbol,
            required: true
        }, {
            title: '归集阀值',
            field: 'collectStart',
            formatter: function (v, data) {
                return moneyFormat(data.collectStartString, '', data.symbol)
            },
            coinAmount: true,
            required: true,
            hidden: this.isDetail
        }, {
            title: '取现手续费',
            field: 'withdrawFee',
            formatter: function (v, data) {
                return moneyFormat(data.withdrawFeeString, '', data.symbol)
            },
            coinAmount: true,
            required: true,
            hidden: this.isDetail
        }, {
            title: '归集阀值',
            field: 'collectStartString',
            required: true,
            formatter: function (v, data) {
                return moneyFormat(v, '', data.symbol)
            },
            readonly: !!this.symbol,
            hidden: !this.isDetail
        }, {
            title: '取现手续费',
            field: 'withdrawFeeString',
            required: true,
            formatter: function (v, data) {
                return moneyFormat(v, '', data.symbol)
            },
            readonly: !!this.symbol,
            hidden: !this.isDetail
        }, {
            title: '合约地址',
            field: 'contractAddress',
            required: true,
            readonly: !!this.symbol,
        }, {
            title: '合约ABI',
            field: 'contractABI',
            required: true,
            readonly: !!this.symbol,
            type: 'textarea',
            normalArea: true
        }, {
            title: '序号',
            field: 'orderNo',
            number: true,
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'coin_status',
            hidden: !this.isDetail
        }, {
            title: '更新人',
            field: 'updater',
            hidden: !this.isDetail
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime',
            hidden: !this.isDetail
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            key: 'symbol',
            code: this.code,
            view: this.view,
            addCode: '802250',
            editCode: '802252',
            detailCode: '802266',
            beforeSubmit: function (data) {
                delete data.collectStartString;
                delete data.withdrawFeeString;
                delete data.updater;
                delete data.updateDatetime;
                delete data.status;
                data.pic1 = data.icon;
                data.pic2 = data.icon;
                data.pic3 = data.icon;
                if (this.symbol) {
                    data.symbol = this.symbol;
                }
                return data;
            },
        });
    }
}

export default ReceiveQueryAddedit;