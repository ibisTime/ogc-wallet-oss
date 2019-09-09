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
} from '@redux/house/atNight/atNight';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.atNight,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class propertyRight extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '产品名称'
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            field: 'symbol',
            title: '购买币种',
            render: function (v, data) {
                return `${v === 'TOSP_JIFEN' ? 'TOSP(积分)' : (v === 'JY' ? '间夜' : v)}`;
            }
        }, {
            field: 'stockTotal',
            title: '总库存'
        }, {
            field: 'stockOut',
            title: '真实卖出量'
        }, {
            field: 'stockRemain',
            title: '剩余库存'
        }, {
            field: 'orderNo',
            title: '显示顺序'
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            search: true
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
                        pageCode: 610755,
                        deleteCode: '610751',
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
                                        content: `是否${sName}该夜间产品`,
                                        onOk: () => {
                                            let hasMsg = message.loading('');
                                            fetch('610753', {
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
