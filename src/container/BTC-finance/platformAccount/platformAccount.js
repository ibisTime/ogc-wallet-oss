import React from 'react';
import {Card, Spin, Row, Col, Button, message} from 'antd';
import {moneyFormat, getQueryString} from 'common/js/util';
import fetch from 'common/js/fetch';
import {getPageAccount} from 'api/account';
import './index.css';

class PlatformAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            symbol: getQueryString('symbol'),
            unsettledLoan: [],
            accountTypeSQ: 'SYS_USER_WITHDRAW',
            accountTypeCold: 'SYS_USER_COLD',
            accountTypeLhlc: 'SYS_USER_LHLC',
            accountTypeYK: 'SYS_USER_INCOME',
            accountTypeYY: 'SYS_USER_MARKETING'
        };
    }

    componentDidMount() {
        // 直接请求
        Promise.all([
            getPageAccount({
                currency: this.state.symbol,
                type: 'P'
            }),
            fetch(802305, {
                currency: this.state.symbol
            })
        ]).then(([res1, res2]) => {
            let unsettledLoan = {};
            res1.list.map(d => {
                unsettledLoan[d.userId] = d;
            });
            this.setState({
                unsettledLoan,
                fetching: false
            });
        }).catch(() => this.setState({ fetching: false }));
    }

    goFlow(accountNumber, bizType, symbol) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/ledger?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}`);
        } else {
            message.warning('暂无资金流水');
        }
    }

    render() {
        const { unsettledLoan, fetching } = this.state;
        return (
            <Spin spinning={fetching}>
                <div style={{'marginBottom': '30px'}}>
                    <Button type="primary" ghost onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </div>
                <Row className="platform-account-wrapper">
                    <Col style={{width: '380px', float: 'left', marginRight: '30px'}}>
                        <Card>
                            <div>
                                <div className="account-card-title">冷钱包账户余额</div>
                                <div className="account-card-price">{moneyFormat(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].amount : '0', '', this.state.symbol)}</div>
                                <Button
                                    onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].accountNumber : '', 'jour_biz_type_cold', '')}
                                    type="primary">资金流水</Button>
                            </div>
                        </Card>
                    </Col>
                    <Col style={{width: '380px', float: 'left', marginRight: '30px'}}>
                        <Card title="散取账户余额" extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].accountNumber : '', 'jour_biz_type_withdraw', '')}
                                type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                    <Col style={{width: '380px', float: 'left', marginRight: '30px'}}>
                        <Card title="盈亏账户余额 " extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button
                                onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].accountNumber : '', 'jour_biz_type_income', this.state.symbol)}
                                type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                </Row>
            </Spin>
        );
    }
}

export default PlatformAccount;
