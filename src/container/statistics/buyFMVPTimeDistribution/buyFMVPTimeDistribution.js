import React from 'react';
import {Select, Spin} from 'antd';
import ReactEcharts from 'echarts-for-react';
import fetch from 'common/js/fetch';
import {formatDate} from 'common/js/util';

// const FormItem = Form.Item;
const {Option} = Select;

// @Form.create()
export default class BuyFMVPTimeDistribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {
                timeList: [],
                countList: []
            }
        };
        this.primaryColor = '#348ff6';
    }

    componentDidMount() {
        fetch(805905).then(data => {
            // let result1 = data.map((d, i) => ({
            //     datetime: formatDate(d.startDate, 'yyyy-MM-dd hh:mm'),
            //     count: d.count
            // }));
            let result = {
                timeList: [],
                countList: []
            };
            data = data.reverse();
            data.map((d, i) => {
                result.timeList.push(d.endDate);
                result.countList.push(d.count);
            });
            this.setState({
                loading: false,
                data: result
            });
        }).catch(() => {
            this.setState({loading: false});
        });
    }

    getOption = () => ({
        animation: false,
        title: {
            text: '承兑商购买FMVP时间分布',
            textStyle: {
                fontWeight: '400',
                fontSize: '15',
                color: '#484848'
            },
            left: 'center'
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            },
            right: '15'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: this.primaryColor
                }
            },
            confine: true,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: '1',
            borderColor: 'rgba(199, 199, 199, 0.3)',
            textStyle: {
                color: '#484848'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.state.data.timeList,
            axisLine: {
                lineStyle: {
                    color: '#eeeeee'
                }
            },
            axisLabel: {
                color: '#999999',
                fontSize: '12px',
                formatter: (value) => {
                    return formatDate(value, 'MM-dd hh:mm');
                }
            }
        },
        yAxis: {
            scale: true,
            axisLine: {
                lineStyle: {
                    color: '#eeeeee'
                }
            },
            axisLabel: {
                color: '#999999',
                fontSize: '12px',
                formatter: (value) => {
                    return value;
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#eee'
                }
            }
        },
        grid: [{
            right: '4%'
        }],
        series: [{
            data: this.state.data.countList,
            type: 'line',
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 8,
            smooth: true,
            lineStyle: {
                color: this.primaryColor
            },
            itemStyle: {
                normal: {
                    color: this.primaryColor,
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 5
                }
            }
        }]
    });

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                />
            </Spin>
        );
    }
}
