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
} from '@redux/public/channelbank';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicChannelBank,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ChanelBank extends React.Component {
    render() {
        const fields = [{
            title: '银行代号',
            field: 'bankCode'
        }, {
            title: '银行名称',
            field: 'bankName',
            search: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'bank_card_type',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '802115',
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/channelbank/addedit?id=${selectedRows[0].id}&v=1`);
                    }
                },
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/channelbank/addedit?id=${selectedRows[0].id}`);
                    }
                }
            }
        });
    }
}

export default ChanelBank;
