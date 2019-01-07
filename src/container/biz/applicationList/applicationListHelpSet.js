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
} from '@redux/biz/applicationList/applicationListHelpSet';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizApplicationListHelpSet,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ApplicationListHelpSet extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: 'id',
            field: 'id',
            visible: false
        }, {
            title: '问题',
            field: 'question',
            search: true
        }, {
            title: '序号',
            field: 'orderNo'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625425',
            searchParams: {
                refType: 'DAPP',
                refCode: this.code
            },
            deleteCode: '625421',
            btnEvent: [{
                code: 'add',
                name: '新增'
            }, {
                code: 'add',
                name: '修改'
            }, {
                code: 'goBack',
                name: '返回',
                check: false,
                handler: () => {
                    this.props.history.push(-1);
                }
            }]
        });
    }
}

export default ApplicationListHelpSet;