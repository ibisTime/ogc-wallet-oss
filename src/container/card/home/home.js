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
} from '@redux/card/home';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, formatImg} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.CardHome,
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
            secretKey: {},
            cardObj: {}
        };
    }
    componentDidMount() {
        fetch('610709').then(data => {
            this.setState({
                secretKey: data
            });
        });
        fetch('610752').then(data => {
            this.setState({
                cardObj: data
            });
        });
    }

    render() {
        const {secretKey, cardObj} = this.state;
        const fields = [{
            field: 'user',
            title: '用户',
            render(v, d) {
                return d && d.user ? `${d.user.nickname}-${d.user.loginName}` : '';
            }
        }, {
            field: 'quantity',
            title: '卡数量'
        }, {
            field: 'totalPrice',
            title: '总面值'
        }, {
            field: 'createDatetime',
            title: '生成卡时间',
            type: 'datetime'
        }];
        return (
            <div>
                <div style={{display: 'flex', marginBottom: '30px'}}>
                    <div style={{width: '30%', padding: '20px 30px', border: '1px solid #ccc', borderRadius: '5px'}}>
                        <div style={{fontSize: '18px', fontWeight: 500, marginBottom: '10px'}}>密钥库统计</div>
                        <div style={{padding: '10px 0'}}>
                            <span>总量：{secretKey.totalCount}</span>
                        </div>
                        <div style={{padding: '10px 0'}}>
                            <span>已使用：{secretKey.useCount}</span>
                        </div>
                        <div style={{padding: '10px 0'}}>
                            <span>已作废：{secretKey.cancelCount}</span>
                        </div>
                    </div>
                    <div style={{width: '30%', padding: '20px 30px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '60px'}}>
                        <div style={{fontSize: '18px', fontWeight: 500, marginBottom: '10px'}}>卡券统计</div>
                        <div style={{padding: '10px 0'}}>
                            <span>总量：{cardObj.totalCount}</span>
                        </div>
                        <div style={{padding: '10px 0'}}>
                            <span>已刮卡：{cardObj.openCount}</span>
                        </div>
                        <div style={{padding: '10px 0'}}>
                            <span>已兑换：{cardObj.useCount}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.props.buildList({
                            fields,
                            pageCode: '610723',
                            noSelect: true
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Home;
