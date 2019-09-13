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
} from '@redux/ecology/integrationEcology/userQuery/userQuery';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.IntegrationEcologyUserQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserQuery extends React.Component {
    render() {
        const fields = [{
            field: 'dappname',
            title: '应用名称',
            render: (v, data) => {
                return data.openDapp.name;
            }
        }, {
            field: 'dappId',
            title: '应用',
            type: 'select',
            pageCode: '625455',
            keyName: 'id',
            valueName: '{{name.DATA}}',
            searchName: 'name',
            noVisible: true,
            search: true
        }, {
            field: 'nickname',
            title: '姓名',
            render: (v, data) => {
                return data.user.nickname;
            }
        }, {
            field: 'userId',
            title: '账号',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                return data.user.mobile ? data.user.mobile : data.user.email;
            }
        }, {
            field: 'createDatetime',
            title: '加入时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625002,
            rowKey: 'id',
            searchParams: {
            }
        });
    }
}

export default UserQuery;