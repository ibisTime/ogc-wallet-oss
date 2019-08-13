import React from 'react';
import {Row, Col, Table, Menu, Dropdown, Icon} from 'antd';
import {
    showSucMsg,
    showWarnMsg,
    findDsct,
    moneyFormat,
    dateTimeFormat,
    getUserId
} from 'common/js/util';

import './userStatistics.css';
import headInfoImg from './head.png';
import walletImg from './wallet.png';
import handImg from './hand.png';

import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/userStatistics/userStatistics';
import {listWrapper} from 'common/js/build-list';

import ReactEcharts from 'echarts-for-react';
import {behaviorDistribution, dataDect, flowStatistics, bulkCollectionUserInfo, toDaysWithdrawMoneyCount, flowSelectListOrDetail} from '../../api/statisticalAnalysis';

const columns = [
    {
        title: '发生时间',
        dataIndex: 'payDatetime'
    },
    {
        title: '变动金额',
        dataIndex: 'payUserName'
    },
    {
        title: '变动前金额',
        dataIndex: 'payAmount'

    },
    {
        title: '变动后金额',
        dataIndex: 'fee'
    },
    {
        title: '业务类型',
        dataIndex: 'realAmount'
    },
    {
        title: '关联订单号',
        dataIndex: 'valueUsdPay'
    },
    {
        title: '备注',
        dataIndex: 'payUsdAmount'
    }
];

@listWrapper(
    state => ({
        ...state.userStatistics,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class userStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeTitle: [],
            nodeList: [],
            candyNodeLevels: {},
            coinInfo: 'TOSP',
            userId: 'U20190805162136198150294',
            code: 'QX20190628220104902314385',
            userFlow: {
                balanceAmount: 0,
                totalJourCount: 0,
                accountStatus: '',
                weekJourCount: 0
            },
            userName: '',
            userMobileOrEmail: ''
        };
        this.menu = (
            <Menu>
                <Menu.Item>
            <span onClick={e => this.coinType(['TOSP'])}>
                TOSP
            </span>
                </Menu.Item>
                <Menu.Item>
            <span onClick={e => this.coinType(['TOS'])}>
                TOS
            </span>
                </Menu.Item>
                <Menu.Item>
            <span onClick={e => this.coinType(['JEJU'])}>
                ETH
            </span>
                </Menu.Item>
            </Menu>
        );
    }
    componentDidMount() {
        // 默认显示TOSP全部的行为分布数据
        this.sendDaysSelectList([500, 'TOSP']);
        // 流水条数统计
        flowStatistics(this.state.coinInfo, this.state.userId).then(data => {
            this.setState({
                userFlow: data
            });
        });
        // 散取用户详情
        bulkCollectionUserInfo(this.state.code).then(data => {
            this.setState({
                userName: data.withdraw.applyUserInfo.nickname + '-' + data.withdraw.applyUserInfo.loginName,
                userMobileOrEmail: data.withdraw.applyUserInfo.loginName,
                userCandyNodeLevel: data.withdraw.applyUserInfo.candyNodeLevel,
                userStatus: data.withdraw.applyUserInfo.status,
                userCreateDatetime: dateTimeFormat(data.withdraw.applyUserInfo.createDatetime),
                userAmount: moneyFormat(data.withdraw.amount, '', 'ETH'),
                userFee: moneyFormat(data.withdraw.fee, '', 'ETH'),
                userActualAmount: moneyFormat(data.withdraw.actualAmount, '', 'ETH'),
                userApplyDatetime: dateTimeFormat(data.withdraw.applyDatetime),
                userPayCardNo: data.withdraw.payCardNo.substring(0, (data.withdraw.payCardNo).length / 2 - 6) + '...',
                userCurrency: data.withdraw.currency,
                userBalanceAmount: moneyFormat(data.withdraw.balanceAmount, '', 'ETH'),
                userAccountNumber: data.withdraw.accountNumber
            });
            flowSelectListOrDetail(this.state.userAccountNumber, '3', 1, 2).then(data => {
                this.setState({
                    totalCount: data.totalCount
                });
            });
        });
        // 今日提币数量
        toDaysWithdrawMoneyCount(this.state.code).then(data => {
            this.setState({
                toDayAmount: data.amount,
                toDayIsWarnning: data.isWarnning
            });
        });
    }

    coinType = (e) => {
        this.setState({
            coinInfo: e[0]
        });
        this.sendDaysSelectList(['', e[0]]);
        this.sendUserFlow([e[0]]);
    }

    sendUserFlow = (e) => {
        flowStatistics(e[0], this.state.userId).then(data => {
            this.setState({
                userFlow: data
            });
        });
    }

    sendDaysSelectList = (e) => {
        dataDect('property_distribute').then(data => {
            this.setState({
                candyNodeLevels: data
            });
            behaviorDistribution(e[0], e[1], this.state.userId).then(data => {
                let nodeList = [];
                let nodeTitle = [];
                for(let i = 0; i < data.detailList.length; i++) {
                    nodeTitle[i] = findDsct(this.state.candyNodeLevels, data.detailList[i].type);
                    nodeList.push(
                        {
                            value: data.detailList[i].amount,
                            name: findDsct(this.state.candyNodeLevels, data.detailList[i].type)
                        }
                    );
                }
                this.setState({
                    nodeTitle: [...nodeTitle],
                    nodeList: [...nodeList]
                });
            });
        });
    }
    getOption = () => {
        const {nodeTitle, nodeList} = this.state;
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                top: 36,
                left: 'right',
                data: nodeTitle
            },
            color: ['#1EEDC0', '#FFC961', '#617BFF', '#9861FF'],
            series: [
                {
                    name: '行为分布',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '30%'],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: nodeList,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    }
    notAdopt = () => {
       const inputRmk = this.inputRmk.value;
       console.log('NoinputRmk', inputRmk);
       let param = [];
        param.approveResult = '0';
        param.codeList = [this.state.code];
        param.approveUser = getUserId();
        param.approveNote = inputRmk;
        fetch(802352, param).then(() => {
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        });
    }
    adopt = () => {
        const inputRmk = this.inputRmk.value;
        console.log('inputRmk', inputRmk);
    }
    render() {
        const {
            userFlow,
            userName,
            userMobileOrEmail,
            userCandyNodeLevel,
            userStatus,
            userCreateDatetime,
            userCurrency,
            userAmount,
            userFee,
            userActualAmount,
            userApplyDatetime,
            userPayCardNo,
            userBalanceAmount,
            totalCount,
            toDayAmount,
            toDayIsWarnning,
            userAccountNumber
        } = this.state;
        console.log('jasdasd', userAccountNumber);
        const fields = [{
            field: 'createDatetime',
            title: '发生时间',
            type: 'datetime'
        }, {
            field: 'transAmountString',
            title: '变动金额',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: 'jour_biz_type_user'
        }, {
            field: 'refNo',
            title: '关联订单号'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return(
            <div className="bulkCollectionBody">
                <span className="bulkCollectionTitle">散取基本信息</span>
                <Row className="flexStyleTop">
                    <Col span={17}>
                        <Row>
                            <Col className="applicantInfo" span={8}>
                                <div className="headerLogo">
                                    <img style={{width: '20px', height: '20px'}} src={headInfoImg} />
                                </div>
                                <span className="headerLogoTitle">申请人情况</span>
                                <div className="applicantInfoDetail">
                                    <span>用户姓名：{userName}（<lable style={{color: '#1791FF'}}>{userCandyNodeLevel}</lable>）</span>
                                    <br />
                                    <span>手机号/邮箱：{userMobileOrEmail} </span>
                                    <br />
                                    <span>注册时间：{userCreateDatetime}</span>
                                    <br />
                                    <span>用户状态：<label style={{color: '#02B715'}}>{userStatus}</label></span>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="applicantStatistics">
                                    <Row>
                                        <Col span={8}>
                                            <span>提币数量</span>
                                            <br />
                                            <strong className="euotaLine">{userAmount + ' ' + userCurrency}</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>手续费数量</span>
                                            <br />
                                            <strong className="euotaLine">{userFee + ' ' + userCurrency}</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>实到数量</span>
                                            <br />
                                            <strong className="euotaLine">{userActualAmount + ' ' + userCurrency}</strong>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '55px'}}>
                                        <Col span={8}>
                                            <span>申请时间</span>
                                            <br />
                                            <strong className="euotaLine">{userApplyDatetime}</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>接收地址</span>
                                            <br />
                                            <strong className="euotaLine">{userPayCardNo}</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>今日已提币数量为</span>
                                            <br />
                                            <strong className="euotaLine">{toDayAmount + ' ' + userCurrency}</strong>
                                            <br />
                                            <span style={{color: '#F04848'}}>{toDayIsWarnning ? '已到预警线' : '未到预警线'}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <div className="sendRmk">
                            <textarea ref={input => this.inputRmk = input} placeholder="请输入备注"></textarea>
                            <div className="box">
                                <div className="btnGray">返回</div>
                                <div className="btnGray" style={{marginLeft: '20px', marginRight: '20px'}} onClick={this.notAdopt}>不通过</div>
                                <div className="btnGray" style={{background: 'rgba(23,145,255,1)', color: '#FFFFFF', border: '0px'}} onClick={this.adopt}>通过</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <span className="bulkCollectionTitle">
                    <Dropdown overlay={this.menu}>
                        <span className="ant-dropdown-link">
                          资产分析 <Icon type="down" />
                        </span>
                    </Dropdown>
                </span>
                <Row className="flexStyleTop">
                    <Col span={17}>
                        <Row>
                            <Col className="applicantInfo" style={{height: '300px'}} span={8}>
                                <div className="headerLogo" style={{background: 'rgba(94,95,252,0.1)'}}>
                                    <img style={{width: '20px', height: '20px'}} src={walletImg} />
                                </div>
                                <span className="headerLogoTitle">钱包情况</span>
                                <div className="applicantInfoDetail">
                                    <span>余额</span>
                                    <br />
                                    <span>{moneyFormat(userFlow.balanceAmount, '', 'ETH')}</span>
                                    <br />
                                    <span>流水总计<b> {userFlow.totalJourCount} </b>条</span>
                                    <br />
                                    <span>钱包状态：<label style={{color: '#02B715'}}>{userFlow.accountStatus}</label></span>
                                    <br />
                                    <span>1周内发生 <b> {userFlow.weekJourCount} </b>次流水变动</span>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="applicantStatistics" style={{height: '300px', paddingTop: '28px'}}>
                                    <div className="headerTab" onClick={ e => this.sendDaysSelectList([500, this.state.coinInfo])}>全部</div>
                                    <div className="headerTabOut" onClick={ e => this.sendDaysSelectList([1, this.state.coinInfo])}>今日</div>
                                    <div className="headerTabOut" style={{left: '320px'}} onClick={ e => this.sendDaysSelectList([3, this.state.coinInfo])}>近三日</div>
                                    <div className="headerTabOut" style={{left: '390px'}} onClick={ e => this.sendDaysSelectList([7, this.state.coinInfo])}>近七日</div>
                                    <div className="headerLogo" style={{background: 'rgba(22,206,109,0.1)'}}>
                                        <img style={{width: '20px', height: '20px'}} src={handImg} />
                                    </div>
                                    <span className="headerLogoTitle">行为分布</span>
                                    <ReactEcharts
                                        option={this.getOption()}
                                        style={{height: '100%', width: '100%'}}
                                        className='react_for_echarts' />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}></Col>
                </Row>
                <span className="bulkCollectionTitle">流水明细分析</span>
                <Row className="flexStyleTop">
                    <Col span={17} className="flowingWaterDetail">
                        <Row>
                            <Col span={8}>
                                <span style={{color: '#999999'}}>最近一次提币数量为</span>
                                <br />
                                <strong className="euotaLine" style={{fontSize: '20px'}}>100000.006 BTC</strong>
                                <div className="lineRightIcon" style={{right: '30px'}}></div>
                            </Col>
                            <Col span={8}>
                                <span style={{color: '#999999'}}>最近一次提币时余额为</span>
                                <br />
                                <strong className="euotaLine" style={{fontSize: '20px'}}>{userBalanceAmount + ' ' + userCurrency}</strong>
                                <div className="lineRightIcon" style={{right: '30px'}}></div>
                            </Col>
                            <Col span={8}>
                                <span style={{color: '#999999'}}>截止上次提币流水条数</span>
                                <br />
                                <strong className="euotaLine" style={{fontSize: '20px'}}>{totalCount} 条</strong>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '12px'}}>
                            <Col span={8}>
                                <span style={{color: '#999999'}}>2019-07-30 12:00:00</span>
                            </Col>
                            <Col span={8}>
                                <span style={{color: '#1791FF'}}>查看已对帐流水</span>
                            </Col>
                            <Col span={8}>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}></Col>
                </Row>
                <Row>
                    <Col span={17}>
                        {
                            userAccountNumber ? this.props.buildList({
                                fields,
                                pageCode: 610609,
                                searchParams: {
                                    accountNumber: userAccountNumber,
                                    status: '1'
                                }
                            }) : ''
                        }
                    </Col>
                    <Col span={7}></Col>
                </Row>
            </div>
        );
    }
}

export default userStatistics;
