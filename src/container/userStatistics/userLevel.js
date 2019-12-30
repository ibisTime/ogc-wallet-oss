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

import {userDistribution, dataDect} from '../../api/statisticalAnalysis';

class userLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candyNodeLevels: {},
            nodeLevels: [],
            nodeList: []
        };
    }
    componentDidMount() {
        userDistribution().then(data => {
            let nodeList = [];
            for(let i = 0; i < data.length; i++) {
                nodeList.push({
                    value: data[i].count,
                    name: 'L' + data[i].level + '等级'
                });
            }
            this.setState({
                nodeList: [...nodeList]
            });
        });
    }
    getOptionPieChart = () => {
        const {nodeList} = this.state;
        const option = {
            title: {
                text: '用户等级统计',
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
                data: ['L1等级', 'L2等级', 'L3等级', 'L4等级']
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

export default userLevel;
