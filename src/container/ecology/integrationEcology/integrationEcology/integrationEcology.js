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
class IntegrationEcology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            urlList: {
                'dapp_super_node': '/superNode'
            }
        };
    }

    // componentDidMount() {
    //     this.props.initData(this.state.symbol);
    // }
    componentDidMount() {
        // 直接请求
        Promise.all([
            fetch(625459, {})
        ]).then(([res1]) => {
            this.setState({
                data: res1
            });
        }).catch(() => this.setState(
            {fetching: false}));
    }

    onCardClick = (item) => {
        if(item.action === '9') {
            let username = localStorage.getItem('username');
            let tokenIgo = localStorage.getItem('token_igo');
            let igoUrl = sessionStorage.getItem('apiLoginUrl');
            // window.open(`http://oss.igotest.psctoken.com/verificationPSC?username=${username}&token=${tokenIgo}`);
            window.open(`${igoUrl}/verificationPSC?username=${username}&token=${tokenIgo}`);
        }else {
            // http://localhost:5808/flashManagement
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
                            <Col key={item.id} style={{marginBottom: '30px', width: '30%', float: 'left', marginRight: '30px'}} key='1'>
                                <Card onClick={
                                    () => this.onCardClick(item)
                                }>
                                    <div style={{width: '100%'}}>
                                        <div style={{fontSize: '16px', marginBottom: '10px'}}>{item.name}</div>
                                        <div>{item.name === 'IGO' ? '活跃用户' : '用户量'}： {item.userCount}</div>
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

export default IntegrationEcology;
