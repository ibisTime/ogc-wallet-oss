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
import {showWarnMsg, dateTimeFormat, moneyFormat, showSucMsg} from 'common/js/util';

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
    render() {
        const fields = [{
            field: 'planName',
            title: '期数',
            search: true
        }, {
            field: 'planName1',
            title: '场次'
        }, {
            field: 'batch1',
            title: '币种',
            render: (v, data) => {
                return data.batch;
            }
        }, {
            field: 'batch',
            title: '状态',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            noVisible: true
        }, {
            field: 'status',
            title: '开奖结果',
            type: 'select',
            key: 'snode_plan_status'
        }, {
            field: 'divideCycle',
            title: '开奖赔率'
        }, {
            field: 'startDate',
            title: '开奖时间',
            type: 'datetime'
        }, {
            field: 'endDate',
            title: '涨方投注额',
            type: 'datetime'
        }, {
            field: 'stepAmount',
            title: '跌方投注额',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }];
        return (
            <div className="guessUpsDowns-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610601,
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