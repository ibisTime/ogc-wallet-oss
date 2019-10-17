import React from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import {Card, Row, Col, Button, Spin, message, Tag, Progress, Layout} from 'antd';
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
import TotayScene from './totayScene';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg} from 'common/js/util';
import fetch from 'common/js/fetch';

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
            bonusPoolData: {},
            starData: {}
        };
    }

    componentDidMount() {
        // 直接请求
        fetch('640003', {
            start: 1,
            limit: 1
        }).then(data => {
            const obj = data.list ? data.list[0] : '';
            if(obj) {
                this.setState({
                    starData: {
                        ...obj,
                        count: moneyFormat(obj.pool.count, '', obj.symbol),
                        countIn: moneyFormat(obj.pool.countIn, '', obj.symbol),
                        countOut: moneyFormat(obj.pool.countOut, '', obj.symbol)
                    }
                });
            }
        });
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
        const {starData} = this.state;
        const fields = [{
            field: 'starName',
            title: '星球名称',
            render(v, d) {
                return v && `${v}(${d.symbol})`;
            }
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'frozenAmount',
            title: '数额',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '参与时间',
            type: 'datetime'
        }];
        return (
            <div className="guessUpsDownsHome-wrapper">
                <div className="homeTop">
                    <div className="homeTop-left">
                        <div className="homeTop-left-tit">{starData.name}({starData.symbol})奖池</div>
                        <div className="homeTop-left-item-wrap">
                            <div className="homeTop-left-item" key='1'>
                                <div className="item-con">
                                    <p>进池总额</p>
                                    <samp>{starData.countIn}</samp>
                                </div>
                            </div>
                            <div className="homeTop-left-item" key='2'>
                                <div className="item-con">
                                    <p>出池总额</p>
                                    <samp>{starData.countOut}</samp>
                                </div>
                            </div>
                            <div className="homeTop-left-item" key='3'>
                                <div className="item-con">
                                    <p>余额</p>
                                    <samp>{starData.count}</samp>
                                </div>
                            </div>
                        </div>
                        <div className="homeTop-left-bottom"></div>
                    </div>
                    <div className="homeTop-right">
                        <div className="guessUpsDowns-title-wrap">
                            <p>实时参与记录</p>
                        </div>
                        <div className="homeTop-right-table">
                            {
                                this.props.buildList({
                                    fields,
                                    pageCode: 640040,
                                    noPagination: true,
                                    noSelect: true,
                                    searchParams: {
                                        limit: 5
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="homeContent">
                    <div className="guessUpsDowns-title-wrap">
                        <p>今日场次</p>
                        <samp onClick={() => {
                            this.props.history.push(`/starLucky/starQuery?origin=home`);
                        }}>查看更多</samp>
                    </div>
                    <div className="guessUpsDownsBonusPool-section">
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route path='/starLucky' exact component={TotayScene}></Route>
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
