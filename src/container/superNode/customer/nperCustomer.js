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
} from '@redux/superNode/customer';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatMoney, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeCustomer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.buttons = [{
            code: 'goBack',
            name: '返回',
            handler: () => {
                this.props.history.push('/superNode/periods');
            }
        }, {
            code: 'incomeRecord',
            name: '收益记录',
            handler: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else {
                    this.props.history.push(`/superNode/incomeRecord?userId=${selectedRows[0].userId}`);
                }
            }
        }, {
            code: 'voteRecord',
            name: '投票记录',
            handler: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else {
                    this.props.history.push(`/superNode/voteRecord?userId=${selectedRows[0].userId}`);
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
                    this.props.history.push(`/superNode/buyBackRecord?userId=${selectedRows[0].userId}`);
                }
            }
        }];
    }
    render() {
        const fields = [{
            field: 'planName',
            title: '期数'
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            search: true,
            searchName: 'keyword',
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'totalAmount',
            title: '投票总数',
            render: (v, data) => {
                return formatMoney(v, '', '1000000000000000000') + ' PSC';
            }
        }, {
            field: 'totalIncome',
            title: '总收益',
            render: (v, data) => {
                return formatMoney(v, '', '100000000') + ' USDT';
            }
        }, {
            field: 'nodeIncome',
            title: '节点分红',
            render: (v, data) => {
                return formatMoney(v, '', '100000000') + ' USDT';
            }
        }, {
            field: 'inviteIncome',
            title: '推荐奖励',
            render: (v, data) => {
                return formatMoney(v, '', '100000000') + ' USDT';
            }
        }, {
            field: 'totalTax',
            title: '总税金',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC') + ' PSC';
            }
        }, {
            field: 'batch',
            title: '期数',
            type: 'select',
            listCode: '610642',
            keyName: 'batch',
            valueName: '{{planName.DATA}}',
            search: true,
            noVisible: true
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610640,
                        searchParams: {
                            nodePlanCode: this.code
                        },
                        buttons: this.buttons
                    })
                }
            </div>
        );
    }
}

export default Customer;
