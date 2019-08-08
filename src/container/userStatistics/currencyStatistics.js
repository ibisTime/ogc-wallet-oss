import React from 'react';
import {Row, Col} from 'antd';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';

import ReactEcharts from 'echarts-for-react';

import {coinDistribution} from '../../api/statisticalAnalysis';

class currencyStatistics extends React.Component {
    componentDidMount() {
        coinDistribution('2018-08-02', 'TOSP').then(data => {
            console.log(data);
        });
    }

    getOptionColumnarChart = () => {
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
                source: [
                    ['product', '今日存币数量', '今日提币数量', '截止今日币量'],
                    ['1月', 43.3, 85.8, 93.7],
                    ['2月', 83.1, 73.4, 55.1],
                    ['3月', 86.4, 65.2, 82.5],
                    ['4月', 72.4, 53.9, 39.1],
                    ['5月', 72.4, 53.9, 39.1],
                    ['6月', 72.4, 53.9, 39.1],
                    ['7月', 72.4, 53.9, 39.1],
                    ['8月', 72.4, 53.9, 39.1],
                    ['9月', 72.4, 53.9, 39.1],
                    ['10月', 72.4, 53.9, 39.1],
                    ['11月', 72.4, 53.9, 39.1],
                    ['12月', 72.4, 53.9, 39.1]
                ]
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
            <Row style={{height: '600px'}}>
                <Col span={24} style={{height: '600px'}}>
                    <ReactEcharts
                        option={this.getOptionColumnarChart()}
                        style={{height: '100%', width: '100%'}}
                        className='react_for_echarts' />
                </Col>
            </Row>
        );
    }
}

export default currencyStatistics;
