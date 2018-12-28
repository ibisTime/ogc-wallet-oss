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
} from '@redux/biz/applicationList/applicationList';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {downCoin, upCoin} from 'api/coin';

@listWrapper(
    state => ({
        ...state.bizApplicationList,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ApplicationList extends React.Component {
    render() {
        const fields = [{
            title: '应用名',
            field: 'name',
            search: true
        }, {
            title: '语言',
            field: 'language',
            type: 'select',
            data: [{
                key: 'ZH_CN',
                value: '中文'
            }, {
                key: 'EN',
                value: '英文'
            }, {
                key: 'KO',
                value: '韩文'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '应用简介',
            field: 'slogan'
        }, {
            title: '显示状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '不显示'
            }, {
                key: '1',
                value: '显示'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '序号',
            field: 'orderNo'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625410',
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].status !== '1') {
                    //     showWarnMsg('当前记录不可修改');
                    } else {
                        this.props.history.push(`/biz/applicationList?code=${selectedRowKeys[0]}`);
                    }
                },
                setShowHide: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                        // } else if (selectedRows[0].status !== '1') {
                        //     showWarnMsg('当前记录不可修改');
                    } else {
                        this.props.history.push(`/biz/applicationList?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ApplicationList;
