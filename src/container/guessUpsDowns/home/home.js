import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
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
} from '@redux/guessUpsDowns/home';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg} from 'common/js/util';
import asyncComponent from 'component/async-component/async-component';
import fetch from 'common/js/fetch';

const { Content } = Layout;

const TotayScene = asyncComponent(() => import('./totayScene/totayScene'));

@listWrapper(
    state => ({
        ...state.GuessUpsDownsHome,
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
            bonusPoolData: []
        };
        this.realTimer = null;
    }
    componentDidMount() {
        // 直接请求
        fetch(620036).then(data => {
            this.setState({
                bonusPoolData: {
                    inAmountUsdt: moneyFormat(data.inAmountUsdt, '4', 'USDT'),
                    outAmountUsdt: moneyFormat(data.outAmountUsdt, '4', 'USDT'),
                    amountUsdt: moneyFormat(data.amountUsdt, '4', 'USDT')
                }
            });
        });
        if(this.realTimer) {
            clearTimeout(this.realTimer);
        }
        this.realTimer = setInterval(() => {
            this.props.getPageData(1, 5, false);
        }, 2000);
    }
    componentWillUnmount() {
        if(this.realTimer) {
            clearTimeout(this.realTimer);
        }
    }
    render() {
        const fields = [{
            field: 'userName',
            title: '投注用户'
        }, {
            field: 'direction',
            title: '投注方向',
            type: 'select',
            data: [{
                key: '1',
                value: '涨'
            }, {
                key: '0',
                value: '跌'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'betAmount',
            title: '投注金额'
        }, {
            field: 'betDatetime',
            title: '投注时间',
            type: 'datetime'
        }];
        const {bonusPoolData} = this.state;
        return (
            <div className="guessUpsDownsHome-wrapper">
                <div className="homeTop">
                    <div className="homeTop-left">
                        <div className="homeTop-left-tit">平台盈亏池（折算成USDT）</div>
                        <div className="homeTop-left-item-wrap">
                            <div className="homeTop-left-item" key='1'>
                                <div className="item-con">
                                    <p>收入总额</p>
                                    <samp>{bonusPoolData.inAmountUsdt}</samp>
                                </div>
                            </div>
                            <div className="homeTop-left-item" key='2'>
                                <div className="item-con">
                                    <p>支出总额</p>
                                    <samp>{bonusPoolData.outAmountUsdt}</samp>
                                </div>
                            </div>
                            <div className="homeTop-left-item" key='3'>
                                <div className="item-con">
                                    <p>利润总额</p>
                                    <samp>{bonusPoolData.amountUsdt}</samp>
                                </div>
                            </div>
                            {/*        ))
                               } */}
                        </div>
                        <div className="homeTop-left-bottom"></div>
                    </div>
                    <div className="homeTop-right">
                        <div className="guessUpsDowns-title-wrap">
                            <p>实时投注记录（无关场次）</p>
                        </div>
                        <div className="homeTop-right-table">
                            {
                                this.props.buildList({
                                    fields,
                                    pageCode: 620017,
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
                            this.props.history.push(`/guessUpsDowns/scene-page?type=1`);
                        }}>查看更多</samp>
                    </div>
                    <div className="guessUpsDownsBonusPool-section">
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route path='/guessUpsDowns' exact component={TotayScene}></Route>
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
