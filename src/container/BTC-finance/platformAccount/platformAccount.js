import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin, message} from 'antd';
import {initData} from '@redux/BTC-finance/platformAccount/platformAccount';
import {moneyFormat, getQueryString} from 'common/js/util';

const {Meta} = Card;

@connect(
    state => state.BTCFinancePlatformAccount,
    {initData}
)
class PlatformAccount extends React.Component {
    constructor(props) {
      super(props);
      let symbol = getQueryString('symbol').toLocaleUpperCase();
      this.state = {
        symbol: getQueryString('symbol'),
        accountType: `SYS_ACOUNT_${symbol}`,
        accountTypeCold: `SYS_ACOUNT_${symbol}_COLD`,
        accountTypeHb: `SYS_ACOUNT_${symbol}_HB`,
        accountTypeLhlc: `SYS_ACOUNT_${symbol}_LHLC`,
        accountTypeM: `SYS_ACOUNT_${symbol}_M`
      };
    }
    componentDidMount() {
        this.props.initData(this.state.symbol);
    }

    goFlow(accountNumber) {
        if(accountNumber) {
          this.props.history.push(`/BTC-finance/platformAccount/ledger?isPlat=1&code=${accountNumber}`);
        }else {
          message.warning('暂无资金流水');
        }
    }

    render() {
        const unsettledLoan = this.props.unsettledLoan;
        return (
            <div>
              <div style={{'margin-bottom': '30px'}}>
                <Button onClick={ () => {
                this.props.history.go(-1);
              }}>返回</Button>
              </div>
                <Row>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="冷钱包账户余额" extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeCold] ? unsettledLoan[this.state.accountTypeCold].accountNumber : '')} type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left'}}>
                        <Card title="散取账户余额" extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeM] ? unsettledLoan[this.state.accountTypeM].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeM] ? unsettledLoan[this.state.accountTypeM].accountNumber : '')} type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                </Row>

                <Row>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left'}}>
                        <Card title="盈亏账户余额 " extra={
                            moneyFormat(unsettledLoan[this.state.accountType] ? unsettledLoan[this.state.accountType].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountType] ? unsettledLoan[this.state.accountType].accountNumber : '')} type="primary" style={{marginTop: '15px'}}>资金流水</Button>
                            {/* <Button onClick={() => this.goFlow(unsettledLoan['SYS_ACOUNT_BTC'] ? unsettledLoan['SYS_ACOUNT_BTC'].accountNumber : '')} type="primary" style={{marginTop: '15px', marginLeft: '15px', marginRight: '15px'}}>手续费收入</Button> */}
                        </div>}</Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PlatformAccount;
