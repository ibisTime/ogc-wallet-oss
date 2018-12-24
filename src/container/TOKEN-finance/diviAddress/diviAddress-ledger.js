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
} from '@redux/TOKEN-finance/diviAddress/diviAddress-ledger';
import {listWrapper} from 'common/js/build-list';
import {
    getQueryString,
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    moneyFormatMultiply
} from 'common/js/util';
import {CION_FMVP} from 'common/js/config';

@listWrapper(
    state => ({
        ...state.TOKENFinanceDiviAddressLedger,
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
                    return '-' + moneyFormat(v, '', CION_FMVP);
                } else {
                    return moneyFormat(v, '', CION_FMVP);
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
            field: 'gas'
        }, {
            title: 'gas价格',
            field: 'gasPrice',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            title: '消耗gas',
            field: 'gasUsed'
        }, {
            title: '矿工费',
            field: 'kgPrice',
            render: (v, data) => {
                let kgPrice = moneyFormatMultiply(data.gasPrice, data.gasUsed, '', 'ETH');
                return kgPrice;
            }
        }, {
            field: 'refNo',
            title: '关联订单号'
        }, {
            field: 'creates',
            title: '网络记账时间',
            type: 'datatime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802530',
            searchParams: {
                address: this.address
            }
        });
    }
}

export default DiviAddress;
