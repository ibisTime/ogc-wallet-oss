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
} from '@redux/managent/tag';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.TAG,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Aboutus extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            title: '应用ID'
        }, {
            field: 'name',
            title: '名称(中文)',
            search: true
        }, {
            field: 'type',
            key: 'open_dapp_tag_type',
            select: 'select',
            title: '标签分类'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625475'
        });
    }
}

export default Aboutus;
