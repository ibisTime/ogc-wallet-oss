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
                return d.merchantInfo && d.merchantInfo.name + '-' + d.merchantInfo.mobile;
            },
            search: true
        }, {
            title: '实到TOSP',
            field: 'settleAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '折合（USD）',
            field: 'settleUsdAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '折合（KRW）',
            field: 'settlePayAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '结算手续费',
            field: 'settleFee',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '实到KRW',
            field: 'realSettleAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
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
