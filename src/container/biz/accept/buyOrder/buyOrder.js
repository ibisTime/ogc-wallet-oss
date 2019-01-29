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
} from '@redux/accept/buyOrder/buyOrder';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';
@listWrapper(
    state => ({
        ...state.acceptBuyOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BuyOrder extends React.Component {
    render() {
        const fields = [{
            title: '下单人(手机号/邮箱)',
            field: 'loginName',
          render(v, data) {
            if(data.user) {
              return data.user.loginName;
            }
            return '-';
          },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
          field: 'receiveBank',
          title: '收款方式'
        }, {
          field: 'receiveCardNo',
          title: '卡号'
        }, {
            field: 'tradeCoin',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '单价',
            field: 'tradePrice'
        }, {
            title: '数量',
            field: 'count',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '总金额',
            field: 'tradeAmount'
        }, {
            title: '手续费',
            field: 'fee',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '待支付'
            }, {
              key: '1',
              value: '已支付'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '下单时间',
            type: 'datetime'
        }, {
            title: '附言',
            field: 'postscript'
        }, {
          title: '备注',
          field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625285,
            searchParams: {
                type: '0',
                statusList: ['0', '1']
            },
            singleSelect: false,
            btnEvent: {
                sale: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status !== '1') {
                                showWarnMsg(selectedRows[i].code + '不是已支付的订单');
                                codeList = [];
                                return;
                            }
                            codeList.push(selectedRows[i].code);
                        }
                        if (codeList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定到账？此操作将会释放币`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(625274, {
                                        codeList: codeList,
                                        result: '1',
                                        userId: getUserId()
                                    }).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                },
                noSale: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            if(selectedRows[i].status !== '1') {
                                showWarnMsg(selectedRows[i].code + '不是已支付的订单');
                                codeList = [];
                                return;
                            }
                            codeList.push(selectedRows[i].code);
                        }
                        if (codeList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定未到账？平台将会取消订单`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(625274, {
                                        codeList: codeList,
                                        result: '0',
                                        userId: getUserId()
                                    }).then(() => {
                                        this.props.getPageData();
                                        showSucMsg('操作成功');
                                    }).catch(() => {
                                        this.props.cancelFetching();
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}

export default BuyOrder;
