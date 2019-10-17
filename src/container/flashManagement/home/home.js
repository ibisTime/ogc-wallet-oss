import React from 'react';
import {connect} from 'react-redux';
import {Card, Row, Col, Button, Spin, message, Tag, Progress} from 'antd';
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
            fetch(610661, {
                start: 1,
                limit: 2,
                type: 'snode'
            }),
            // 当前节点列表查
            fetch(610614)
        ]).then(([bonusPoolData, nodeData]) => {
            this.setState({
                bonusPoolData: bonusPoolData.list,
                nodeData: nodeData
            });
            console.log('bonusPoolData', bonusPoolData);
            console.log('nodeData', nodeData);
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
        const {bonusPoolData, nodeData, nodeStatusColor, nodeStatusDict} = this.state;
        const fields = [{
            field: 'createDatetime',
            title: '入池时间',
            type: 'date'
        }, {
            field: 'remark',
            title: '业务类型'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'count',
            title: '数额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }];
        return (
            <div className="superNodeHome-wrapper">
                <div className="homeTop">
                    <div className="homeTop-left">
                        <div className="homeTop-left-tit">币种统计</div>
                        <div className="homeTop-left-item-wrap">
                            {
                                bonusPoolData.length > 0 && bonusPoolData.map((item) => (
                                    <div className="homeTop-left-item" key={item.id}>
                                        <div className="item-logo"><img src={formatImg(item.coin.icon)}/></div>
                                        <div className="item-con">
                                            <p>{item.symbol}</p>
                                            <samp>{moneyFormat(item.count, '', item.symbol)}</samp>
                                        </div>
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
                                this.props.history.push(`/superNode/bonusPool`);
                            }}>查看更多</samp>
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
                    <div className="superNode-title-wrap">
                        <p>交易对兑换报表</p>
                    </div>
                    <div className="homeContent-item-wrap">

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
