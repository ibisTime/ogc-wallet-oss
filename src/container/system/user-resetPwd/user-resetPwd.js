import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/system/user-resetPwd';
import {getQueryString, getUserName} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.systemUserResetPwd,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class UserResetPwd extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
        this.userName = getQueryString('userName', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '用户名',
            field: 'userName',
            value: this.userName,
            readonly: true
        }, {
            title: '新密码',
            field: 'newLoginPwd',
            type: 'password',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            addCode: 630055,
            beforeSubmit: (params) => {
                params.userId = this.userId;
                return params;
            }
        });
    }
}

export default UserResetPwd;
