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
} from '@redux/statistics/gameFMVP/gameFMVP';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsGameFMVP,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GameFMVP extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '类型'
        }, {
            field: 'count',
            title: '数量'
        }];
        return this.props.buildList({
            fields,
            noSelect: true,
            pageCode: '805909'
        });
    }
}

export default GameFMVP;
