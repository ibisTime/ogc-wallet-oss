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
      this.state = {
        symbol: getQueryString('symbol'),
        accountTypeSQ: `SYS_USER_WITHDRAW`,
        accountTypeCold: `SYS_USER_COLD`,
        accountTypeLhlc: `SYS_USER_LHLC`,
        accountTypeYK: `SYS_USER_INCOME`
      };
    }
    componentDidMount() {
        this.props.initData(this.state.symbol);
    }

    goFlow(accountNumber) {
      console.log(accountNumber);
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
                            moneyFormat(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeSQ] ? unsettledLoan[this.state.accountTypeSQ].accountNumber : '')} type="primary">资金流水</Button>
                        </div>}</Card>
                    </Col>
                </Row>

                <Row>
                    <Col style={{marginBottom: '30px', width: '390px', float: 'left', marginRight: '30px'}}>
                        <Card title="盈亏账户余额 " extra={
                            moneyFormat(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].amount : '0', '', this.state.symbol)
                        }>{<div style={{width: '100%', textAlign: 'center'}}>
                            <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeYK] ? unsettledLoan[this.state.accountTypeYK].accountNumber : '')} type="primary" style={{marginTop: '15px'}}>资金流水</Button>
                            {/* <Button onClick={() => this.goFlow(unsettledLoan['SYS_ACOUNT_BTC'] ? unsettledLoan['SYS_ACOUNT_BTC'].accountNumber : '')} type="primary" style={{marginTop: '15px', marginLeft: '15px', marginRight: '15px'}}>手续费收入</Button> */}
                        </div>}</Card>
                    </Col>
                  <Col style={{marginBottom: '30px', width: '390px', float: 'left'}}>
                    <Card title="量化理财账户余额 " extra={
                      moneyFormat(unsettledLoan[this.state.accountTypeLhlc] ? unsettledLoan[this.state.accountTypeLhlc].amount : '0', '', this.state.symbol)
                    }>{<div style={{width: '100%', textAlign: 'center'}}>
                      <Button onClick={() => this.goFlow(unsettledLoan[this.state.accountTypeLhlc] ? unsettledLoan[this.state.accountTypeLhlc].accountNumber : '')} type="primary" style={{marginTop: '15px'}}>资金流水</Button>
                      {/* <Button onClick={() => this.goFlow(unsettledLoan['SYS_ACOUNT_BTC'] ? unsettledLoan['SYS_ACOUNT_BTC'].accountNumber : '')} type="primary" style={{marginTop: '15px', marginLeft: '15px', marginRight: '15px'}}>手续费收入</Button> */}
                    </div>}</Card>
                  </Col>
                </Row>
            </div>
        );
    }
}

export default PlatformAccount;
