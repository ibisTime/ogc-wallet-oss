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
} from '@redux/parkingSpace/vehicleManagement/buyRecord';
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
        ...state.parkingSpaceBuyRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BuyRecord extends React.Component {
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
                return v && d.user ? `${d.user.nickname}-${d.user.loginName}` : '-';
            }
        }, {
            field: 'productCode',
            title: '产品编号'
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            field: 'quantity',
            title: '购买数量'
        }, {
            field: 'symbolPrice',
            title: '标价币种'
        }, {
            field: 'symbolPriceMarket',
            title: '标价币种行情'
        }, {
            field: 'totalPrice',
            title: '应付标价币种总额'
        }, {
            field: 'symbolPay',
            title: '支付币种'
        }, {
            field: 'symbolPayMarket',
            title: '支付币种行情'
        }, {
            field: 'totalPay',
            title: '实际支付币个数'
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200023
        });
    }
}

export default BuyRecord;
