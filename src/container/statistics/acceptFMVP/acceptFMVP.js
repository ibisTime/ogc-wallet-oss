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
} from '@redux/statistics/acceptFMVP/acceptFMVP';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsAcceptFMVP,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class AcceptFMVP extends React.Component {
    render() {
        const fields = [{
            field: 'categoryName',
            title: '分类'
        }, {
            field: 'peopleCount',
            title: '人数'
        }, {
            field: 'tradeCount',
            title: '次数'
        }, {
            field: 'totalCount',
            title: 'FMVP币数量'
        }];
        return this.props.buildList({
            fields,
            pageCode: '805906'
        });
    }
}

export default AcceptFMVP;
