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
} from '@redux/parkingSpace/sessionManagement/coinRecords';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.parkingSpaceCoinRecords,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CoinRecords extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '购买用户',
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
                return v && `${d.user.nickname}-${d.user.loginName}`;
            }
        }, {
            field: 'parkSellCode',
            title: '车位预售场次编号',
            search: true
        }, {
            field: 'symbolPrice',
            title: '标价币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            field: 'symbolPriceMarket',
            title: '标价币种行情'
        }, {
            field: 'totalPrice',
            title: '出价'
        }, {
            title: '支付币种',
            field: 'symbolPay',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'key',
            search: true
        }, {
            title: '支付币种行情',
            field: 'symbolPayMarket'
        }, {
            title: '实际支付币个数',
            field: 'totalPay'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_park_order_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200083
        });
    }
}

export default CoinRecords;
