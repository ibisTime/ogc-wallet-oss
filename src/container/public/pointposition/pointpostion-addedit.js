import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg, getUserName } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import UpDown from 'component/up-down/repetition';
@Form.create()
class BannerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            dkey: '',
            url: false,
            id: false
        };
        this.state = {
            // 窗口是否显示
            updownVisible: false
        };
    }
    setModalVisible = (updownVisible) => {
        this.setState({ updownVisible });
    }
    render() {
        const fields = [{
            title: '提交人昵称',
            field: 'name'
        }, {
            title: '提交人手机号',
            field: 'mobile',
            search: true
        }, {
            title: '所在端',
            field: 'orderNo'
        }, {
            title: 'Bug描述',
            field: 'orderNo'
        }, {
            title: '复现步骤',
            field: 'orderNo'
        }, {
            title: '截图',
            type: 'img',
            field: 'pic'
        }, {
            title: '状态',
            field: 'status',
            data: [{
                key: '0',
                value: '待确认'
            }, {
                key: '1',
                value: '已确认待奖励'
            }, {
                key: '2',
                value: '复现不成功'
            }, {
                key: '3',
                value: '已奖励'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '提交时间',
            field: 'commitDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }, {
            title: '审批说明',
            field: 'approveNote',
            readonly: false,
            required: true
        }];
        return(
            <div>
                { this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: 805106,
            buttons: [{
                title: '复现成功',
                handler: (param) => {
                    this.setState({
                        updownVisible: true
                    });
                    var data = {
                        code: this.code,
                        approveResult: '1',
                        approveUser: this.getUserName(),
                        handleNote: param.handleNote
                    };
                    this.doFetching();
                    fetch(805101, data).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '复现不成功',
                handler: (param) => {
                    var data = {
                        code: this.code,
                        approveResult: '0',
                        approveUser: this.getUserName()
                    };
                    this.doFetching();
                    fetch(805101, data).then(() => {
                        showSucMsg('操作成功');
                        this.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }]
        })}
                <UpDown
                    updownVisible={this.state.updownVisible}
                    setModalVisible={this.setModalVisible}
                    biz={this.state.biz}
                    codeList ={this.state.codeList}
                    onOk={() => {
                        this.setModalVisible(false);
                        this.props.getPageData();
                    }} />
            </div>
        );
    }
}
export default BannerAddEdit;
