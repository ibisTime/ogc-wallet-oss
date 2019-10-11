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
} from '@redux/guessUpsDowns/totayScene';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsTotayScene,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TotayScene extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '名称'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'period',
            title: '期数'
        }, {
            field: 'bettingStartTime',
            title: '投注开始时间',
            type: 'datetime'
        }, {
            field: 'bettingEndTime',
            title: '投注截止时间',
            type: 'datetime'
        }, {
            field: 'closeStartTime',
            title: '封闭开始时间',
            type: 'datetime'
        }, {
            field: 'closeEndTime',
            title: '封闭截止时间',
            type: 'datetime'
        }, {
            field: 'openTime',
            title: '开奖时间',
            type: 'datetime'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'open_reward_status',
            search: this.isPageCode
        }, {
            field: 'roseBetAmount',
            title: '涨方投注额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'fallBetAmount',
            title: '跌方投注额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 620013,
            noSelect: true
        });
    }
}

export default TotayScene;