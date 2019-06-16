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
} from '@redux/quantitativeAi/quantitativeAiOrder/quantitativeAiOrder';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';
import {message, Modal} from 'antd';
import fetch from 'common/js/fetch';

const { confirm } = Modal;

@listWrapper(
    state => ({
        ...state.quantitativeAiOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuantitativeAiOrder extends React.Component {
    render() {
        const fields = [{
            field: 'productCode',
            title: '产品编号',
            search: true
        }, {
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true
        }, {
            field: 'investCount',
            title: '买入数量',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolBuy);
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'pglh_order_status',
            search: true
        }, {
            field: 'totalIncome',
            title: '产生收益总数',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolIncome);
            }
        }, {
            field: 'startTime',
            title: '开始产生收益时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610315',
            btnEvent: {
                dingdanshouyi: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/quantitativeAi/quantitativeAiOrderIncome?orderCode=${selectedRows[0].productCode}`);
                    }
                },
                shuhuishenhe: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if(selectedRows[0].status !== '3') {
                        showWarnMsg('该状态下无法操作');
                    } else {
                        confirm({
                            title: `赎回审核`,
                            content: `该产品是否通过赎回？`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('610312', {
                                    code: selectedRowKeys[0],
                                    approveResult: '1'
                                }).then(() => {
                                    hasMsg();
                                    message.success('操作成功', 1, () => {
                                        this.props.getPageData();
                                    });
                                }, hasMsg);
                            },
                            onCancel: () => {
                                let hasMsg = message.loading('');
                                fetch('610312', {
                                    code: selectedRowKeys[0],
                                    approveResult: '0'
                                }).then(() => {
                                    hasMsg();
                                    message.success('操作成功', 1, () => {
                                        this.props.getPageData();
                                    });
                                }, hasMsg);
                            },
                            okText: '通过',
                            cancelText: '不通过'
                        });
                    }
                }
            }
        });
    }
}

export default QuantitativeAiOrder;
