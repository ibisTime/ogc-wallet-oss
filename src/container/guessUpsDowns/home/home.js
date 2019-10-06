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
    }

    componentDidMount() {
        // 直接请求
        Promise.all([
            // 红利池分页查
            fetch(610661, {
                start: 1,
                limit: 2
            })
        ]).then(([bonusPoolData]) => {
            this.setState({
                bonusPoolData: bonusPoolData.list
            });
            console.log('bonusPoolData', bonusPoolData);
        }).catch(() => this.setState(
            {fetching: false}));
    }

    render() {
        const {bonusPoolData} = this.state;
        const fields = [{
            field: 'symbol',
            title: '投注用户'
        }, {
            field: 'remark',
            title: '方向'
        }, {
            field: 'count',
            title: '下注额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '下注时间',
            type: 'date'
        }];
        return (
            <div className="guessUpsDownsHome-wrapper">
                <div className="homeTop">
                    <div className="homeTop-left">
                        <div className="homeTop-left-tit">平台盈亏池（折算成USDT）</div>
                        <div className="homeTop-left-item-wrap">
                            {/* {
                                bonusPoolData.length > 0 && bonusPoolData.map((item) => ( */}
                                    <div className="homeTop-left-item" key='1'>
                                        <div className="item-con">
                                            <p>收入总额</p>
                                            <samp>5555.00000000</samp>
                                        </div>
                                    </div>
                            <div className="homeTop-left-item" key='2'>
                                <div className="item-con">
                                    <p>支出总额</p>
                                    <samp>2222.00000000</samp>
                                </div>
                            </div>
                            <div className="homeTop-left-item" key='3'>
                                <div className="item-con">
                                    <p>利润总额</p>
                                    <samp>3333.00000000</samp>
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
                                    pageCode: 610670,
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
                    <div className="guessUpsDowns-title-wrap">
                        <p>今日场次</p>
                        <samp onClick={() => {
                            this.props.history.push(`/guessUpsDowns/scene`);
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
