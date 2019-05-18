import React from 'react';
import {Form, message} from 'antd';
import {getQueryString, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class UserNode extends DetailUtil {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
        this.nodeLevel = !!getQueryString('nodeLevel', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '用户名',
            field: 'userId',
            readonly: true,
            formatter(v, d) {
                return d.nickname + '-' + d.loginName;
            }
        }, {
            title: '节点用户等级',
            field: 'nodeLevel',
            type: 'select',
            key: 'node_level',
            required: true
        }, {
            field: 'nodeAmount',
            title: '成为节点用户所需金额(万元)',
            required: true,
            formatter(v) {
                return (+v / 10000).toFixed(2);
            }
        }, {
            field: 'nodePwd',
            title: '节点用户登录密码',
            type: 'password',
            required: true,
            formatter() {
                return null;
            }
        }];
        return this.buildDetail({
            fields,
            code: this.userId,
            key: 'userId',
            view: this.view,
            detailCode: '805121',
            buttons: [{
                code: 'add',
                type: 'primary',
                title: '确定',
                handler: (params) => {
                    params.userId = this.userId;
                    let code = this.nodeLevel ? '805096' : '805095';
                    if(!params.nodePwd) {
                        message.warning('请输入登录密码', 1);
                        return;
                    }
                    let hasMsg = message.loading('');
                    params.nodeAmount = (params.nodeAmount * 10000).toString();
                    fetch(code, params).then(() => {
                        hasMsg();
                        message.success('操作成功', 1);
                        window.history.go(-1);
                    }, hasMsg);
                }
            }, {
                code: 'bank',
                title: '返回',
                handler: (params) => {
                    window.history.go(-1);
                }
            }]
        });
    }
}

export default UserNode;
