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
} from '@redux/otcmanage/survivalorder-orderedit';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName,
    getQueryString
} from 'common/js/util';
import fetch from 'common/js/fetch';
@listWrapper(
    state => ({
        ...state.OtcSurvivaLorDerOrderedit,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SurvivalOrderAddeditOrderedit extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || '';
        this.state = {
            userData: {
                code: '',
                buyUser: '',
                sellUser: '',
                tradeCoin: '',
                tradePrice: '',
                countString: '',
                tradeAmount: '',
                realName: '',
                status: '',
                updateDatetime: ''
            }
        };
    }

    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(628279, {
                objectUserId: this.objectUserId
                // type: 'B'
            })
        ]).then(([accountData]) => {
            this.setState({
                userData: accountData[0]
            });
            this.props.cancelFetching();// loading隐藏
        }).catch(this.props.cancelFetching);
    }

    render() {
        const fields = [{
            title: '评论人 ',
            field: 'releaseDatetime',
            type: 'datetime'
        }, {
            title: '被评论人',
            field: 'status',
            type: 'select',
            key: 'trade_order_status'
        }, {
            title: '评论星级',
            field: 'invalidDatetime',
            type: 'datetime'
        }, {
            title: '内容',
            field: 'markDatetime',
            type: 'datetime'
        }, {
            title: '评论时间',
            field: 'bsComment',
            type: 'select',
            key: 'comment_result'
        }];

        return (
            <div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>编号：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.code}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>买家：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.buyUser}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>卖家：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.sellUser}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易对：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.tradeCoin}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易价格：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.tradePrice}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易数量：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.countString}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易金额：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.tradeAmount}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>广告费：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.realName}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>状态：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.status}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>完成时间：</label>
                    <span style={{marginLeft: '20px'}}>{this.state.updateDatetime}</span>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>评论详情：</label>

                    {
                        this.props.buildList({
                            fields,
                            noSelect: true,
                             pageCode: 802320,
                            searchParams: {
                                userId: this.userId
                            },
                            buttons: []
                        })}
                </div>
            </div>
        );
    }
}

export default SurvivalOrderAddeditOrderedit;
