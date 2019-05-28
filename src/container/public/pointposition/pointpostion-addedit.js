import React from 'react';
import {Form} from 'antd';
import {getQueryString, showSucMsg, getUserName} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import DetailComp from 'common/js/lib/DetailComp';
import UpDown from 'component/up-down/repetition';

@Form.create()
class BannerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.isAdd = getQueryString('isAdd', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            code: '',
            biz: '',
            // 窗口是否显示
            updownVisible: false,
            approveNote: ''
        };
        this.buttons = [];
        if (this.isAdd) {
            this.buttons = [{
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        } else {
            this.buttons = [{
                title: '复现成功',
                handler: (param) => {
                    this.setState({
                        updownVisible: true,
                        code: param.code,
                        approveNote: param.approveNote
                    });
                }
            }, {
                title: '复现不成功',
                handler: (param) => {
                    var data = {
                        code: param.code,
                        approveResult: '0',
                        approveUser: getUserName(),
                        approveNote: param.approveNote
                    };
                    this.doFetching();
                    fetch(805101, data).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                }
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    setModalVisible = (updownVisible) => {
        this.setState({updownVisible});
    }

    render() {
        const fields = [{
            title: '提交人昵称',
            field: 'commitUser',
            formatter: (v, d) => {
                return d.commitUserInfo ? d.commitUserInfo.nickname : '';
            }
        }, {
            title: '提交人手机号',
            field: 'commitUserMobile',
            formatter: (v, d) => {
                return d.commitUserInfo ? d.commitUserInfo.mobile : '';
            }
        }, {
            title: '所在端',
            field: 'deviceSystem'
        }, {
            title: 'Bug描述',
            field: 'description'
        }, {
            title: '复现步骤',
            field: 'reappear'
        }, {
            title: '截图',
            type: 'img',
            field: 'pic'
        }, {
            title: '提交时间',
            field: 'commitDatetime',
            type: 'datetime'
        }, {
            title: '奖励数量',
            field: 'payAmount'
        }, {
            title: '奖励说明',
            field: 'payNote'
        }, {
            title: '备注',
            field: 'commitNote'
        }, {
            title: '审批说明',
            field: 'approveNote',
            readonly: !!this.isAdd,
            required: true
        }];
        return (
            <div>
                {this.buildDetail({
                    fields,
                    code: this.code,
                    view: this.view,
                    detailCode: 805106,
                    buttons: this.buttons
                })}
                <UpDown
                    updownVisible={this.state.updownVisible}
                    setModalVisible={this.setModalVisible}
                    code={this.state.code}
                    approveNote={this.state.approveNote}
                    onOk={() => {
                        this.setModalVisible(false);
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                        this.props.getPageData();
                    }}/>
            </div>
        );
    }
}

export default BannerAddEdit;
