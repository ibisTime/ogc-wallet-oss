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
} from '@redux/marketsettlement/stayorder';
import UpDowns from 'component/up-down/up-downs';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.StayOrder,
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
        this.state = {
            // 上下架窗口是否显示
            updownVisible: false,
            // 上下架产品code
            codeList: '',
            // 上下架接口号
            biz: ''
        };
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
                return moneyFormat(v.toString(), ' ', data.amount);
            }
        }, {
            title: '申请人',
            field: 'applyUser'
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
                        status: 0
                    },
                   btnEvent: {
                        // 审核
                        check: (keys, items) => {
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
                    }
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
