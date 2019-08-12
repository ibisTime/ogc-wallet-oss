import React from 'react';
import {Row, Col, Table} from 'antd';
import {
    showSucMsg,
    showWarnMsg,
    findDsct,
    mtDate,
    dateFormat
} from 'common/js/util';

import './userPanel.css';
import ReactEcharts from 'echarts-for-react';

import {userAmount, userDistribution, dataDect} from '../../api/statisticalAnalysis';

class userPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mths: [],
            activeCounts: [],
            registerCounts: [],
            totalCounts: [],
            candyNodeLevels: {},
            nodeLevels: [],
            nodeList: []
        };
    }
    componentDidMount() {
        userAmount(mtDate(dateFormat(new Date()), 15)).then(data => {
            let mAs = [];
            let aCs = [];
            let rgtCs = [];
            let tCs = [];
            for(let i = 0; i < data.length; i++) {
                mAs[i] = data[i].date.split('-')[1] + '-' + data[i].date.split('-')[2];
                aCs[i] = data[i].activeCount;
                rgtCs[i] = data[i].registerCount;
                tCs[i] = data[i].totalCount;
            }
            this.setState({
                mths: [...mAs],
                activeCounts: [...aCs],
                registerCounts: [...rgtCs],
                totalCounts: [...tCs]
            });
        });
        dataDect('candy_node_level').then(data => {
            this.setState({
                candyNodeLevels: data
            });
            userDistribution().then(data => {
                let ndls = [];
                let nodeList = [];
                for(let i = 0; i < data.length; i++) {
                    ndls[i] = findDsct(this.state.candyNodeLevels, data[i].candyNodeLevel);
                    nodeList.push({
                        value: data[i].count,
                        name: findDsct(this.state.candyNodeLevels, data[i].candyNodeLevel)
                    });
                }
                this.setState({
                    nodeLevels: [...ndls],
                    nodeList: [...nodeList]
                });
            });
        });
    }
    getOption = () => {
        const {mths, activeCounts, registerCounts, totalCounts} = this.state;
        const option = {
            title: {
                text: '2019年用户增长人数',
                left: 'left'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                icon: 'circle',
                top: 40,
                itemWidth: 6,
                itemHeight: 6,
                left: 'left',
                data: ['今日新增用户数', '今日活跃用户数', '截止今日用户数']
            },
            color: [
                '#5C89FF',
                '#7C6AF2',
                '#C95FF2'
            ],
            xAxis: {
                type: 'category',
                name: 'x',
                splitLine: {show: true},
                data: mths
            },
            grid: {
                left: 0,
                right: 0,
                top: '22%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '今日新增用户数',
                    type: 'line',
                    data: activeCounts
                },
                // {
                //     name: '今日活跃用户数',
                //     type: 'line',
                //     data: registerCounts
                // }
                {
                    name: '截止今日用户数',
                    type: 'line',
                    data: totalCounts
                }
            ]
        };
        return option;
    }
    getOptionPieChart = () => {
        const {nodeLevels, nodeList} = this.state;
        const option = {
            title: {
                text: '用户身份',
                x: 'left'
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
                left: 'left',
                data: nodeLevels
            },
            color: ['#7C6AF2', '#FF6383', '#FF9F40', '#bd3b1b', '#d8a800', '#b9d870', '#ef5c4e'],
            series: [
                {
                    name: '等级分布',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '68%'],
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
    render() {
        return(
            <div className="upContainer">
                <Row>
                    <Col span={24}>
                        <div className="polygonalChart">
                            <ReactEcharts
                                option={this.getOption()}
                                style={{height: '100%', width: '100%'}}
                                className='react_for_echarts' />
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div className="userIdentity">
                            <ReactEcharts
                                option={this.getOptionPieChart()}
                                style={{height: '100%', width: '100%'}}
                                className='react_for_echarts' />
                        </div>
                        <div className="clear"></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default userPanel;
