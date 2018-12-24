import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/activity/invitingHref/invitingTxt-addedit';
import {showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.activityInvitingTxtAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class InvitingTxtAddedit extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            hidden: true
        }, {
            title: '链接文本',
            field: 'cvalue',
            required: true
        }, {
            field: 'remark',
            hidden: true,
            value: '邀请好友链接文本'
        }];
        return this.props.buildDetail({
            fields,
            key: 'ckey',
            code: 'invite_url',
            detailCode: 630047,
            editCode: 630042,
            buttons: [{
                title: '保存',
                check: true,
                handler: (params) => {
                    this.props.doFetching();
                    fetch(630042, params).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                    }).catch(this.props.cancelFetching);
                }
            }]
        });
    }
}

export default InvitingTxtAddedit;
