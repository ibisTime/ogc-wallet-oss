import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/marketsettlement/goorder';
import UpDowns from 'component/up-down/up-downs';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    getQueryString,
    showSucMsg,
    getUserName
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GoOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Stayorder extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            // 上下架窗口是否显示
            updownVisible: false,
            // 上下架产品code
            codeList: '',
            // 上下架接口号
            biz: ''
        };
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.isPlat = !!getQueryString('isPlat', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if(this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
}
    setModalVisible = (updownVisible) => {
        this.setState({ updownVisible });
    }
    render() {
        const fields = [{
            title: '订单编号',
            field: 'code'
        }, {
            title: '活动币种',
            field: 'currency',
            select: 'type',
            search: true
        }, {
            title: '申请划转数量',
            field: 'amount',
            render: (v, data) => {
                return moneyFormat(v.toString(), '', data.amount);
            }
        }, {
            title: '申请人',
            field: 'applyUser',
            render: (v, d) => {
                return d.userInfo ? d.userInfo.nickname : '';
            }
        }, {
            title: '申请时间',
            type: 'datetime',
            field: 'applyDatetime'
        }, {
            title: '申请说明',
            field: 'approveNote'
        }];
        let that = this;
        return (
            <div>
                {this.props.buildList({
                    fields,
                    singleSelect: false,
                    pageCode: 802812,
                    searchParams: {
                        status: 0,
                        isPlat: this.isPlat,
                        bizType: this.bizType,
                        currency: this.symbol,
                        accountNumber: this.accountNumber
                    },
                    buttons: [
                        {
                            code: 'check',
                            name: '审核',
                            check: false,
                            handler: (keys, items) => {
                                console.log(keys);
                                if (!keys || !keys.length) {
                                    showWarnMsg('请选择记录');
                                } else {
                                    this.setState({
                                        updownVisible: true,
                                        codeList: keys,
                                        biz: 802801
                                    });
                                    console.log(keys);
                                }
                            }
                        },
                        {
                            code: 'detail',
                            name: '详情',
                            check: false
                        },
                        {
                            code: 'export',
                            name: '导出',
                            check: false
                        }, {
                            code: 'goBack',
                            name: '返回',
                            check: false,
                            handler: () => {
                                this.props.history.go(-1);
                            }
                    }]
                    // btnEvent: {
                    //     // 审核
                    //     check: (keys, items) => {
                    //         console.log(keys);
                    //         if (!keys || !keys.length) {
                    //             showWarnMsg('请选择记录');
                    //         } else {
                    //             this.setState({
                    //                 updownVisible: true,
                    //                 codeList: keys,
                    //                 biz: 802801
                    //             });
                    //             console.log(keys);
                    //         }
                    //     }
                    // }
                })}
                <UpDowns
                    updownVisible={this.state.updownVisible}
                    setModalVisible={this.setModalVisible}
                    biz={this.state.biz}
                    codeList ={this.state.codeList}
                    onOk={() => {
                        that.setModalVisible(false);
                        that.props.getPageData();
                    }} />
            </div>
        );
    }
}

export default Stayorder;
