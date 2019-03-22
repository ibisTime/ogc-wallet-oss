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
    getUserName
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
            field: 'applyUser',
            render: (v, d) => {
                return d.userInfo ? d.userInfo.nickname : '';
            }
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
            field: 'applyDatetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 802812,
            searchParams: {
                status: 2
            }
        });
    }
}

export default StadySettlement;
