import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'antd';
import {initData} from '@redux/BTC-finance/platformAccount/platformAccount';
import {moneyFormat, getQueryString} from 'common/js/util';
import fetch from 'common/js/fetch';

@connect(
    state => state.integrationEcologyOfficial,
    {initData}
)
class integrationEcologyOfficial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            urlList: {
                'dapp_super_node': '/superNode',
                'dapp_star': '/starLucky',
                'dapp_guess_ups_downs': '/guessUpsDowns',
                'kimii_card': '/card',
                'kimii_mall': '/store'
            }
        };
    }

    // componentDidMount() {
    //     this.props.initData(this.state.symbol);
    // }
    componentDidMount() {
        // 直接请求
        Promise.all([
            fetch(625459, {ecoFlag: 2})
        ]).then(([res1]) => {
            this.setState({
                data: res1
            });
        }).catch(() => this.setState(
            {fetching: false}));
    }

    onCardClick = (item) => {
        if(item.url === '2') {
            let url = window.location.protocol + '//' + window.location.host + '/flashManagement';
            window.open(url);
        }else {
            let url = '';
            if(this.state.urlList[item.url]) {
                url = window.location.protocol + '//' + window.location.host + this.state.urlList[item.url];
            } else {
                url = item.url;
            }
            window.open(url);
        }
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <Row>
                    {
                        data.length > 0 && data.map((item) => (
                            <Col key={item.id} style={{marginBottom: '30px', width: '20%', float: 'left', marginRight: '30px', userSelect: 'none'}} key='1'>
                                <Card onClick={
                                    () => this.onCardClick(item)
                                }>
                                    <div style={{width: '100%', textAlign: 'center'}}>
                                        {item.name}
                                    </div>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

export default integrationEcologyOfficial;
