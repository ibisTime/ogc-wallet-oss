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
} from '@redux/guessUpsDowns/scenePage';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsScenePage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ScenePage extends React.Component {
    code = getQueryString('code', this.props.location.search);
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
            search: true
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
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 620013,
                        searchParams: {
                            'rewardTermCode': this.code
                        },
                        buttons: [{
                            code: 'goBack',
                            name: '返回',
                            handler: () => {
                                this.props.history.go(-1);
                            }
                        }, {
                            code: 'bettingRecord',
                            name: '投注记录',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/scene-record?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default ScenePage;