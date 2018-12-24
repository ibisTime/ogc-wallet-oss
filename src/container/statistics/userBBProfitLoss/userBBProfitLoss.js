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
} from '@redux/statistics/userBBProfitLoss/userBBProfitLoss';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsUserBBProfitLoss,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserBBProfitLoss extends React.Component {
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
            field: 'fmvpBtcBtc',
            title: 'BTC'
        }, {
            field: 'fmvpBtcFmvp',
            title: 'FMVP'
        }, {
            field: 'fmvpEthEth',
            title: 'ETH'
        }, {
            field: 'fmvpEthFmvp',
            title: 'FMVP'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805901'
        });
    }
}

export default UserBBProfitLoss;
