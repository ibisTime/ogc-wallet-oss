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
} from '@redux/system/sysParam';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.systemSysParam,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SysParam extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '参数名'
        }, {
            field: 'cvalue',
            title: '参数值'
        },
            {
                field: 'updateDatetime',
                title: '最近修改时间',
                type: 'datetime'
            }];
        return this.props.buildList({
            fields,
            pageCode: 630045,
            rowKey: 'id',
            buttons: [{
                code: 'edit',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/sysPara/addedit?code=${selectedRowKeys[0]}&cType=${selectedRows[0].ckey}`);
                    }
                }
            }]
        });
    }
}

export default SysParam;
