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
} from '@redux/activity/invitingFriends/invitingFriends';
import {listWrapper} from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.activityInvitingFriends,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class InvitingFriends extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'award'
            },
            buttons: [{
                code: 'userInvestFlow',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                  if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                  } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                  } else {
                    this.props.history.push('/activity/invitingFriends/addedit?code=' + selectedRowKeys[0] + '&ctype=' + selectedRows[0].ckey);
                  }
                },
                check: true
              }]
        });
    }
}

export default InvitingFriends;
