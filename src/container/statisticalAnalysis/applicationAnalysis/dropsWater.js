import React from 'react';
import {Row, Col, Table} from 'antd';

import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/statisticalAnalysis/dropsWater';
import {listWrapper} from 'common/js/build-list';
import ReactEcharts from 'echarts-for-react';
import {moneyFormat} from 'common/js/util';
import fetch from 'common/js/fetch';

import './nineNineStatistics.css';

@listWrapper(
  state => ({
      ...state.DropsWater,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class DropsWater extends React.Component {
    state = {
        pieChartData: [],
        pieChartName: [],
        pieChart2Data: [],
        pieChart2Name: []
    };
    componentDidMount() {
        fetch('610570').then(data => {
            let pieChartName = data.map(item => item.name);
            Array.isArray(data) && this.setState({
                pieChartData: data,
                pieChartName
            });
        });
        fetch('610571').then(data => {
            let pieChart2Name = data.map(item => item.name);
            Array.isArray(data) && this.setState({
                pieChart2Data: data,
                pieChart2Name
            });
        });
    }
    getOptionPieChart = () => {
        const option = {
            title: {
                text: '当前存活矿机统计',
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
                data: this.state.pieChartName
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
                    data: this.state.pieChartData,
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
    };
    getOptionPieChart2 = () => {
        const option = {
            title: {
                text: '今日新增矿机统计',
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
                data: this.state.pieChart2Name
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
                    data: this.state.pieChart2Data,
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
            field: 'dateTime',
            title: '日期',
            type: 'date',
            rangedate: ['dateTimeStart', 'dateTimeEnd'],
            search: true
        }, {
            field: 'createQuantity',
            title: '今日新增矿机数'
        }, {
            field: 'endQuantity',
            title: '今日到期矿机数'
        }, {
            field: 'liveQuantity',
            title: '今日存活矿机数'
        }, {
            field: 'minerCount',
            title: '今日矿机收益总量(WIS)',
            render(v) {
                return (v || v === 0) && moneyFormat(v, '', 'WIS');
            }
        }, {
            field: 'inviteCount',
            title: '今日层级收益总量(USDT)',
            render(v) {
                return (v || v === 0) && moneyFormat(v, '', 'USDT');
            }
        }, {
            field: 'nodeCount',
            title: '今日节点收益总量(USDT)',
            render(v) {
                return (v || v === 0) && moneyFormat(v, '', 'USDT');
            }
        }, {
            field: 'createTime',
            title: '统计时间',
            type: 'datetime'
        }];
        return(
          <div className="upContainer">
              <Row style={{height: '286px'}}>
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
                              rowKey: 'id',
                              pageCode: 610572
                          })
                      }
                  </Col>
              </Row>
          </div>
        );
    }
}

export default DropsWater;