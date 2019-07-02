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
            accountTypeYY: 'SYS_USER_MARKETING',
            statistics: {}
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

    goFlow(accountNumber, bizType, symbol, history = 0) {
        if (accountNumber) {
            this.props.history.push(`/BTC-finance/platformAccount/ledger?isPlat=1&code=${accountNumber}&bizType=${bizType}&symbol=${symbol}&history=${history}`);
        } else {
            let msg = history === 1 ? '历史' : '近期';
            message.warning(`暂无${msg}流水`);
        }
    }

    render() {
        const {
            accountTypeSQ, accountTypeCold, accountTypeLhlc,
            accountTypeYK, accountTypeYY, unsettledLoan,
            symbol, statistics, fetching
        } = this.state;
        return (
            <Spin spinning={fetching}>
                <div style={{'marginBottom': '30px'}}>
                    <Button type="primary" ghost onClick={() => {
                        this.props.history.go(-1);
                    }}>返回</Button>
                </div>
                <div className="platform-account-wrapper">
                    <div className="account-topcard">
                        <div className="topcard-item">
                            <div className="topcard-title">{symbol}当日充币总量</div>
                            <div className="topcard-price">{moneyFormat(statistics.totalCharge ? statistics.totalCharge : '0', '', symbol)}</div>
                        </div>
                        <div className="topcard-item">
                            <div className="topcard-title">{symbol}当日提币总量</div>
                            <div className="topcard-price">{moneyFormat(statistics.totalWithdraw ? statistics.totalWithdraw : '0', '', symbol)}</div>
                        </div>
                        <div className="topcard-item">
                            <div className="topcard-title">{symbol}剩余总量</div>
                            <div className="topcard-price">{moneyFormat(statistics.residue ? statistics.residue : '0', '', symbol)}</div>
                        </div>
                        <div className="topcard-item">
                            <div className="topcard-title">JEJU总量</div>
                            <div className="topcard-price">{moneyFormat(statistics.totalJEJU ? statistics.totalJEJU : '0', '', symbol)}</div>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <div className="account-card-title">冷钱包账户余额</div>
                                <div className="account-card-price">{moneyFormat(unsettledLoan[accountTypeCold] ? unsettledLoan[accountTypeCold].amount : '0', '', symbol)}</div>
                                <Button
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeCold] ? unsettledLoan[accountTypeCold].accountNumber : '', 'jour_biz_type_cold', '')}
                                    type="primary">近期流水</Button>
                                <Button
                                    style={{marginLeft: 20}}
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeCold] ? unsettledLoan[accountTypeCold].accountNumber : '', 'jour_biz_type_cold', '', 1)}
                                    type="primary">历史流水</Button>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <div className="account-card-title">散取账户余额</div>
                                <div className="account-card-price">{moneyFormat(unsettledLoan[accountTypeSQ] ? unsettledLoan[accountTypeSQ].amount : '0', '', symbol)}</div>
                                <Button
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeSQ] ? unsettledLoan[accountTypeSQ].accountNumber : '', 'jour_biz_type_withdraw', '')}
                                    type="primary">近期流水</Button>
                                <Button
                                    style={{marginLeft: 20}}
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeSQ] ? unsettledLoan[accountTypeSQ].accountNumber : '', 'jour_biz_type_withdraw', '', 1)}
                                    type="primary">历史流水</Button>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <div className="account-card-title">盈亏账户余额</div>
                                <div className="account-card-price">{moneyFormat(unsettledLoan[accountTypeYK] ? unsettledLoan[accountTypeYK].amount : '0', '', symbol)}</div>
                                <Button
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeYK] ? unsettledLoan[accountTypeYK].accountNumber : '', 'jour_biz_type_income', this.state.symbol)}
                                    type="primary">近期流水</Button>
                                <Button
                                    style={{marginLeft: 20}}
                                    onClick={() => this.goFlow(unsettledLoan[accountTypeYK] ? unsettledLoan[accountTypeYK].accountNumber : '', 'jour_biz_type_income', this.state.symbol, 1)}
                                    type="primary">历史流水</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Spin>
        );
    }
}

export default PlatformAccount;
