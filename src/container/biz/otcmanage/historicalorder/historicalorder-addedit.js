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
            data: []
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
                data: res1
            });
            this.props.cancelFetching();// loading隐藏
        }).catch(() => this.setState(
            {fetching: false}));
    }

    render() {
        const fields = [{
            field: 'code',
            title: '针对订单号'
        }, {
            title: '内容',
            field: 'content'
        }, {
            title: '评论人 ',
            field: 'fromUser'
        }, {
            title: '被评论人',
            field: 'toUser'
        }, {
            title: '评论时间',
            field: 'createDatetime',
            type: 'datetime'
        }];
        const { data } = this.state;
        return (
            <div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label> 编号：</label>
                    <span style={{marginLeft: '20px'}}>{data.code}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>买家：</label>
                    <span style={{marginLeft: '20px'}}>{data.buyUser}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>卖家：</label>
                    <span style={{marginLeft: '20px'}}>{data.sellUser}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易对：</label>
                    <span style={{marginLeft: '20px'}}>{data.tradeCoin}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易价格：</label>
                    <span style={{marginLeft: '20px'}}>{data.tradePrice}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易数量：</label>
                    <span style={{marginLeft: '20px'}}>{data.countString}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易金额：</label>
                    <span style={{marginLeft: '20px'}}>{data.tradeAmount}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>广告费：</label>
                    <span style={{marginLeft: '20px'}}>{data.feeString}</span>
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
