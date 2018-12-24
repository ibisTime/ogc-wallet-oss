import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/coin/coin-addedit';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.bizCoinAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CoinAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isDetail = !!getQueryString('isDetail', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '符号',
            field: 'symbol',
            readonly: !!this.code,
            required: true
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
            title: '钱包水印图标',
            field: 'pic1',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '流水加钱图标',
            field: 'pic2',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '流水减钱图标',
            field: 'pic3',
            type: 'img',
            single: true,
            required: true
        }, {
            title: '单位',
            field: 'unit',
            readonly: !!this.code,
            required: true
        }, {
            title: '归集阀值',
            field: 'collectStart',
            formatter: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            },
            required: true
        }, {
            title: '取现手续费',
            field: 'withdrawFee',
            value: 0,
            required: true,
            hidden: true
        }, {
            title: '合约地址',
            field: 'contractAsddress',
            required: true,
            readonly: !!this.code
        }, {
            title: '合约ABI',
            field: 'contractABI',
            required: true,
            readonly: !!this.code,
            type: 'textarea',
            normalArea: true
        }, {
            title: '中文简介',
            field: 'introduction',
            type: 'textarea',
            required: true
        }, {
            title: '英文简介',
            field: 'enIntroduction',
            type: 'textarea',
            required: true
        }, {
            title: '流通量',
            field: 'totalSupply',
            required: true
        }, {
            title: '流通市值',
            field: 'totalSupplyMarket',
            required: true
        }, {
            title: '发行总量',
            field: 'maxSupply',
            required: true
        }, {
            title: '发行市值',
            field: 'maxSupplyMarket',
            required: true
        }, {
            title: '市值排名',
            field: 'rank',
            required: true
        }, {
            title: '白皮书',
            field: 'whitePaper',
            required: true
        }, {
            title: '区块查询',
            field: 'blockUrl',
            required: true
        }, {
            title: 'ico时间',
            field: 'icoDatetime',
            type: 'date',
            required: true
        }, {
            title: '官网',
            field: 'webUrl',
            required: true
        }, {
            title: '序号',
            field: 'orderNo',
            number: true,
            required: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'coin_type',
            hidden: !this.isDetail
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
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802000',
            editCode: '802002',
            detailCode: '802006',
            beforeSubmit: function(data) {
                data.withdrawFee = 0;
                return data;
            }
        });
    }
}

export default CoinAddedit;
