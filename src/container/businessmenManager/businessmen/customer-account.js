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
            code: 'ledgerQuery',
            name: '今日流水查询',
            handler: (selectedRowKeys, selectedRows) => {
                this.ledgerQuery(selectedRowKeys, selectedRows);
            }
        }, {
            code: 'ledgerQueryHistory',
            name: '历史流水查询',
            handler: (selectedRowKeys, selectedRows) => {
                this.ledgerQueryHistory(selectedRowKeys, selectedRows);
            }
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                if (this.isCDealer) {
                    this.props.history.push(`/user/channelDealer`);
                } else {
                    this.props.history.push(`/businessmenManager/businessmen`);
                }
            }
        }];
    }

    // 近期流水查询
    ledgerQuery = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/businessmenManager/businessmen/ledgerQuery?code=${selectedRowKeys[0]}`);
        }
    }

    // 历史流水查询
    ledgerQueryHistory = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/businessmenManager/businessmen/ledgerQueryHistory?code=${selectedRowKeys[0]}`);
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
            render(v) {
                return v;
            }
        }, {
            field: 'accountNumber',
            title: '账号'
        }, {
            field: 'amount',
            title: '余额',
            render: (v, data) => {
                if(data.currency === 'JEJU_CONSUME') {
                    return moneyFormat(v, '', 'ETH');
                }else {
                    return moneyFormat(v, '', data.currency);
                }
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
                    userId: this.userId,
                    isSelectPlatform: '1'
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
