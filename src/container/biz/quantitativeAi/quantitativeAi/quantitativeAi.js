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
} from '@redux/quantitativeAi/quantitativeAi/quantitativeAi';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.quantitativeAi,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuantitativeAi extends React.Component {
    render() {
        const fields = [{
            field: 'nameForQuery',
            title: '产品名称',
            noVisible: true,
            search: true
        }, {
            field: 'name',
            title: '产品名称'
        }, {
            field: 'symbolBuy',
            title: '买入币种',
            search: true
        }, {
            field: 'symbolIncome',
            title: '收益币种'
        }, {
            field: 'rate',
            title: '日息'
        }, {
            field: 'lockDays',
            title: '锁仓天数'
        }, {
            field: 'buyMin',
            title: '最小投注币数量'
        }, {
            field: 'buyMax',
            title: '最大投注币数量'
        }, {
            field: 'status',
            title: '状态',
            key: 'gplh_project_status',
            type: 'select',
            search: true
        }, {
            field: 'feeRate',
            title: '手续费'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610305,
            deleteCode: '610301',
            searchParams: {
                orderDir: 'desc',
                orderColumn: 'createTime'
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        if(selectedRows[0].status === '1') {
                            showWarnMsg('产品已上架，无法修改');
                            return false;
                        }else {
                            this.props.history.push(`/quantitativeAi/quantitativeAi/addedit?code=${selectedRowKeys[0]}`);
                        }
                    }
                },
                showHide: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let sName = selectedRows[0].status === '0' ? '上架' : '下架';
                        confirm({
                            title: `${sName}`,
                            content: `是否${sName}该产品`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('610303', {
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
        });
    }
}

export default QuantitativeAi;
