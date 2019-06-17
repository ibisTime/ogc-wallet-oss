import React from 'react';
import {Form} from 'antd';
import {getQueryString, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import './xx.css';

@Form.create()
class CustomerRegister extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'mobile',
            title: '手机号',
            mobile: true,
            required: true
        }, {
            field: 'loginPwd',
            title: '登录密码',
            type: 'password',
            minlength: 6,
            maxlength: 20,
            required: true
        }, {
            field: 'inviteCode',
            title: '邀请码',
            required: true,
            maxlength: 6
        }];
        return (
            <div>
                <div style={{marginTop: '20px'}}>
                    {
                        this.buildDetail({
                            fields,
                            key: 'userId',
                            code: this.code,
                            view: this.view,
                            addCode: '805042'
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CustomerRegister;
