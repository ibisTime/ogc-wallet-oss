import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/statistics/FMVPConsumptionRatio/FMVPConsumptionRatio';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsFMVPConsumptionRatio,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class FMVPConsumptionRatio extends React.Component {
    render() {
        const fields = [{
            title: '用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.nickname;
            }
        }, {
            field: 'mobile',
            title: '手机号'
        }, {
            field: 'email',
            title: '邮箱'
        }, {
            field: 'totalAcceptBuy',
            title: '承兑购买MVP个数'
        }, {
            field: 'totalAcceptSell',
            title: '承兑出售MVP个数'
        }, {
            field: 'totalGameIn',
            title: '游戏转入MVP个数'
        }, {
            field: 'totalGameOut',
            title: '游戏转出MVP个数'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805903'
        });
    }
}

export default FMVPConsumptionRatio;
