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
} from '@redux/statistics/channelReturnCommission/channelReturnCommission';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsChannelReturnCommission,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChannelReturnCommission extends React.Component {
    render() {
        const fields = [{
            title: '用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'Q'
            },
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
            field: 'totalBtc',
            title: '推荐返币币交易手续费BTC'
        }, {
            field: 'totalEth',
            title: '推荐返币币交易手续费ETH'
        }, {
            field: 'totalFmvp',
            title: '推荐返币币交易手续费MVP'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805902'
        });
    }
}

export default ChannelReturnCommission;
