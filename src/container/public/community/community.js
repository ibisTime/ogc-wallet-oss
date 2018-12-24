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
} from '@redux/public/community';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicCommunity,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Community extends React.Component {
    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            search: true
        }, {
            title: '社群号',
            field: 'url'
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'commit_type',
            search: true
        }, {
            title: '顺序',
            field: 'orderNo'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: '630505',
            searchParams: {
                location: 'community'
            },
            singleSelect: false,
            btnEvent: {
                delete: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else {
                        let codeList = [];
                        for(let i = 0, len = selectedRows.length; i < len; i++) {
                            codeList.push(selectedRows[i].code);
                        }
                        if (codeList.length > 0) {
                            Modal.confirm({
                                okText: '确认',
                                cancelText: '取消',
                                content: `确定删除？`,
                                onOk: () => {
                                    this.props.doFetching();
                                    return fetch(630501, {
                                        codeList: codeList
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

export default Community;
