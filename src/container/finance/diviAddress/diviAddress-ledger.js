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
} from '@redux/finance/diviAddress/diviAddress-ledger';
import {listWrapper} from 'common/js/build-list';
import {
    getQueryString,
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    moneyFormatMultiply
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.financeDiviAddressLedger,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class DiviAddress extends React.Component {
    constructor(props) {
        super(props);
        this.address = getQueryString('address', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '交易HASH',
            field: 'hash'
        }, {
            field: 'value',
            title: '交易金额',
            render: (v, data) => {
                if (data.from === this.address) {
                    return '-' + moneyFormat(v, '', this.symbol);
                } else {
                    return moneyFormat(v, '', this.symbol);
                }
            }
        }, {
            field: 'fromTo',
            title: '对方地址',
            render: (v, data) => {
                if (data.from === this.address) {
                    return data.to;
                } else {
                    return data.from;
                }
            }
        }, {
            title: 'gasLimit',
            field: 'gasLimit'
        }, {
            title: 'gas价格',
            field: 'gasPrice',
            coin: this.symbol,
            coinAmount: true
        }, {
            title: '消耗gas',
            field: 'gasUsed'
        }, {
            title: '矿工费',
            field: 'kgPrice',
            render: (v, data) => {
                let kgPrice = moneyFormatMultiply(data.gasPrice, data.gasUsed, '', this.symbol);
                return kgPrice;
            }
        }, {
            field: 'syncDatetime',
            title: '网络记账时间',
            type: 'datatime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802530',
            searchParams: {
                address: this.address
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                check: false,
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default DiviAddress;
