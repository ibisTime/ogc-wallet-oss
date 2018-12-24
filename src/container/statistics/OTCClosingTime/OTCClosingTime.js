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
} from '@redux/statistics/OTCClosingTime/OTCClosingTime';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsOTCClosingTime,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OTCClosingTime extends React.Component {
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
            field: 'ccorderMin15Count',
            title: '15分钟内成交量'
        }, {
            field: 'ccorderMin60Count',
            title: '1小时内成交量'
        }, {
            field: 'ccorderMin120Count',
            title: '2小时内成交量'
        }, {
            field: 'ccorderMin1440Count',
            title: '24小时内成交量'
        }, {
            field: 'ccorderMax1440Count',
            title: '24小时以上成交量'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'userId',
            pageCode: '805904'
        });
    }
}

export default OTCClosingTime;
