import React from 'react';
import {Row, Col, Select} from 'antd';
import {
    showSucMsg,
    showWarnMsg,
    mtDate,
    dateFormat,
    moneyFormat
} from 'common/js/util';

import ReactEcharts from 'echarts-for-react';

import {coinDistribution} from '../../api/statisticalAnalysis';

const { Option } = Select;

class currencyStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeList: []
        };
    }
    componentDidMount() {
        // TOSP TOS ETH
        coinDistribution(mtDate(dateFormat(new Date()), 15), 'TOSP').then(data => {
            let nodeList = [];
            let sourceList = [
                ['product', '今日存币数量', '今日提币数量', '截止今日币量']
            ];
            for(let i = 0; i < data.length; i++) {
                nodeList[i] = [data[i].date, data[i].todaySymbolIn, data[i].todaySymbolOut, moneyFormat(data[i].totalAmount, '', 'ETH')];
            }
            sourceList.push(...nodeList);
            this.setState({
                nodeList: [...sourceList]
            });
        });
    }
    handleChange = (value) => {
        this.getSymbolDistribution(value);
    }
    getSymbolDistribution = (symbol) => {
        coinDistribution(mtDate(dateFormat(new Date()), 15), symbol).then(data => {
            this.setState({
                nodeList: []
            });
            let nodeList = [];
            let sourceList = [
                ['product', '今日存币数量', '今日提币数量', '截止今日币量']
            ];
            for(let i = 0; i < data.length; i++) {
                nodeList[i] = [data[i].date, data[i].todaySymbolIn, data[i].todaySymbolOut, moneyFormat(data[i].totalAmount, '', 'ETH')];
            }
            sourceList.push(...nodeList);
            this.setState({
                nodeList: [...sourceList]
            });
        });
    }
    getOptionColumnarChart = () => {
        const {nodeList} = this.state;
        console.log(nodeList);
        const option = {
            title: {
                text: '币量统计',
                x: 'left'
            },
            legend: {
                icon: 'circle',
                top: 40,
                itemWidth: 6,
                itemHeight: 6,
                left: 'left'
            },
            grid: {
                left: 0,
                right: 0,
                top: '14%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {},
            color: ['#5C89FF', '#7C6AF2', '#C95FF2'],
            dataset: {
                source: nodeList
            },
            xAxis: {type: 'category'},
            yAxis: {},
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        };
        return option;
    }
    render() {
        return(
            <div>
                <Row>
                    <Col span={24}>
                        <strong style={{marginLeft: '4px'}}>请选择币种：</strong>
                        <Select defaultValue="TOSP" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="TOSP">TOSP</Option>
                            <Option value="TOS">TOS</Option>
                            <Option value="ETH">ETH</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{height: '600px'}}>
                    <Col span={24} style={{height: '600px'}}>
                        <ReactEcharts
                            option={this.getOptionColumnarChart()}
                            style={{height: '100%', width: '100%'}}
                            className='react_for_echarts' />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default currencyStatistics;
