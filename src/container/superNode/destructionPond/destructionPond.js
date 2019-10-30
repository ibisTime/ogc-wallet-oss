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

const DestructionPondIn = asyncComponent(() => import('./destructionPondIn/destructionPondIn'));
const DestructionPondOut = asyncComponent(() => import('./destructionPondOut/destructionPondOut'));
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
class destructionPond extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 调整弹窗是否显示
            adjustPopupShow: false,
            totalAmountData: {},
            selectedData: {},
            adjustPopupFlag: false,
            setTab: '1'
        };
    }

    componentDidMount() {
        // 直接请求
        Promise.all([
            // 分红池总额总资产折合
            fetch(610673)
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
                if(isUndefined(values)) {
                    this.setState({
                        adjustPopupFlag: true
                    });
                    return false;
                }
                this.setState({
                    adjustPopupFlag: false
                });
                this.doAdjust(values);
            }
        });
    }

    doAdjust = (values) => {
        // 直接请求
        Promise.all([
            // 调额
            fetch(610672, {
                count: parseFloat(values.dtCount * Math.pow(10, 18)),
                poolId: this.state.selectedData.id,
                remark: values.dtRemark
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

    // 备注-保存
    dtRemark = () => {
        return true;
    }
    // 销毁额度-保存
    dtCount = () => {
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
        const {totalAmountData, adjustPopupShow, selectedData, adjustPopupFlag, setTab} = this.state;
        const { getFieldDecorator } = this.props.form;

        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '余额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'countIn',
            title: '入池总额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'countOut',
            title: '销毁(出池)总额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'operation',
            title: '操作',
            render: (v, data) => {
                return <samp className="tc_purple" onClick={() => this.onHandleAdjust(data)}>销毁</samp>;
            }
        }];

        return (
            <div className="superNodeBonusPool-wrapper">
                <div className="superNodeBonusPool-section" style={{marginBottom: '30px'}}>
                    <div className="superNodeBonusPool-property">
                        <samp>总资产折合</samp>
                        <p>{(totalAmountData.totalUsdtPrice / Math.pow(10, 8)).toFixed(4)} USDT<i>={(parseFloat(totalAmountData.totalCnyPrice).toFixed(2))}CNY</i></p>
                    </div>
                    <div className="superNodeBonusPool-property-tab">
                        {
                            this.props.buildList({
                                fields,
                                pageCode: 610661,
                                rowKey: 'id',
                                noPagination: true,
                                noSelect: true,
                                searchParams: {
                                    type: 'snodeDestroy'
                                }
                            })
                        }
                    </div>
                </div>
                <div className="superNodeBonusPool-section">
                    <Tabs defaultActiveKey="1" onChange={(activeKey) => {
                        this.setState({
                            setTab: activeKey
                        });
                    }}>
                        <TabPane tab="入池记录" key="1">
                            <Layout>
                                <Content>
                                    <DestructionPondIn setTab={setTab}/>
                                </Content>
                            </Layout>
                        </TabPane>
                        <TabPane tab="销毁(出池)记录" key="2">
                            <Layout>
                                <Content>
                                    <DestructionPondOut setTab={setTab}/>
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
                                <div className="text">当前余额: {moneyFormat(selectedData.count, '', selectedData.symbol)} {selectedData.symbol}</div>
                                <div className="text">累计销毁: {moneyFormat(selectedData.countOut, '', selectedData.symbol)} {selectedData.symbol}</div>
                                <Form.Item label="销毁金额">
                                    {getFieldDecorator('dtCount', {
                                        rules: [{
                                            validator: this.dtCount
                                        }]
                                    })(
                                        <Input
                                            type="text"
                                            placeholder=""
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="销毁备注">
                                    {getFieldDecorator('dtRemark', {
                                        rules: [{
                                            validator: this.dtRemark
                                        }]
                                    })(
                                        <Input
                                            type="text"
                                            placeholder=""
                                        />
                                    )}
                                </Form.Item>
                            </div>
                            <div className="adjust-popup-button">
                                <Button onClick={() => this.onAdjustCancel()}>返回</Button>
                                <Button className={{marginLeft: '82px'}} type="primary" htmlType="submit">保存</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default destructionPond;
