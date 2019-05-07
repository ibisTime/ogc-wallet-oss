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
} from '@redux/public/pointpostion';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.publicPointPostion,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class publicPointPostion extends React.Component {
    render() {
        const fields = [{
            title: '提交人昵称',
            field: 'name',
            search: true
        }, {
            title: '提交人手机号',
          field: 'mobile',
            search: true
        }, {
            title: '所在端',
            field: 'orderNo',
            search: true
        }, {
            title: '严重等级',
            search: true,
            field: 'orderNo'
        }, {
            title: '状态',
            field: 'status',
            search: true
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
            pageCode: '805105',
            btnEvent: {
                check: (selectedRowKeys, selectedRows) => {
                            this.props.history.push(`/public/pointpostion/addedit?&v=1`);
                }
            }
        });
    }
}

export default publicPointPostion;
