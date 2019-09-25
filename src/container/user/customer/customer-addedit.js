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
            title: '节点用户等级',
            field: 'nodeLevel',
            formatter: (v, data) => {
                let level;
                if (v === '0') {
                    level = '共营节点（高级）';
                } else if (v === '1') {
                    level = '社区节点（中级）';
                } else if (v === '2') {
                    level = '区域节点（初级）';
                } else {
                    level = '普通用户';
                }
                return level;
            }
        }, {
            field: 'nodeAmount',
            title: '成为节点用户HEY',
            formatter(v) {
                return (+v / 10000).toFixed(2);
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'user_status'
        }, {
            field: 'registerType',
            title: '注册方式',
            type: 'select',
            key: 'user_register_type'
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
