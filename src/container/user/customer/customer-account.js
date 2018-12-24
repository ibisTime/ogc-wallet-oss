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
} from '@redux/user/customer/customer-account';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, moneyFormatSubtract, getCoinList, showWarnMsg, getUserId, showSucMsg, moneyParse} from 'common/js/util';
import CustomerEditAmount from 'component/customer-editAmount/customer-editAmount';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.userCustomerAccount,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CustomerAccount extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || '';
        this.isCDealer = !!getQueryString('isCDealer', this.props.location.search);// 是否是渠道商管理点击进入
        this.state = {
            // 窗口是否显示
            isVisible: false,
            accountNumber: '',
            coin: ''
        };
        this.buttons = [];
        this.buttons = [{
            code: 'editAmount',
            name: '调账',
            handler: (selectedRowKeys, selectedRows) => {
                if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                } else {
                    this.setState({
                        accountNumber: selectedRowKeys[0],
                        coin: selectedRows[0].currency
                    });
                    this.editAmount(true);
                }
            }
        }, {
            code: 'accountSummary',
            name: '账户概要',
            handler: (selectedRowKeys, selectedRows) => {
                this.accountSummary(selectedRowKeys, selectedRows);
            }
        }, {
            code: 'ledgerQuery',
            name: '流水查询',
            handler: (selectedRowKeys, selectedRows) => {
                this.ledgerQuery(selectedRowKeys, selectedRows);
            }
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                if (this.isCDealer) {
                    this.props.history.push(`/user/channelDealer`);
                } else {
                    this.props.history.push(`/user/customer`);
                }
            }
        }];
    }

    // 调账
    editAmount = (flag, param) => {
        // 操作
        if (!flag && param) {
            let data = {};
            data.accountNumber = this.state.accountNumber;
            data.direction = param.direction;
            data.amount = param.amount;
            data.updater = getUserId();
            this.props.doFetching();
            fetch(802380, data).then(() => {
                this.setState({
                    isVisible: flag
                });
                showSucMsg('操作成功');
                this.props.cancelFetching();
                setTimeout(() => {
                    this.props.getPageData();
                }, 1000);
            }).catch(this.props.cancelFetching);
        } else {
            // 显示
            this.setState({
                isVisible: flag
            });
        }
    }

    // 流水查询
    ledgerQuery = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/user/customer/ledgerQuery?code=${selectedRowKeys[0]}`);
        }
    }

    // 账户概要
    accountSummary = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/user/customer/accountSummary?userId=${selectedRows[0].userId}&coin=${selectedRows[0].currency}`);
        }
    }

    render() {
        const fields = [{
            field: 'realName',
            title: '户名',
            noVisible: !!this.userId
        }, {
            field: 'currency',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'accountNumber',
            title: '账号'
        }, {
            field: 'amount',
            title: '余额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'frozenAmount',
            title: '冻结金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'availableAmount',
            title: '可用余额',
            render: (v, data) => {
                var amount = data.amount;
                var frozenAmount = data.frozenAmount;

                return moneyFormatSubtract(amount, frozenAmount, '', data.currency);
            }
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (<div>
            {this.props.buildList({
                fields,
                rowKey: 'accountNumber',
                pageCode: '802300',
                searchParams: {
                    kind: '0',
                    userId: this.userId
                },
                buttons: this.buttons
            })}
            <CustomerEditAmount
                isVisible={this.state.isVisible}
                setModalVisible={this.editAmount}
                coin={this.state.coin}
                onOk={() => {
                    this.editAmount(false);
                }}/>
        </div>);
    }
}

export default CustomerAccount;
