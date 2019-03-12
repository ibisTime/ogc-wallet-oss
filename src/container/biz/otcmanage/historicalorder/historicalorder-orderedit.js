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
} from '@redux/otcmanage/historicalorder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.OtcManageHistoricalorder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Historicalorder extends React.Component {
    constructor(props) {
        super(props);
      //  this.userId = getQueryString('userId', this.props.location.search) || '';
        this.state = {
            userData: {
                realName: '',
                accountNumber: '',
                createDatetime: '',
                amount: '',
                frozenAmount: ''
            }
        };
    }
    componentDidMount() {
        // 直接请求
        this.props.doFetching();// loading显示
        Promise.all([
            fetch(802301, {
                userId: this.userId,
                type: 'B'
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
            field: 'code',
            title: '针对订单号'
        }, {
            title: '评论星级',
            field: 'invalidDatetime',
            type: 'datetime'
        }, {
            title: '内容',
            field: 'markDatetime',
            type: 'datetime'
        }, {
            title: '评论人 ',
            field: 'releaseDatetime',
            type: 'datetime'
        }, {
            title: '被评论人',
            field: 'status',
            type: 'select',
            key: 'trade_order_status'
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
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>买家：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>卖家：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易对：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易价格：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易数量：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>交易金额：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>广告费：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>状态：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>完成时间：</label>
                </div>
                <div style={{width: '100%', marginLeft: '30px', marginTop: '30px'}}>
                    <label>评论详情：</label>
                    {
                        this.props.buildList({
                            fields,
                            noSelect: true,
                            // pageCode: 802320,
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

export default Historicalorder;
