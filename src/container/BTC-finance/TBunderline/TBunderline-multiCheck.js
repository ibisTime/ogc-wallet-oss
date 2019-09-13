import React from 'react';
import { Form } from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/TBunderline/TBunderline-multiCheck';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import fetch from 'common/js/fetch';
import DetailUtil from 'common/js/build-detail';
@Form.create()
class TBunderlineMultiCheck extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        let fields = [{
            field: 'mAddressId',
            title: '广播地址',
            required: true,
            type: 'select',
            pageCode: '802575',
            params: {
                type: 'M',
                statusList: ['0']
            },
            keyName: 'address',
            valueName: '{{address.DATA}}',
            searchName: 'address'
        }];
        return this.buildDetail({
            fields,
            code: '',
            view: this.view,
            buttons: [{
                title: '广播',
                handler: (params) => {
                    let address = this.props.selectData.mAddressId.find(v => v.mAddressId === params.address);
                    params.mAddressId = address.id;
                    params.code = this.code;
                    params.approveUser = getUserId();
                    this.doFetching();
                    fetch(802353, params).then(() => {
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
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }]
        });
    }
}

export default TBunderlineMultiCheck;
