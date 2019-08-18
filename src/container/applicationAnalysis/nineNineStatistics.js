import React from 'react';
import {Row, Col, Table} from 'antd';
import {
    showSucMsg,
    showWarnMsg,
    findDsct,
    mtDate,
    dateFormat
} from 'common/js/util';

import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/applicationAnalysis/nineNineStatistics';
import {listWrapper} from 'common/js/build-list';
import ReactEcharts from 'echarts-for-react';
import {todayNineStatistics, dataDect} from '../../api/statisticalAnalysis';

import './nineNineStatistics.css';

@listWrapper(
    state => ({
        ...state.nineNineStatistics,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class nineNineStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productNameList: [],
            countList: [],
            nodeList: [],
            typeList: [],
            incomeAmountList: [],
            nodeList2: [],
            candyNodeLevels: {}
        };
    }
    componentDidMount() {
        dataDect('candy_income_type').then(data => {
            this.setState({
                candyNodeLevels: data
            });
            todayNineStatistics().then(data => {
                let plt = [];
                let clt = [];
                let nodeList = [];
                let tpLt = [];
                let nodeList2 = [];
                for(let i = 0; i < data.orderDetail.length; i++) {
                    plt[i] = data.orderDetail[i].productName;
                    clt[i] = data.orderDetail[i].count;
                    nodeList.push({
                        value: data.orderDetail[i].count,
                        name: data.orderDetail[i].productName
                    });
                }
                for(let i = 0; i < data.incomeDetail.length; i++) {
                    tpLt[i] = findDsct(this.state.candyNodeLevels, data.incomeDetail[i].type);
                    nodeList2.push({
                        value: data.incomeDetail[i].incomeAmount,
                        name: findDsct(this.state.candyNodeLevels, data.incomeDetail[i].type)
                    });
                }
                this.setState({
                    productNameList: [...plt],
                    typeList: [...tpLt],
                    countList: [...clt],
                    nodeList: [...nodeList],
                    nodeList2: [...nodeList2]
                });
            });
        });
    }
    getOptionPieChart = () => {
        const {productNameList, nodeList} = this.state;
        let waningStr = '';
        if(productNameList.length !== 0) {
            waningStr = '';
        }else {
            waningStr = '暂无数据';
        }
        const option = {
            title: {
                text: '今日玖佰玖统计',
                subtext: waningStr,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                icon: 'circle',
                top: 40,
                itemWidth: 6,
                itemHeight: 6,
                left: 'center',
                data: productNameList
            },
            color: ['#7C6AF2', '#FF6383', '#FF9F40', '#bd3b1b', '#d8a800', '#b9d870', '#ef5c4e'],
            series: [
                {
                    name: '计划分布',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '54%'],
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
    getOptionPieChart2 = () => {
        const {typeList, nodeList2} = this.state;
        let waningStr = '';
        if(typeList.length !== 0) {
            waningStr = '';
        }else {
            waningStr = '暂无数据';
        }
        const option = {
            title: {
                text: '昨日玖佰玖利息统计',
                subtext: waningStr,
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                icon: 'circle',
                top: 40,
                itemWidth: 6,
                itemHeight: 6,
                left: 'center',
                data: typeList
            },
            color: ['#7C6AF2', '#FF6383', '#FF9F40'],
            series: [
                {
                    name: '等级分布',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '54%'],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: nodeList2,
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
    render() {
        const fields = [{
            field: 'orderDetail',
            title: '今日总数',
            render(v) {
                let amount = 0;
                let amountStr = '';
                for (let i = 0; i < v.length; i++) {
                    amount += v[i].count;
                    amountStr += v[i].productName + ':' + v[i].count + '+';
                }
                if(amount === 0) {
                    return '';
                }else {
                    return amount + '（' + amountStr.substring(0, amountStr.length - 1) + '）';
                }
            }
        }, {
            field: 'incomeDetail',
            title: '今日利息总量',
            render(v) {
                console.log('0101', v);
                let amount = 0;
                let amountStr = '';
                for (let i = 0; i < v.length; i++) {
                    amount += parseFloat(v[i].incomeAmount);
                    amountStr += (v[i].type === '0' ? '自身收益' : (v[i].type === '1' ? '推荐收益' : '团队收益')) + ':' + v[i].incomeAmount + '+';
                }
                if(amount === 0) {
                    return '';
                }else {
                    return amount.toFixed(2) + '（' + amountStr.substring(0, amountStr.length - 1) + '）';
                }
            }
        }, {
            field: 'createDate',
            title: '日期',
            type: 'date',
            search: true
        }];
        return(
            <div className="upContainer">
                <Row>
                    <Col className="pieStyle" span={12}>
                        <ReactEcharts
                            option={this.getOptionPieChart()}
                            style={{height: '100%', width: '100%'}}
                            className='react_for_echarts' />
                    </Col>
                    <Col className="pieStyle" span={12}>
                        <ReactEcharts
                            option={this.getOptionPieChart2()}
                            style={{height: '100%', width: '100%'}}
                            className='react_for_echarts' />
                    </Col>
                </Row>
                <Row>
                    <Col className="statisticalList" span={24}>
                        {
                            this.props.buildList({
                                fields,
                                pageCode: 610604
                            })
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default nineNineStatistics;
