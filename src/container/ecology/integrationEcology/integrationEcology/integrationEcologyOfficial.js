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
                'dapp_star': '/starLucky'
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
        }else if(item.url === 'dapp_super_node') {
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

export default integrationEcologyOfficial;
