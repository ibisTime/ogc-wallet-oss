import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/user/dataCheck/dataCheck-addedit';
import {getQueryString, getUserName, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.userDataCheckAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class DataCheckAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isCheck = !!getQueryString('isCheck', this.props.location.search);
        this.buttons = [];
        this.fields = [{
            field: 'idKind',
            title: '类型',
            type: 'select',
            key: 'id_kind',
            required: true
        }, {
            field: 'realName',
            title: '姓名',
            required: true
        }, {
            field: 'mobile',
            title: '手机号',
            required: true,
            formatter: (v, data) => {
                return data.applyUserInfo ? data.applyUserInfo.mobile : '';
            }
        }, {
            field: 'email',
            title: '邮箱',
            required: true,
            formatter: (v, data) => {
                return data.applyUserInfo ? data.applyUserInfo.email : '';
            }
        }, {
            field: 'idNo',
            title: '证件号',
            required: true
        }, {
            field: 'idFace',
            title: '证件正面',
            type: 'img'
        }, {
            field: 'idOppo',
            title: '证件反面',
            type: 'img'
        }, {
            //     field: 'idHold',
            //     title: '手持证件照',
            //     type: 'img'
            // }, {
            field: 'remark',
            title: this.isCheck ? '审核意见' : '备注',
            readonly: !this.isCheck,
            required: true
        }];

        if (this.isCheck) {
            this.buttons = [{
                title: '通过',
                handler: (param) => {
                    param.approveResult = '1';
                    param.id = this.code;
                    param.approveUser = getUserName();
                    this.props.doFetching();
                    fetch(805161, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (param) => {
                    param.approveResult = '0';
                    param.id = this.code;
                    param.approveUser = getUserName();
                    this.props.doFetching();
                    fetch(805161, param).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    render() {
        return this.props.buildDetail({
            fields: this.fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '805166',
            buttons: this.buttons
        });
    }
}

export default DataCheckAddedit;
