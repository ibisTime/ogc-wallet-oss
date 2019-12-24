import React from 'react';
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
import {Layout} from 'antd';
import { Switch, Route } from 'react-router-dom';

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
            fetch(800020)
        ]).then(([bonusPoolData]) => {
            this.setState({
                bonusPoolData: bonusPoolData
            });
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
        const {bonusPoolData} = this.state;
        const fields = [{
            field: 'symbolPair',
            title: '交易对'
        }, {
            field: 'countOutTotal',
            title: '总兑出数量'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'countOut',
            title: '实际兑出数量'
        }, {
            field: 'countIn',
            title: '兑入数量'
        }];
        return (
            <div>
                <div style={{marginBottom: '30px', fontSize: '18px', fontWeight: 500}}>币种统计</div>
                <div style={{display: 'flex', flexWrap: 'wrap', paddingLeft: '50px', marginBottom: '20px'}}>
                    {
                        bonusPoolData.map((item) => (
                            <div style={{height: '50px', width: '40%'}}>
                                <strong style={{marginRight: '20px', fontSize: '16px'}}>{item.symbol}</strong>
                                <span style={{marginRight: '20px'}}>兑入:{item.countIn}</span>
                                <span style={{marginRight: '20px'}}>兑出:{item.countOut}</span>
                            </div>
                        ))
                    }
                </div>
                <div style={{backgroundColor: '#e6e6e6', height: '10px'}}/>
                <div style={{marginTop: '30px', fontSize: '18px', fontWeight: 500}}>
                    <p>交易对统计</p>
                </div>
                <div>
                    {
                        this.props.buildList({
                            fields,
                            pageCode: 800021,
                            rowKey: 'id',
                            noSelect: true
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;
