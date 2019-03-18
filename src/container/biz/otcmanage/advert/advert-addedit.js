import React from 'react';
import { Form, Button } from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/otcmanage/advert-addedit';
import { getQueryString, dateTimeFormat, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import {listWrapper} from 'common/js/build-list';
@listWrapper(
    state => ({
        ...state.OtcManageAdvertAddedit,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MarketAdjustmentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.objectUserId = getQueryString('userId', this.props.location.search) || '';
        this.state = {
            data: [],
            user: []
        };
    }
    goBack = () => {
        this.props.history.go(-1);
    }
    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(625226, {
                adsCode: this.code,
                code: this.code,
                objectUserId: this.objectUserId
                // type: 'B'
            })
        ]).then(([res1]) => {
            this.setState({
                data: res1,
                user: res1.user.nickname
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
                    <label>发布人：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.user}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易对：</label>
                    <span style={{marginLeft: '20px'}}>{data ? data.tradeCoin + '-' + data.tradeCurrency : ''}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>付款方式：</label>
                    <span style={{marginLeft: '20px'}}>{data.payType}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>已有总量：</label>
                    <span style={{marginLeft: '20px'}}>{moneyFormat(data.totalCountString)}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>溢价率：</label>
                    <span style={{marginLeft: '20px'}}>{((data.premiumRate) * 100 + '%')}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>单笔最大量：</label>
                    <span style={{marginLeft: '20px'}}>{data.maxTrade}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>单笔最小量：</label>
                    <span style={{marginLeft: '20px'}}>{data.minTrade + '分钟'}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>付款期限：</label>
                    <span style={{marginLeft: '20px'}}>{data.payLimit}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>创建时间：</label>
                    <span style={{marginLeft: '20px'}}>{dateTimeFormat(data.createDatetime)}</span>
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
        // return this.buildDetail({
        //     fields,
        //     key: 'adsCode',
        //     code: this.code,
        //     view: this.view,
        //     editCode: '625221',
        //     detailCode: '625226'
        // });
    }
}

export default MarketAdjustmentAddedit;
