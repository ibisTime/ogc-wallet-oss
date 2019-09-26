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
            this.setState({
                data: res1,
                data1: res1.totalUnSettleAmount
            });
            this.totalUnSettleAmount = res1.totalUnSettleAmount;
            this.unSettleAmount = moneyFormat(res1.totalUnSettleAmount, '', this.state.symbol);
        }).catch(() => this.setState(
            {fetching: false}));
    }

    goFlow(accountNumber, bizType, symbol, type = 0) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/ledger?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}&type=${type}`);
        } else {
            if(type) {
                message.warning('暂无历史流水');
            }else {
                message.warning('暂无资金流水');
            }
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
        if (this.totalUnSettleAmount > 0) {
            this.props.history.push(`/BTC-finance/platformAccount/manualsettlement?isPlat=1&settleAmount=${this.unSettleAmount}&v=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无结算数量');
        }
    }

    render() {
        const unsettledLoan = this.props.unsettledLoan || {};
        const unsettedList = Object.values(unsettledLoan);
        console.log('unsettedList', unsettedList);
        const {data} = this.state;
        return (
            <div>
                <div style={{marginBottom: '30px'}}>
                    <Button onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </div>
                <Row>
                    {
                        unsettedList.length > 0 && unsettedList.map((item) => (
                          <Col style={{marginBottom: '30px', width: '30%', float: 'left', marginRight: '30px'}} key={item.userId}>
                              <Card title={item.accountName} extra={
                                  moneyFormat(item.amount.toString(), '', item.currency)
                              }>{<div style={{width: '100%', textAlign: 'center'}}>
                                  <Button
                                    onClick={() => this.goFlow(item.accountNumber, item.accountBizTypeKey, '')}
                                    type="primary">资金流水</Button>
                                  <Button
                                    style={{marginLeft: '50px'}}
                                    onClick={
                                        () => this.goFlow(item.accountNumber, item.accountBizTypeKey, item.currency, 'hos')
                                    }
                                    type="primary">历史流水</Button>
                              </div>}</Card>
                          </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

export default PlatformAccount;
