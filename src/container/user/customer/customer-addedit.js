import React from 'react';
import {Form} from 'antd';
import {getQueryString, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import './xx.css';
//
// var sdkAppID = 1400037025;
// var accountType = 29887;
// var loginInfo = {
//     'sdkAppID': this.sdkAppID, // 用户所属应用id,必填
//     'identifier': getUserId, // 当前用户ID,必须是否字符串类型，必填
//     // 'identifier': "user_b", //当前用户ID,必须是否字符串类型，必填
//     'accountType': accountType, // 用户所属应用帐号类型，必填
//     'userSig': "eJxNjVtvgjAYhv8Lt1tmoa26JbsohABBNx2aYWLSVFrNF*SwtjgXs-8*Qli22*d5Dzdns8geRFE0XW25-WqV8*Qg537AIFVt4QhK9-BTHaDiVhnLO6M0yDEk2hYkF5ZjLf91jSz5oHrmEoQQniGPjlJdW9CKi6Mdpl1KqddHRntR2kBT98JDLnU9jNCftFCpoUIQwfhxOvv9g1OPl*E2SJjY6Y7sJ-MEX87mw4*yQq6uKbYQ55t1W61ssJ-EzWnpN2zBIGQ0FQeWv7xOz5eckK1f0jTwshC-R3dxxCIj3so5SbLMrnfPzvcPcWhcPg__",
//     // 当前用户身份凭证，必须是字符串类型，必填
//     'identifierNick': null, // 当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
//     'headurl': 'img/me.jpg' // 当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
// };
// // 监听连接状态回调变化事件
// var onConnNotify = function (resp) {
//     var info;
//     switch (resp.ErrorCode) {
//         case webim.CONNECTION_STATUS.ON:
//             webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
//             break;
//         case webim.CONNECTION_STATUS.OFF:
//             info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
//             // alert(info);
//             webim.Log.warn(info);
//             break;
//         case webim.CONNECTION_STATUS.RECONNECT:
//             info = '连接状态恢复正常: ' + resp.ErrorInfo;
//             // alert(info);
//             webim.Log.warn(info);
//             break;
//         default:
//             webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
//             break;
//     }
// };

@Form.create()
class CustomerAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '昵称',
            field: 'nickname',
            readonly: this.view
        }, {
            field: 'loginName',
            title: '手机号/邮箱'
        }, {
            field: 'kind',
            title: '类型',
            type: 'select',
            data: [{
                key: 'C',
                value: 'c端'
            }, {
                key: 'Q',
                value: '渠道商'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'idKind',
            title: '证件类型',
            type: 'select',
            readonly: this.view,
            data: [{
                key: '1',
                value: '身份证'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'idNo',
            title: '证件号',
            readonly: this.view,
            maxlength: 30
        }, {
            field: 'realName',
            title: '真实姓名',
            readonly: this.view,
            maxlength: 10
        }, {
            field: 'userReferee',
            title: '推荐人',
            formatter: function (v, data) {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            required: true
        }, {
            field: 'isRealname',
            title: '是否实名',
            formatter: (v, data) => {
                return data.realName ? '是' : '否';
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'user_status'
        }, {
            field: 'createDatetime',
            title: '注册时间',
            type: 'datetime'
        }, {
            field: 'lastLogin',
            title: '最后登录时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
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
                            detailCode: '805121'
                        })
                    }
                </div>
            </div>
        );
    }
}

export default CustomerAddedit;
