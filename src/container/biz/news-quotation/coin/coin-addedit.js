/* eslint-disable quotes */
import React from 'react';
import {Form} from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';

@Form.create()
class CoinAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '币种符号',
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
            title: '单位',
            field: 'unit'
        }, {
            title: '图标',
            field: 'pic',
            type: 'img',
            single: true
        }, {
            title: '币种介绍',
            field: 'introduce',
            type: 'textarea',
            normalArea: true
        }, {
            title: '流通量',
            field: 'totalSupply',
            min: '0',
            readonly: !!this.code
        }, {
            title: '流通值',
            field: 'totalSupplyMarket',
            min: '0',
            readonly: !!this.code
        }, {
            title: '总发行量',
            field: 'maxSupply',
            min: '0',
            readonly: !!this.code
        }, {
            title: '总市值',
            field: 'maxSupplyMarket',
            min: '0',
            readonly: !!this.code
        }, {
            title: '市值排名',
            field: "rank",
            readonly: !!this.code
        }, {
            title: '上架交易所',
            field: 'putExchange'
        }, {
            title: '前10交易所',
            field: 'topExchange'
        }, {
            title: '钱包类型',
            field: 'walletType'
        }, {
            title: '官网地址',
            field: 'webUrl'
        }, {
            title: "github地址",
            field: "gitUrl"
        }, {
            title: "Twitter地址",
            field: "twitter"
        }, {
            title: "ICO时间",
            field: "icoDatetime",
            type: 'date'
        }, {
            title: "ICO成本",
            field: "icoCost"
        }, {
            title: "募集资金",
            field: "raiseAmount"
        }, {
            title: "代币分配",
            field: "tokenDist"
        }, {
            title: "最新提交次数",
            field: "lastCommitCount",
            number: true,
            min: '0'
        }, {
            title: "总提交次数",
            field: "totalCommitCount",
            number: true,
            min: '0'
        }, {
            title: "总贡献值",
            field: "totalDist",
            number: true
        }, {
            title: "粉丝数",
            field: "fansCount",
            number: true,
            min: '0'
        }, {
            title: "关注数",
            field: "keepCount",
            number: true,
            min: '0'
        }, {
            title: "复制数",
            field: "copyCount",
            number: true,
            min: '0'
        }, {
            title: "更新人",
            field: "updater",
            hidden: !this.view
        }, {
            title: "更新时间",
            field: "updateDatetime",
            type: 'datetime',
            hidden: !this.view
        }, {
            title: "位置",
            field: "location",
            type: 'select',
            data: [
                {
                    key: '1',
                    value: '热门'
                },
                {
                    key: '0',
                    value: '普通'
                }
            ],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            title: "序号",
            field: "orderNo",
            required: true
        }, {
            title: "备注",
            field: "remark"
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: "628302",
            detailCode: "628306"
        });
    }
}

export default CoinAddedit;
