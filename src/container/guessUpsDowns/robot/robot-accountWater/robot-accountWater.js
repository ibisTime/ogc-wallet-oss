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
} from '@redux/guessUpsDowns/robotAccountWater';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, moneyFormatSubtract, getCoinList, showWarnMsg, getUserId, showSucMsg, moneyParse} from 'common/js/util';
import CustomerEditAmount from 'component/customer-editAmount/customer-editAmount';

@listWrapper(
    state => ({
        ...state.robotAccountWater,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RobotAccountWater extends React.Component {
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
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }, {
            code: 'ledgerQuery',
            name: '近期流水查询',
            handler: (selectedRowKeys, selectedRows) => {
                this.ledgerQuery(selectedRowKeys, selectedRows);
            }
        }, {
            code: 'ledgerQueryHistory',
            name: '历史流水查询',
            handler: (selectedRowKeys, selectedRows) => {
                this.ledgerQueryHistory(selectedRowKeys, selectedRows);
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
            this.props.history.push(`/guessUpsDowns/robot-recent?code=${selectedRowKeys[0]}`);
        }
    };
    // 历史流水查询
    ledgerQueryHistory = (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
        } else {
            this.props.history.push(`/guessUpsDowns/robot-accountHistory?code=${selectedRowKeys[0]}`);
        }
    };
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
        return (<div className="guessUpsDowns-listPage-wrapper">
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

export default RobotAccountWater;
