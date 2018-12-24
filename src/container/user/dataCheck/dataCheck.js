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
} from '@redux/user/dataCheck/dataCheck';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg} from 'common/js/util';
import {activateUser} from 'api/user';

@listWrapper(
    state => ({
        ...state.userDataCheck,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class DataCheck extends React.Component {
    render() {
        const fields = [{
            field: 'realName',
            title: '姓名'
        }, {
            title: '用户',
            field: 'applyUser',
            type: 'select',
            pageCode: '805120',
            params: {
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.applyUserInfo ? data.applyUserInfo.mobile : '';
            }
        }, {
            field: 'idNo',
            title: '身份证'
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                return data.applyUserInfo ? data.applyUserInfo.email : '';
            }
        }, {
            field: 'idKind',
            title: '类型',
            type: 'select',
            key: 'id_kind',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'approve_status',
            search: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: 'approveDatetime',
            title: '审核时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '805165',
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待审核的记录');
                    } else {
                        this.props.history.push(`/user/dataCheck/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default DataCheck;
