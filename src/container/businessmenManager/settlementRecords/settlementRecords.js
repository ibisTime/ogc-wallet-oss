import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/businessmenManager/settlementRecords/settlementRecords';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.settlementRecords,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class settlementRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            merchantCode: ''
        };
    }
    render() {
        const fields = [{
            title: '商户',
            field: 'merchantInfo',
            render(v, d) {
                return d.merchantInfo && d.merchantInfo.name + '-' + d.merchantInfo.loginName;
            },
            search: true
        }, {
            title: '币种',
            field: 'settleSymbol'
        }, {
            title: '结算总额',
            field: 'settleAmount',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.settlePayAmount, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '手续费',
            field: 'settleFeeSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, 2, 'ETH') + ' (合 ' + moneyFormat(d.settleFee, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '结算金额',
            field: 'realSettleAmountSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, 2, 'ETH') + ' (合 ' + moneyFormat(d.realSettleAmount, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '结算时间',
            field: 'settleDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610555',
            btnEvent: {
            }
        });
    }
}

export default settlementRecords;
