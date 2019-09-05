import React from 'react';
import {Form, Input} from 'antd';
import {getQueryString, moneyFormat, moneyParse, showSucMsg, getUserId} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class transfeRecordExamine extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            remarks: ''
        };
    }
    handleInpt = (event) => {
        this.setState({
            remarks: event.target.value
        });
    }
    render() {
        const {remarks} = this.state;
        let buttons = [{
            title: '通过',
            handler: (param) => {
                param.approveResult = '1';
                param.code = this.code;
                param.updater = getUserId();
                param.approveNote = remarks;
                this.doFetching();
                fetch(610771, param).then(() => {
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
            title: '不通过',
            handler: (param) => {
                param.approveResult = '0';
                param.code = this.code;
                param.updater = getUserId();
                param.approveNote = remarks;
                this.doFetching();
                fetch(610771, param).then(() => {
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
        }];
        let fields = [{
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
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
            noVisible: true,
            hidden: this.view
        }, {
            field: 'fromCurrency',
            title: '转入币种'
        }, {
            field: 'toCurrency',
            title: '转出币种'
        }, {
            field: 'amount',
            title: '金额'
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'realAmount',
            title: '实际金额'
        }, {
            field: 'status',
            title: '状态',
            key: 'transfer_order_status',
            type: 'select',
            search: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: '',
            title: ''
        }];
        return (
            <div>
                {
                    this.buildDetail({
                        fields,
                        code: this.code,
                        view: this.view,
                        detailCode: 610776,
                        buttons: buttons
                    })
                }
                <div style={{position: 'relative', top: '-120px', left: '12%', zIndex: '10001'}}><label>审核备注:</label><Input onChange={event => this.handleInpt(event)} style={{width: '380px', marginLeft: '6px'}} placeholder="请输入备注" /></div>
            </div>
        );
    }
}

export default transfeRecordExamine;
