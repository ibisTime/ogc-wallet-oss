import React from 'react';
import {Form, message} from 'antd';
import {getQueryString, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

const levelData = {
    '0': '社区节点（低）',
    '1': '城市节点（中）',
    '2': '超级节点（高）'
};

@Form.create()
class MillUserNode extends DetailUtil {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
        this.id = getQueryString('id', this.props.location.search);
        this.nodeLevel = !!getQueryString('nodeLevel', this.props.location.search);
        this.initIndex = 0;
        this.nodeLevelManual = null;
    }

    render() {
        const fields = [{
            title: '用户名',
            field: 'userId',
            readonly: !!this.userId,
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            render: (v, data) => {
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
            required: !this.userId
        }, {
            title: '节点用户等级',
            field: 'nodeLevelManual',
            type: 'select',
            key: 'user_node_level_fpp',
            required: true,
            formatter: (v, d) => {
                if(+d.way === 0) {
                    this.nodeLevelManual = d.nodeLevelAuto.toString();
                    return levelData[d.nodeLevelAuto.toString()];
                }else {
                    this.nodeLevelManual = d.nodeLevelManual.toString();
                    return levelData[d.nodeLevelManual.toString()];
                }
            },
            onChange: (v) => {
                if(v && this.initIndex > 0) {
                    this.initIndex = -1;
                }
                if(v) {
                    this.initIndex++;
                }
            }
        }];
        return this.buildDetail({
            fields,
            code: this.id,
            key: 'id',
            view: this.view,
            detailCode: '805356',
            buttons: [{
                code: 'add',
                type: 'primary',
                title: '确定',
                handler: (params) => {
                    if(this.userId) {
                        params.userId = this.userId;
                    }
                    if(!params.userId || !params.nodeLevelManual) {
                        return message.warning('请填写完整', 1.5);
                    }
                    let hasMsg = message.loading('');
                    if(this.initIndex > 0 && !!this.userId) {
                        params.nodeLevelManual = this.nodeLevelManual;
                    }
                    fetch('805350', params).then(() => {
                        hasMsg();
                        message.success('操作成功', 1);
                        window.history.go(-1);
                    }, hasMsg);
                }
            }, {
                code: 'bank',
                title: '返回',
                handler: () => {
                    window.history.go(-1);
                }
            }]
        });
    }
}

export default MillUserNode;
