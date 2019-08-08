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
        this.isNotEmail = true;
        this.isNotTel = true;
    }

    render() {
        const fields = [{
            field: 'registerType',
            title: '注册类型',
            type: 'select',
            data: [{
                'key': '0',
                'value': '手机'
            }, {
                'key': '1',
                'value': '邮箱'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            onChange: (v) => {
                if (v === '0') {
                    this.isNotEmail = true;
                    this.isNotTel = false;
                }else{
                    this.isNotEmail = false;
                    this.isNotTel = true;
                }
            }
        }, {
            field: 'mobile',
            title: '手机号',
            hidden: this.isNotTel,
            required: this.isNotEmail
        }, {
            field: 'mobile',
            title: '邮箱',
            hidden: this.isNotEmail,
            required: this.isNotTel
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
