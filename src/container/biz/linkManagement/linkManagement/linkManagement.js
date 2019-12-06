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
} from '@redux/biz/linkManagement/linkManagement';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.bizLinkManagement,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class LinkManagement extends React.Component {
    render() {
        const fields = [{
            field: 'name',
            title: '名称',
            search: true
        }, {
            field: 'category',
            title: '类型',
            type: 'select',
            key: 'friend_link_category',
            search: true
        }, {
            field: 'action',
            title: '动作',
            type: 'select',
            key: 'dopen_app_action',
            search: true
        }, {
            field: 'location',
            title: 'UI位置',
            type: 'select',
            key: 'dopen_app_location',
            search: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'status',
            title: '状态',
            data: [{
                key: '1',
                value: '显示'
            }, {
                key: '0',
                value: '隐藏'
            }],
            keyName: 'key',
            valueName: 'value',
            type: 'select'
        }, {
            field: 'orderNo',
            title: 'UI次序'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: 802055,
            deleteCode: '802042',
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        if(selectedRows[0].status === '1') {
                            showWarnMsg('已上架，无法修改');
                            return false;
                        }else {
                            this.props.history.push(`/biz/linkManagement/addedit?code=${selectedRowKeys[0]}`);
                        }
                    }
                },
                upDown: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let sName = selectedRows[0].status === '0' ? '上架' : '下架';
                        confirm({
                            title: `${sName}`,
                            content: `是否${sName}`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('802043', {
                                    id: selectedRowKeys[0]
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

export default LinkManagement;
