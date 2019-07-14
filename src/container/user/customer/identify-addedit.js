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
            type: 'img'
        }, {
            field: 'backImage',
            title: '身份证反面',
            type: 'img'
        }, {
            field: 'faceImage',
            title: '人脸照片',
            type: 'img'
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: 'realName',
            title: '真实姓名',
            readonly: true,
            hidden: !this.check
        }, {
            field: 'idNo',
            title: '身份证号码',
            idCard: true,
            readonly: true,
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
                    params.codeList = [params.code];
                    this.checkOrder(params, 1);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不通过',
                handler: (params) => {
                    params.codeList = [params.code];
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
