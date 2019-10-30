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
} from '@redux/superNode/voteDistribution';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeVoteDistribution,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class VoteDistribution extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'planName',
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
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'totalAmount',
            title: '总票数',
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
            field: 'totalRedeemAmount',
            title: '赎回总数',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC');
            }
        }, {
            field: 'symbol',
            title: '币种',
            render: (v, data) => {
                return 'PSC';
            }
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610630,
                        searchParams: {
                            nodeCode: this.code
                        },
                        buttons: [{
                            code: 'voteRecord',
                            name: '投票记录',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/superNode/voteRecord?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'buyBackRecord',
                            name: '赎回记录',
                            handler: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    this.props.history.push(`/superNode/buyBackRecord?code=${selectedRowKeys[0]}`);
                                }
                            }
                        }, {
                            code: 'goBack',
                            name: '返回',
                            handler: (selectedRowKeys, selectedRows) => {
                                this.props.history.push(`/superNode/node`);
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default VoteDistribution;
