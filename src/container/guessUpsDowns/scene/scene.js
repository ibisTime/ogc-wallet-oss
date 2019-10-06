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
} from '@redux/guessUpsDowns/scene';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsScene,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Scene extends React.Component {
    render() {
        const fields = [{
            field: 'planName',
            title: '期数名称'
        }, {
            field: 'batch1',
            title: '批次',
            render: (v, data) => {
                return data.batch;
            }
        }, {
            field: 'batch',
            title: '期数',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            search: true,
            noVisible: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'snode_plan_status'
        }, {
            field: 'divideCycle',
            title: '分红周期'
        }, {
            field: 'startDate',
            title: '开始时间',
            type: 'datetime'
        }, {
            field: 'endDate',
            title: '结束时间',
            type: 'datetime'
        }, {
            field: 'fullAmount',
            title: '满标数额',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }, {
            field: 'startAmount',
            title: '起购数额',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }, {
            field: 'stepAmount',
            title: '递增数额',
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
                            code: 'userDistribution',
                            name: '用户分布',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/customer?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'nodeDetail',
                            name: '节点明细',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/guessUpsDowns/node?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Scene;