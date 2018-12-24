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
} from '@redux/statistics/userHoldingCurrency/userHoldingCurrency';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsUserHoldingCurrency,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserHoldingCurrency extends React.Component {
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
            field: 'currency',
            title: '持有币种'
        }, {
            field: 'amount',
            title: '持有币的数量'
        }, {
            field: 'cnyPrice',
            title: '单价(CNY)'
        }, {
            field: 'cnyAssets',
            title: '总价值（CNY）'
        }, {
            field: 'usdAssets',
            title: '折合USD'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'accountNumber',
            pageCode: '805900'
        });
    }
}

export default UserHoldingCurrency;
