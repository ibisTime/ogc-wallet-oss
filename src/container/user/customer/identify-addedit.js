import React from 'react';
import { Form } from 'antd';
import { getQueryString, showSucMsg, showWarnMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class CustomerIdentifyAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.check = !!getQueryString('check', this.props.location.search);
    }
    checkOrder(params, verifyFlag) {
        this.doFetching();
        params.verifyFlag = verifyFlag;
        fetch(805207, params).then(() => {
            this.cancelFetching();
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        }).catch(this.cancelFetching);
    }
    getPicObj(data, type) {
        if (!data || !data.identifyRecordList || !data.identifyRecordList.length) {
            return null;
        }
        return data.identifyRecordList.filter(item => item.type === type)[0];
    }
    getPic(data, type) {
        let picObj = this.getPicObj(data, type);
        return picObj ? picObj.pic : '';
    }
    getPicMsg(data, type) {
        let picObj = this.getPicObj(data, type);
        return picObj && picObj.message ? `${picObj.errorCode}: ${picObj.message}` : '';
    }
    render() {
        const fields = [{
            title: '订单号',
            field: 'code'
        }, {
            field: 'mobile',
            title: '手机号',
            _keys: ['user', 'mobile']
        }, {
            field: 'frontImage',
            title: '身份证正面',
            type: 'img',
            formatter: (v, d) => this.getPic(d, '0')
        }, {
            field: 'data1',
            title: '身份证正面三方认证错误信息',
            formatter: (v, d) => this.getPicMsg(d, '0')
        }, {
            field: 'backImage',
            title: '身份证反面',
            type: 'img',
            formatter: (v, d) => this.getPic(d, '1')
        }, {
            field: 'data2',
            title: '身份证反面三方认证错误信息',
            formatter: (v, d) => this.getPicMsg(d, '1')
        }, {
            field: 'faceImage',
            title: '人脸照片',
            type: 'img',
            formatter: (v, d) => this.getPic(d, '2')
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: 'realName',
            title: '真实姓名',
            help: '审核通过时必须填写',
            readonly: !this.check,
            hidden: !this.check
        }, {
            field: 'idNo',
            title: '身份证号码',
            help: '审核通过时必须填写',
            idCard: true,
            readonly: !this.check,
            hidden: !this.check
        }, {
            field: 'remark',
            title: '审核说明',
            type: 'textarea',
            normalArea: true,
            readonly: !this.check
        }];
        const config = {
            fields,
            code: this.code,
            view: true,
            detailCode: '805205'
        };
        if (this.check) {
            config.buttons = [{
                title: '通过',
                handler: (params) => {
                    if (!params.realName) {
                        showWarnMsg('审核通过时必须填写真实姓名');
                    } else if (!params.idNo) {
                        showWarnMsg('审核通过时必须填写身份证号码');
                    } else {
                        this.checkOrder(params, 1);
                    }
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (params) => {
                    this.checkOrder(params, 0);
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: () => this.props.history.go(-1)
            }];
        }
        return this.buildDetail(config);
    }
}

export default CustomerIdentifyAddEdit;
