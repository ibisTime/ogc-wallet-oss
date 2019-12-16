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
} from '@redux/parkingSpace/returnsQuery/returnsQuery';
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
        ...state.parkingSpaceReturnsQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ReturnsQuery extends React.Component {
    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
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
            title: '收益类型',
            field: 'type',
            key: 'car_income_type',
            type: 'select',
            search: true
        }, {
            title: '收益子类型',
            field: 'subType',
            key: 'car_income_sub_type',
            type: 'select',
            search: true
        }, {
            title: '收益状态',
            field: 'status',
            key: 'car_income_status',
            type: 'select',
            search: true
        }, {
            title: '收益数量',
            field: 'incomeCount',
            render(v, d) {
                return v && `${v}(${d.symbol})`;
            }
        }, {
            title: '收益时间',
            field: 'incomeTime',
            type: 'datetime'
        }, {
            title: '结算数量',
            field: 'settleCount'
        }, {
            title: '结算时间',
            field: 'settleTime',
            type: 'datetime'
        }, {
            title: '创建时间',
            field: 'createTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 200203
        });
    }
}

export default ReturnsQuery;
