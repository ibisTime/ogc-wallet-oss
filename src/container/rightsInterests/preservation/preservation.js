import React from 'react';
import {Modal, Transfer, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/preservation/preservation';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.rightsInterestsPreservation,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsPreservation extends React.Component {
    render() {
        const fields = [{
            title: '显示顺序',
            field: 'orderNo'
        }, {
            title: '产品名称',
            field: 'name',
            search: true
        }, {
            title: '购买币种',
            field: 'symbolIn',
            type: 'select',
            key: 'right_product_symbol_in'
        }, {
            title: '释放币种',
            field: 'symbolOut',
            type: 'select',
            key: 'right_product_symbol_out'
        }, {
            title: '购买数量',
            field: 'amountIn'
        }, {
            title: '释放数量',
            field: 'amountOut'
        }, {
            title: '有效期限（天）',
            field: 'daysLimit'
        }, {
            title: '显示位置',
            field: 'location',
            type: 'select',
            key: 'right_product_location'
        }, {
            title: '状态',
            field: 'status',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '不显示'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select',
            search: true
        }, {
            title: '创建人',
            field: 'creatorName'
        }, {
            title: '创建人时间',
            field: 'createTime',
            type: 'datetime'
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    pageCode: 805463,
                    deleteCode: 805461,
                    btnEvent: {
                        upDown: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                const tit = selectedRows[0].status === '0' ? '显示' : '隐藏';
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: `确定${tit}？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        fetch(805469, {code: selectedRowKeys[0]}).then(() => {
                                            showSucMsg('操作成功');
                                            this.props.cancelFetching();
                                            setTimeout(() => {
                                                this.props.getPageData();
                                            }, 1000);
                                        }).catch(this.props.cancelFetching);
                                    }
                                });
                            }
                        }
                    }
                })
            }
        </div>;
    }
}

export default RightsInterestsPreservation;
