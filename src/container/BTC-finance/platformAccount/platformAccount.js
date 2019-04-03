import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin, message} from 'antd';
import {initData} from '@redux/BTC-finance/platformAccount/platformAccount';
import {moneyFormat, getQueryString} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Meta} = Card;

@connect(
    state => state.BTCFinancePlatformAccount,
    {initData}
)
class PlatformAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            symbol: getQueryString('symbol'),
            accountTypeSQ: `SYS_USER_WITHDRAW`,
            accountTypeCold: `SYS_USER_COLD`,
            accountTypeLhlc: `SYS_USER_LHLC`,
            accountTypeYK: `SYS_USER_INCOME`,
            accountTypeYY: `SYS_USER_MARKETING`
        };
    }

    // componentDidMount() {
    //     this.props.initData(this.state.symbol);
    // }
    componentDidMount() {
        // 直接请求
        this.props.initData(this.state.symbol);
        Promise.all([
            fetch(802832, {
                currency: this.state.symbol
                // type: 'B'
            })
        ]).then(([res1]) => {
            console.log(res1);
            this.setState({
                data: res1,
                data1: res1.totalUnSettleAmount
            });
            this.totalUnSettleAmount = res1.totalUnSettleAmount;
            this.unSettleAmount = moneyFormat(res1.totalUnSettleAmount, '', this.state.symbol);
        }).catch(() => this.setState(
            {fetching: false}));
    }

    goFlow(accountNumber, bizType, symbol) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/ledger?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无资金流水');
        }
    }

    goOrder(accountNumber, bizType, symbol) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/goOrder?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无资金流水');
        }
    }

    // 待结算数量
    goStay(accountNumber, bizType, symbol) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/goStady?&isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无待结算数量');
        }
    }

    goSettlement(accountNumber, bizType, symbol) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/goSettlement?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无资金订单');
        }
    }
    // 奖励明细
    goReward() {
        this.props.history.push(`/user/userrewarddeatil`);
    }

    gomanualsettlement(accountNumber, totalUnSettleAmount, bizType, symbol) {
        console.log(this.totalUnSettleAmount);
        if (this.totalUnSettleAmount > 0) {
            this.props.history.push(`/BTC-finance/platformAccount/manualsettlement?isPlat=1&settleAmount=${this.unSettleAmount}&v=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无结算数量');
        }
    }

    render() {
        const unsettledLoan = this.props.unsettledLoan;
        const {data} = this.state;
        return (
            <div>
                <div style={{'margin-bottom': '30px'}}>
                    <Button onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </div>
                <Row>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="冷钱包账户余额" extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].accountNumber : '', 'jour_biz_type_cold', '')}
                                type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="散取账户余额" extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].accountNumber : '', 'jour_biz_type_withdraw', '')}
                                type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="盈亏账户余额 " extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].accountNumber : '', 'jour_biz_type_income', this.state.symbol)}
                                type="primary">资金流水</Button>
                            {/* <Button onClick={() => this.goFlow(unsettledLoan['SYS_ACOUNT_BTC'] ? unsettledLoan['SYS_ACOUNT_BTC'].accountNumber : '')} type="primary" style={{marginTop: '15px', marginLeft: '15px', marginRight: '15px'}}>手续费收入</Button> */}
                        </div>}</Card>
                    </Col>
                </Row>
                <Row>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="营销账户 " extra={
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeYY] ? unsettledLoan[this.state.accountTypeYY].accountNumber : '', 'jour_biz_type_marketing', this.state.symbol)}
                                type="primary" style={{marginTop: '20px', marginLeft: '50px'}}>本地流水</Button>
                       }>
                            <div style={{width: '100%', marginLeft: '30px', marginTop: '20px'}}>
                                <label>已分发累计总数量:</label>
                                <span
                                    style={{marginLeft: '20px'}}>{moneyFormat(data.totalSendAmount, '', this.state.symbol) + '-' + this.state.symbol}</span>
                                  <Button
                                    onClick={() => this.goReward()}
                                    type="primary" style={{marginTop: '20px', marginLeft: '50px'}}>奖励明细</Button>
                            </div>
                            <div style={{width: '100%', marginLeft: '30px', marginTop: '20px'}}>
                                <label>待审批数量:</label>
                                <span
                                    style={{marginLeft: '20px'}}>{moneyFormat(data.totalApproveAmount, '', this.state.symbol) + '-' + this.state.symbol}</span>
                                <Button
                                    onClick={() => this.goOrder(unsettledLoan[this.state.accountTypeYY] ? unsettledLoan[this.state.accountTypeYY].accountNumber : '', 'jour_biz_type_marketing', this.state.symbol)}
                                    type="primary" style={{marginTop: '20px', marginLeft: '50px'}}>查看订单</Button>
                            </div>
                            <div style={{width: '100%', marginLeft: '30px', marginTop: '20px'}}>
                                <label>待结算数量:</label>
                                <span
                                    style={{marginLeft: '20px'}}>{moneyFormat(data.totalUnSettleAmount, '', this.state.symbol) + '-' + this.state.symbol}</span>
                                <Button
                                    onClick={() => this.goStay(unsettledLoan[this.state.accountTypeYY] ? unsettledLoan[this.state.accountTypeYY].accountNumber : '', 'jour_biz_type_marketing', this.state.symbol)}
                                    type="primary" style={{marginTop: '20px', marginLeft: '50px'}}>查看订单</Button>
                                <Button
                                    onClick={() => this.gomanualsettlement(unsettledLoan[this.state.accountTypeYY] ? unsettledLoan[this.state.accountTypeYY].accountNumber : '', this.totalUnSettleAmount1, 'jour_biz_type_marketing', this.state.symbol)}
                                    type="primary" style={{marginTop: '15px', marginLeft: '85px'}}>手动结算</Button>
                            </div>
                            <div style={{width: '100%', marginLeft: '30px', marginTop: '20px'}}>
                                <label>已结算数量:</label>
                                <span
                                    style={{marginLeft: '20px'}}>{moneyFormat(data.totalSettle, '', this.state.symbol) + '-' + this.state.symbol}</span>
                                <Button
                                    onClick={() => this.goSettlement(unsettledLoan[this.state.accountTypeYY] ? unsettledLoan[this.state.accountTypeYY].accountNumber : '', 'jour_biz_type_income', this.state.symbol)}
                                    type="primary" style={{marginTop: '20px', marginLeft: '50px'}}>查看记录</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PlatformAccount;
