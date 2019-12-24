import React from 'react';
import {Form} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/userToken/tokenRecord';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.userTokenRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TokenRecord extends React.Component {
    keyCode = getQueryString('keyCode', this.props.location.search) || '';
    render() {
        const fields = [{
            title: '转让人',
            field: 'fromUser',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return d && d.fromUserName;
            }
        }, {
            title: '受让人',
            field: 'toUser',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return d && d.toUserName;
            }
        }, {
            field: 'keyLevel',
            title: '令牌等级',
            render(v, d) {
                return d && `L${d.keyLevel}-${d.keyName}`;
            }
        }, {
            field: 'createDatetime',
            title: '转让时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625830',
            searchParams: {
                keyCode: this.keyCode
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default TokenRecord;