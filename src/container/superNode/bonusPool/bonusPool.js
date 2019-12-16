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
} from '@redux/superNode/bonusPool';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg, formatMoney, isUndefined, moneyParse} from 'common/js/util';
import asyncComponent from 'component/async-component/async-component';
import fetch from 'common/js/fetch';
import '../superNode.css';

const BonusPoolRecordIntoNow = asyncComponent(() => import('./bonusPoolRecordIntoNow/bonusPoolRecordIntoNow'));
const BonusPoolRecordIntoPrev = asyncComponent(() => import('./bonusPoolRecordIntoPrev/bonusPoolRecordIntoPrev'));
const { TabPane } = Tabs;

const { Content } = Layout;

@listWrapper(
    state => ({
        ...state.SuperNodeBonusPool,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BonusPool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 调整弹窗是否显示
            adjustPopupShow: false,
            totalAmountData: {
                totalUsdtPrice: 0,
                totalCnyPrice: 0
            },
            selectedData: {},
            adjustPopupFlag: false
        };
    }

    componentDidMount() {
        // 直接请求
        Promise.all([
            // 分红池总额总资产折合
            fetch(610813)
        ]).then(([totalAmountData]) => {
            this.setState({
                totalAmountData
            });
        }).catch(() => this.setState(
            {fetching: false}));
    }

    // 红利池调额
    onHandleAdjust = (item) => {
        this.setState({
            selectedData: item,
            adjustPopupShow: true
        });
    }

    // 红利池调额弹窗-返回
    onAdjustCancel = () => {
        this.setState({
            adjustPopupShow: false,
            adjustPopupFlag: false,
            adjustCount: 0,
            selectedData: {}
        });
        this.props.form.resetFields();
    }

    // 红利池调额弹窗-保存
    onAdjustSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(isUndefined(values.adjustCount)) {
                    this.setState({
                        adjustPopupFlag: true
                    });
                   return false;
                }
                this.setState({
                    adjustPopupFlag: false
                });
                this.doAdjust(values.adjustCount);
            }
        });
    }

    doAdjust = (adjustCount) => {
        // 直接请求
        Promise.all([
            // 调额
            fetch(610660, {
                adjustCount: parseFloat(adjustCount),
                poolId: this.state.selectedData.id
            })
        ]).then(() => {
            this.setState({
                adjustPopupShow: false,
                selectedData: {}
            });
            this.props.form.resetFields();
            this.props.getPageData();
        }).catch(() => {
            this.setState({fetching: false});
            this.props.form.resetFields();
        });
    }

    // 红利池调额弹窗-保存
    validatorAdjustCount = () => {
        return true;
    }

    // 遗留记录
    onLeftOver = (value) => {
        this.props.history.push(`/superNode/bonusPool/leftOver?poolId=${value}`);
    }
    // 调整记录
    onAjt = (value) => {
        this.props.history.push(`/superNode/bonusPool/adjustment?poolId=${value}`);
    }

    render() {
        const {totalAmountData, adjustPopupShow, selectedData, adjustPopupFlag} = this.state;
        const { getFieldDecorator } = this.props.form;

        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '本期资产',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'remainCount',
            title: '上期遗留资产',
            render: (v, data) => {
                return <span>{moneyFormat(v, '', data.symbol)}<samp className="tc_purple" onClick={() => this.onLeftOver(data.id)}>  遗留记录</samp ></span>;
            }
        }, {
            field: 'totalAdjustCount',
            title: '累计调额资产',
            render: (v, data) => {
                return <span>{moneyFormat(v, '', data.symbol)}<samp className="tc_purple" onClick={() => this.onAjt(data.id)}>  调整记录</samp></span>;
            }
        }, {
            field: 'operation',
            title: '操作',
            render: (v, data) => {
                return <samp className="tc_purple" onClick={() => this.onHandleAdjust(data)}>调整</samp>;
            }
        }];

        return (
            <div className="superNode-wrapper">
                <div className="superNodeBonusPool-wrapper">
                    <div className="superNodeBonusPool-section">
                        <div className="superNodeBonusPool-property">
                            <samp>总资产折合</samp>
                            <p>{(totalAmountData.totalUsdtPrice / Math.pow(10, 8)).toFixed(4)} USDT<i>={(parseFloat(totalAmountData.totalCnyPrice).toFixed(2))}CNY</i></p>
                        </div>
                        <div className="superNodeBonusPool-property-tab">
                            {
                                this.props.buildList({
                                    fields,
                                    pageCode: 610811,
                                    rowKey: 'id',
                                    noPagination: true,
                                    noSelect: true,
                                    searchParams: {
                                        type: 'snode'
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="superNodeBonusPool-section" style={{marginTop: '40px'}}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="本期入池记录" key="1">
                                <Layout>
                                    <Content>
                                        <Switch>
                                            <Route path='/superNode/bonusPool' exact component={BonusPoolRecordIntoNow}></Route>
                                        </Switch>
                                    </Content>
                                </Layout>
                            </TabPane>
                            <TabPane tab="上期出池记录" key="2">
                                <Layout>
                                    <Content>
                                        <Switch>
                                            <Route path='/superNode/bonusPool' exact component={BonusPoolRecordIntoPrev}></Route>
                                        </Switch>
                                    </Content>
                                </Layout>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className={adjustPopupShow ? 'adjust-popup' : 'adjust-popup hidden'}>
                        <div className="adjust-popup-mask"></div>
                        <div className="adjust-popup-wrap">
                            <Form onSubmit={this.onAdjustSubmit} className="login-form">
                                <div className="adjust-popup-title">
                                    <p>调整</p>
                                    <Icon type="close-circle" onClick={() => this.onAdjustCancel()}/>
                                </div>
                                <div className={adjustPopupFlag ? 'adjust-popup-content error' : 'adjust-popup-content'}>
                                    <div className="text">币种: {selectedData.symbol}</div>
                                    <div className="text">累计调额: {moneyFormat(selectedData.totalAdjustCount, '', 'ETH')}{selectedData.symbol}</div>
                                    <Form.Item label="额度">
                                        {getFieldDecorator('adjustCount', {
                                            rules: [{
                                                validator: this.validatorAdjustCount
                                            }]
                                        })(
                                            <Input
                                                type="text"
                                                placeholder=""
                                            />
                                        )}
                                    </Form.Item>
                                    <div className="warn">正数表示加额度，负数表示减额度</div>
                                </div>
                                <div className="adjust-popup-button">
                                    <Button onClick={() => this.onAdjustCancel()}>返回</Button>
                                    <Button className={{marginLeft: '82px'}} type="primary" htmlType="submit">保存</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BonusPool;