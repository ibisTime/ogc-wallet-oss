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
            field: 'symbol',
            title: '币种'
        }, {
            field: 'status',
            title: '状态'
        }, {
            field: 'result',
            title: '开奖结果'
        }, {
            field: 'result1',
            title: '开奖赔率'
        }, {
            field: 'createDatetime',
            title: '开奖时间',
            type: 'datatime'
        }, {
            field: 'remark',
            title: '涨方投注额'
        }, {
            field: 'count',
            title: '跌方投注额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 610670,
            rowKey: 'id',
            noSelect: true,
            searchParams: {
                direction: '1',
                nodePlan: '1'
            }
        });
    }
}

export default TotayScene;