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
} from '@redux/statisticalAnalysis/dropsWater';
import {listWrapper} from 'common/js/build-list';
import ReactEcharts from 'echarts-for-react';

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
    componentDidMount() {
    }
    getOptionPieChart = () => {
        const option = {
            title: {
                text: '水滴统计',
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
                data: ['A类计划', 'B类计划', 'C类计划']
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
                    data: [
                        {value: 800, name: 'A类计划'},
                        {value: 200, name: 'B类计划'},
                        {value: 120, name: 'C类计划'}
                    ],
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
        const option = {
            title: {
                text: '水滴利息统计',
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
                data: ['自身收益', '层级收益', '节点收益']
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
                    data: [
                        {value: 335, name: '自身收益'},
                        {value: 310, name: '层级收益'},
                        {value: 234, name: '节点收益'}
                    ],
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
            field: 'name',
            title: '今日新合成水滴数'
        }, {
            field: 'buySymbol',
            title: '今日到期水滴数'
        }, {
            field: 'minerSymbol',
            title: '截止今日存活的水滴数'
        }, {
            field: 'price',
            title: '今日复投用户数'
        }, {
            field: 'daysLimit',
            title: '今日利息总量'
        }, {
            field: 'dailyOutput',
            title: '截止今日利息总量'
        }, {
            field: 'createTime',
            title: '日期',
            type: 'datetime',
            search: true
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
                              pageCode: 610503
                          })
                      }
                  </Col>
              </Row>
          </div>
        );
    }
}

export default DropsWater;