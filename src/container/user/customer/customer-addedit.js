import React from 'react';
import {Form} from 'antd';
import {getQueryString, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import './xx.css';

@Form.create()
class CustomerAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.systemCode = localStorage.getItem('SYSTEM_CODE');
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
            valueName: 'value',
            hidden: this.systemCode === 'CL-STAR'
        }, {
            field: 'idNo',
            title: '证件号',
            readonly: this.view,
            maxlength: 30,
            hidden: this.systemCode === 'CL-STAR'
        }, {
            field: 'realName',
            title: '真实姓名',
            readonly: this.view,
            maxlength: 10,
            hidden: this.systemCode === 'CL-STAR'
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
            },
            hidden: this.systemCode === 'CL-STAR'
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
