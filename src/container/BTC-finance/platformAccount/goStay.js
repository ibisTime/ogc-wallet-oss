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
} from '@redux/marketsettlement/stadysettlement';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName,
    getQueryString
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.StadySettLement,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StadySettlement extends React.Component {
    constructor(props) {
        super(props);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.isPlat = !!getQueryString('isPlat', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if(this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
        this.buttons = [];
        this.buttons = [{
            code: 'export',
            name: '导出',
            check: false
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }

    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
        }, {
            title: '活动币种',
            field: 'currency',
            select: 'type',
            search: true
        }, {
            title: '申请划转数量',
            field: 'amount',
            render: (v, data) => {
                return moneyFormat(v.toString(), '', data.amount);
            }
        }, {
            title: '申请人',
            field: 'applyUser'
        }, {
            title: '申请时间',
            type: 'datetime',
            field: 'applyDatetime'
        }, {
            title: '申请说明',
            field: 'approveNote'
        }, {
            title: '操作人',
            field: 'approveUser'
        }, {
            title: '操作时间',
            type: 'datetime',
            field: 'approveDatetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802812,
            buttons: this.buttons,
            searchParams: {
                isPlat: this.isPlat,
                bizType: this.bizType,
                currency: this.symbol,
                accountNumber: this.accountNumber
            }
        });
    }
}

export default StadySettlement;