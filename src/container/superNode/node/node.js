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
} from '@redux/superNode/node';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeNode,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Node extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'nodePlanName',
            title: '期数'
        }, {
            field: 'orderNo',
            title: '节点',
            type: 'select',
            data: [{
                key: '1',
                value: '1号节点'
            }, {
                key: '2',
                value: '2号节点'
            }, {
                key: '3',
                value: '3号节点'
            }, {
                key: '4',
                value: '4号节点'
            }, {
                key: '5',
                value: '5号节点'
            }, {
                key: '6',
                value: '6号节点'
            }, {
                key: '7',
                value: '7号节点'
            }, {
                key: '8',
                value: '8号节点'
            }, {
                key: '9',
                value: '9号节点'
            }, {
                key: '10',
                value: '10号节点'
            }],
            keyName: 'key',
            valueName: 'value',
            render: (v, data) => {
                return v + '号节点';
            },
            search: true
        }, {
            field: 'fullAmount',
            title: '总量',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }, {
            field: 'payAmount',
            title: '已投数量',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
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
            field: 'symbol',
            title: '币种'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'snode_status'
        }, {
            field: 'nodeDate',
            title: '生成时间'
        }, {
            field: 'openDatetime',
            title: '开启时间',
            type: 'datetime'
        }, {
            field: 'fullDatetime',
            title: '满标时间',
            type: 'datetime'
        }, {
            field: 'nodeRank',
            title: '排名'
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610610,
                        searchParams: {
                            nodePlanCode: this.code
                        },
                        buttons: [{
                            code: 'voteDistribution',
                            name: '节点投票分布',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/superNode/voteDistribution?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default Node;