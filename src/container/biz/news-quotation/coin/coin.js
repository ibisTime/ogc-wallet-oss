import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/news-quotation/coin';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizQuotationCoin,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Coin extends React.Component {
    render() {
        const fields = [{
            title: '英文名称',
            field: 'ename'
        }, {
            title: '中文名称',
            field: 'cname'
        }, {
            title: '符号',
            field: 'symbol'
        }, {
            title: '关键字查询',
            field: 'keywords',
            search: true,
            noVisible: true
        }, {
            title: '总发行量',
            field: 'maxSupply'
        }, {
            title: '流通量',
            field: 'totalSupply'
        }, {
            title: '流通值',
            field: 'totalSupplyMarket'
        }, {
            title: '位置',
            field: 'location',
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
            search: true
        }, {
            title: '序号',
            field: 'orderNo'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 628305
        });
    }
}

export default Coin;
