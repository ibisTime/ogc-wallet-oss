import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/superNode/home';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg} from 'common/js/util';
import fetch from 'common/js/fetch';
import {Layout} from 'antd';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from 'component/async-component/async-component';

const entryLogTop = asyncComponent(() => import('./dailyReport'));
const { Content } = Layout;

@listWrapper(
    state => ({
        ...state.SuperNodeHome,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // ("0", "未开启"),("1", "已开启未满标"),("2","已满标");
            nodeStatusDict: {
                '0': '未开启',
                '1': '正在投票',
                '2': '已满标'
            },
            nodeStatusColor: {
                '0': 'gray',
                '1': 'blue',
                '2': 'red'
            },
            bonusPoolData: [],
            nodeData: []
        };
    }

    componentDidMount() {
        // 直接请求
        Promise.all([
            // 红利池分页查
            fetch(800020)
        ]).then(([bonusPoolData]) => {
            this.setState({
                bonusPoolData: bonusPoolData
            });
            console.log('bonusPoolData', bonusPoolData);
        }).catch(() => this.setState(
            {fetching: false}));
    }

    // 格式化节点投标金额
    nodeNowAmount = (item) => {
        let amount = item.leftAmount;
        if (item.status === '2') {
            amount = item.nowAmount;
        }
        let nowAmount = moneyFormat(amount, 4, item.symbol, true, true);
        if (nowAmount / 10000 > 1) {
            nowAmount = nowAmount / 10000 + '万';
        }
        return nowAmount;
    }

    render() {
        const {bonusPoolData} = this.state;
        const fields = [{
            field: 'symbolPair',
            title: '交易对'
        }, {
            field: 'countOutTotal',
            title: '总兑出数量'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'countOut',
            title: '实际兑出数量'
        }, {
            field: 'countIn',
            title: '兑入数量'
        }];
        return (
            <div className="superNodeHome-wrapper">
                <div className="homeTop">
                    <div className="homeTop-left">
                        <div className="homeTop-left-tit">币种统计</div>
                        <div className="homeTop-left-item-wrap">
                            {
                                bonusPoolData.map((item) => (
                                    <div style={{height: '50px'}}>
                                        <strong style={{marginRight: '20px', fontSize: '16px'}}>{item.symbol}</strong>
                                        <span style={{marginRight: '20px'}}>兑入:{item.countIn}</span>
                                        <span style={{marginRight: '20px'}}>兑出:{item.countOut}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="homeTop-left-bottom"></div>
                    </div>
                    <div className="homeTop-right">
                        <div className="superNode-title-wrap">
                            <p>交易对统计</p>
                            <samp onClick={() => {
                                this.props.history.push(`/flashManagement/dailyActList`);
                            }}>查看更多</samp>
                        </div>
                        <div className="homeTop-right-table">
                            {
                                this.props.buildList({
                                    fields,
                                    pageCode: 800021,
                                    rowKey: 'id',
                                    noPagination: true,
                                    noSelect: true,
                                    searchParams: {
                                        limit: 4
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="homeContent">
                    <div className="superNode-title-wrap">
                        <p>交易对兑换报表</p>
                    </div>
                    <div>
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route path='/flashManagement' exact component={entryLogTop}></Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
