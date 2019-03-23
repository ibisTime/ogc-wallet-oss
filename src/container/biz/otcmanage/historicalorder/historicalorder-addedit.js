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
} from '@redux/otcmanage/historicalorder-orderedit';
import { Button } from 'antd';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyBTC,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getUserName,
    getQueryString
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.OtcManageHistoricalorderEdit,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class HistoricalorderOrderEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search) || '';
        this.objectUserId = getQueryString('userId', this.props.location.search) || '';
        this.state = {
            data: [],
            buyUserInfo: [],
            sellUserInfo: []
        };
    }
    goBack = () => {
        this.props.history.go(-1);
    }
    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(625251, {
                code: this.code,
                objectUserId: this.objectUserId
                // type: 'B'
            })
        ]).then(([res1]) => {
            this.setState({
                data: res1,
                buyUserInfo: res1.buyUserInfo,
                sellUserInfo: res1.sellUserInfo
            });
            this.props.cancelFetching();// loading隐藏
        }).catch(this.props.cancelFetching);
    }

    render() {
        const fields = [{
            field: 'fromUser',
            title: '评论人',
            render: (v, d) => {
                return d.fromUserInfo ? d.fromUserInfo.nickname : '';
            }
        }, {
            field: 'toUser',
            title: '被评论人',
            render: (v, d) => {
                return d.toUserInfo ? d.toUserInfo.nickname : '';
            }
        }, {
            field: 'starLevel',
            title: '评论星级',
            key: 'comment_star_level',
            type: 'select'
        }, {
            field: 'content',
            title: '内容'
        }, {
            title: '评论时间',
            field: 'createDatetime',
            type: 'date'
        }];
        const {data, buyUserInfo, sellUserInfo} = this.state;
            return (
        <div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label> 编号：</label>
                    <span style={{marginLeft: '20px'}}>{data.code}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>买家：</label>
                    <span style={{marginLeft: '20px'}}>{buyUserInfo.nickname}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>卖家：</label>
                    <span style={{marginLeft: '20px'}}>{sellUserInfo.nickname}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易对：</label>
                    <span style={{marginLeft: '20px'}}>{ data ? data.tradeCoin + '-' + data.tradeCurrency : ''}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易价格：</label>
                    <span style={{marginLeft: '20px'}}>{data.tradePrice}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易数量：</label>
                    <span style={{marginLeft: '20px'}}>
                         {moneyFormat(data.countString, '', data.tradeCoin) + '-' + data.tradeCoin}
                    </span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易金额：</label>
                    <span style={{marginLeft: '20px'}}>{ data.tradeAmount + '-' + data.tradeCurrency}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>广告费：</label>
                    <span style={{marginLeft: '20px'}}>
                        {moneyFormat(data.feeString, '', data.tradeCoin) + '-' + data.tradeCoin}
                    </span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>完成时间：</label>
                    <span style={{marginLeft: '20px'}}>{dateTimeFormat(data.createDatetime)} </span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>评论详情：</label>
                    {
                        this.props.buildList({
                            fields,
                            noSelect: true,
                            pageCode: 628275,
                            searchParams: {
                                tradeOrderCode: this.code
                            },
                            buttons: []
                        })}
                    <div style={{width: '100%', marginTop: '15px', textAlign: 'center'}}>
                        <Button onClick={() => this.goBack()} type="primary">返回</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoricalorderOrderEdit;
