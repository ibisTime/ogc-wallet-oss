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
} from '@redux/parkingSpace/userSpaceStatistical/userSpaceStatistical';
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
        ...state.parkingSpaceUserSpaceStatistical,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserSpaceStatistical extends React.Component {
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
                return d && d.loginName;
            }
        }, {
            field: 'level',
            title: '统计层数'
        }, {
            title: '伞下用户车位数',
            field: 'totalQuantity'
        }, {
            title: '直推用户车位满位人数',
            field: 'firstFullQuantity'
        }, {
            field: 'date',
            title: '日期',
            type: 'date'
        }, {
            field: 'totalQuantityStart',
            title: '大于等于名下车位数',
            search: true,
            noVisible: true
        }, {
            title: '大于等于直推用户车位满位人数',
            field: 'firstFullQuantityStart',
            search: true,
            noVisible: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: 200290
        });
    }
}

export default UserSpaceStatistical;
