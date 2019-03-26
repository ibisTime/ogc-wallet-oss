import React from 'react';
import { Form } from 'antd';
import {getQueryString, getUserName} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class UserResetPwd extends DetailUtil {
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
        return this.buildDetail({
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
