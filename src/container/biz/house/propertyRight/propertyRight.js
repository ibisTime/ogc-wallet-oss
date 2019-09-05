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
} from '@redux/house/propertyRight/propertyRight';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.propertyRight,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class propertyRight extends React.Component {
    state = {
        visible: false,
        code: '',
        xyCount: null,
        amountVisible: false,
        amountVal: ''
    };
    amountChagne = e => {
        if (/^[\d.]*$/.test(e.target.value)) {
            this.setState({ amountVal: e.target.value });
        }
    };
    render() {
        const { visible, amountVisible, amountVal } = this.state;
        const fields = [{
            field: 'name',
            title: '产权名称'
        }, {
            field: 'priceType',
            title: '购买方式',
            render: (v, d) => {
                console.log('symbolOutType', d);
                if(v === '1') {
                    return '币本位';
                }else {
                    return `金本位(${d.priceCurrency})`;
                }
            }
        }, {
            field: 'symbolIn',
            title: '购买币种'
        }, {
            field: 'symbolOutType',
            title: '收益方式',
            render: (v, d) => {
                console.log('symbolOutType', d);
                if(v === '1') {
                    return '币本位';
                }else {
                    return `金本位(${d.symbolOutCurrency})`;
                }
            }
        }, {
            field: 'symbolOut',
            title: '收益币种'
        }, {
            field: 'daysLimit',
            title: '有效期限（天）'
        }, {
            field: 'expectIncome',
            title: '预计收益'
        }, {
            field: 'deductFlag',
            title: '是否支持抵扣',
            render: (v, d) => {
                if(v === '0') {
                    return '否';
                }else {
                    return '是';
                }
            }
        }, {
            field: 'stockOut',
            title: '卖出量'
        }, {
            field: 'stockRemain',
            title: '剩余库存'
        }, {
            field: 'buyLimit',
            title: '单人购买次数上限'
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            search: true
        }, {
            field: 'orderNo',
            title: '显示顺序'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610705,
                        deleteCode: '610701',
                        btnEvent: {
                            showHide: (selectedRowKeys, selectedRows) => {
                                if (!selectedRowKeys.length) {
                                    showWarnMsg('请选择记录');
                                } else if (selectedRowKeys.length > 1) {
                                    showWarnMsg('请选择一条记录');
                                } else {
                                    let sName = selectedRows[0].status === '0' ? '显示' : '隐藏';
                                    confirm({
                                        title: `${sName}产权`,
                                        content: `是否${sName}该产权`,
                                        onOk: () => {
                                            let hasMsg = message.loading('');
                                            fetch('610703', {
                                                code: selectedRowKeys[0]
                                            }).then(() => {
                                                hasMsg();
                                                message.success('操作成功', 1, () => {
                                                    this.props.getPageData();
                                                });
                                            }, hasMsg);
                                        },
                                        okText: '确定',
                                        cancelText: '取消'
                                    });
                                }
                            }
                        }
                    })
                }
            </div>
        );
    }
}

export default propertyRight;
