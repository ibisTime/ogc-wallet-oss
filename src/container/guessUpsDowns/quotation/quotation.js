import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin, message, Tag, Progress,
    Tabs, Layout, Icon, Form, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/guessUpsDowns/quotation';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg, formatMoney, isUndefined, moneyParse} from 'common/js/util';
import asyncComponent from 'component/async-component/async-component';
import fetch from 'common/js/fetch';

const QuotationShortTerm = asyncComponent(() => import('./quotationShortTerm/quotationShortTerm'));
const QuotationHistory = asyncComponent(() => import('./quotationHistory/quotationHistory'));
const { TabPane } = Tabs;

const { Content } = Layout;

@listWrapper(
    state => ({
        ...state.GuessUpsDownsQuotation,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Quotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="guessUpsDownsBonusPool-wrapper">
                <div className="guessUpsDownsBonusPool-section">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="近期行情" key="1">
                            <Layout>
                                <Content>
                                    <Switch>
                                        <Route path='/guessUpsDowns/quotation' exact component={QuotationShortTerm}></Route>
                                    </Switch>
                                </Content>
                            </Layout>
                        </TabPane>
                        <TabPane tab="历史行情" key="2">
                            <Layout>
                                <Content>
                                    <Switch>
                                        <Route path='/guessUpsDowns/quotation' exact component={QuotationHistory}></Route>
                                    </Switch>
                                </Content>
                            </Layout>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Quotation;
