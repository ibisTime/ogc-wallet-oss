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
class BonusPool extends React.Component {
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
        return (
            <div>
                红利池
            </div>
        );
    }
}

export default BonusPool;