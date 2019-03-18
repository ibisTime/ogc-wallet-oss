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
} from '@redux/marketsettlement/platformrecord';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.PlatFormRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Otcpayment extends React.Component {
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
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
            pageCode: 802831
        });
    }
}

export default Otcpayment;
