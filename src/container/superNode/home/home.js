import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin, message} from 'antd';
import {initData} from '@redux/BTC-finance/platformAccount/platformAccount';
import {moneyFormat, getQueryString} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Meta} = Card;

@connect(
    state => state.IntegrationEcology,
    {initData}
)
class Home extends React.Component {
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
        // this.props.initData(this.state.symbol);
        // Promise.all([
        //     fetch(802832, {
        //         currency: this.state.symbol
        //         // type: 'B'
        //     })
        // ]).then(([res1]) => {
        //     this.setState({
        //         data: res1,
        //         data1: res1.totalUnSettleAmount
        //     });
        //     this.totalUnSettleAmount = res1.totalUnSettleAmount;
        //     this.unSettleAmount = moneyFormat(res1.totalUnSettleAmount, '', this.state.symbol);
        // }).catch(() => this.setState(
        //     {fetching: false}));
    }

    onCardClick = (urlname) => {
        let url = window.location.protocol + '//' + window.location.host + urlname;
        window.open(url);
    }

    render() {
        const unsettledLoan = this.props.unsettledLoan || {};
        const unsettedList = Object.values(unsettledLoan);
        const {data} = this.state;
        return (
            <div>
                {/* <Row>
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
                </Row> */}
                <Row>
                    <Col style={{marginBottom: '30px', width: '30%', float: 'left', marginRight: '30px'}} key='1'>
                        <Card onClick={
                            () => this.onCardClick('/superNode')
                        }>
                            <div style={{width: '100%'}}>
                                <div style={{fontSize: '16px', marginBottom: '10px'}}>超级节点</div>
                                <div>用户量： 1000</div>
                            </div>
                        </Card>
                    </Col>
                    <Col style={{marginBottom: '30px', width: '30%', float: 'left', marginRight: '30px'}} key='2'>
                        <Card onClick={
                            () => this.onCardClick('/igo')
                        }>
                            <div style={{width: '100%'}}>
                                <div style={{fontSize: '20px', marginBottom: '5px'}}>iGO</div>
                                <div>用户量： 1000</div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;