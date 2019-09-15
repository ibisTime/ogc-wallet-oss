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
} from '@redux/superNode/voteRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeVoteRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class VoteRecord extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.userId = getQueryString('userId', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'nodePlanName',
            title: '期数'
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true
            // render: (v, data) => {
            //     return data.user.mobile ? data.nickname + '-' + data.user.mobile : data.nickname + '-' + data.user.email;
            // }
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
            field: 'amount',
            title: '票数',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
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
            field: 'createTime',
            title: '投票时间',
            type: 'datetime'
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610621,
                        searchParams: {
                            nodeCode: this.code,
                            userId: this.userId
                        },
                        buttons: [{
                            code: 'goBack',
                            name: '返回',
                            handler: (selectedRowKeys, selectedRows) => {
                                this.props.history.go(-1);
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default VoteRecord;