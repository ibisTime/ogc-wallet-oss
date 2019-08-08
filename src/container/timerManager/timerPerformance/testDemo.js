import React from 'react';
import {Row, Col, Table} from 'antd';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

import './testDemo.css';
import headInfoImg from './head.png';
import walletImg from './wallet.png';
import handImg from './hand.png';

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

class testDemo extends React.Component {
    render() {
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
                                    <span>用户姓名：张三（<lable style={{color: '#1791FF'}}>一星会员</lable>）</span>
                                    <br />
                                    <span>手机号码：18838902865</span>
                                    <br />
                                    <span>注册时间：2019-07-28 20:00:00</span>
                                    <br />
                                    <span>用户状态：<label style={{color: '#02B715'}}>正常</label></span>
                                    <br />
                                    <span>1周内共登录<b> 5 </b>次</span>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="applicantStatistics">
                                    <Row>
                                        <Col span={8}>
                                            <span>提币数量</span>
                                            <br />
                                            <strong className="euotaLine">100000.006 BTC</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>手续费数量</span>
                                            <br />
                                            <strong className="euotaLine">80.002 BTC</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>实到数量</span>
                                            <br />
                                            <strong className="euotaLine">90892.001 BTC</strong>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '55px'}}>
                                        <Col span={8}>
                                            <span>申请时间</span>
                                            <br />
                                            <strong className="euotaLine">2019-07-30 12:00:00</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>接收地址</span>
                                            <br />
                                            <strong className="euotaLine">ghjkiuyhhnndee2h</strong>
                                            <div className="lineRightIcon"></div>
                                        </Col>
                                        <Col span={8}>
                                            <span>今日已提币数量为</span>
                                            <br />
                                            <strong className="euotaLine">100000.006 BTC</strong>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <div className="sendRmk">
                            <textarea placeholder="请输入备注"></textarea>
                            <div className="box">
                                <div className="btnGray">返回</div>
                                <div className="btnGray" style={{marginLeft: '20px', marginRight: '20px'}}>不通过</div>
                                <div className="btnGray" style={{background: 'rgba(23,145,255,1)', color: '#FFFFFF', border: '0px'}}>通过</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <span className="bulkCollectionTitle">资产分析 BTC</span>
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
                                    <span>100000.006</span>
                                    <br />
                                    <span>流水总计<b> 100 </b>条</span>
                                    <br />
                                    <span>钱包状态：<label style={{color: '#02B715'}}>正常</label></span>
                                    <br />
                                    <span>1周内发生 <b> 100 </b>次流水变动</span>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div className="applicantStatistics" style={{height: '300px', paddingTop: '28px'}}>
                                    <div className="headerTab">全部</div>
                                    <div className="headerTabOut">今日</div>
                                    <div className="headerTabOut" style={{left: '320px'}}>近三日</div>
                                    <div className="headerTabOut" style={{left: '390px'}}>近七日</div>
                                    <div className="headerLogo" style={{background: 'rgba(22,206,109,0.1)'}}>
                                        <img style={{width: '20px', height: '20px'}} src={handImg} />
                                    </div>
                                    <span className="headerLogoTitle">行为分布</span>
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
                                <strong className="euotaLine" style={{fontSize: '20px'}}>80.002 BTC</strong>
                                <div className="lineRightIcon" style={{right: '30px'}}></div>
                            </Col>
                            <Col span={8}>
                                <span style={{color: '#999999'}}>最近一次提币时余额为</span>
                                <br />
                                <strong className="euotaLine" style={{fontSize: '20px'}}>100 条</strong>
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
                        <Table
                            style={{marginTop: '0px'}}
                            columns={columns}
                            pagination={{pageSize: 5}}
                        />
                    </Col>
                    <Col span={7}></Col>
                </Row>
            </div>
        );
    }
}

export default testDemo;
