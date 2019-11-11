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
} from '@redux/marketingManagement/marketingActivities/registerToSend';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import { Link } from 'react-router-dom';

@listWrapper(
    state => ({
        ...state.marketRegisterToSend,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RegisterToSend extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '规则名称'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'register_market'
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/configuration/configuration-addedit?code=${selectedRows[0].id}&ctype=${selectedRows[0].ckey}&type=register_market`);
                    }
                }
            }
        });
    }
}

export default RegisterToSend;
