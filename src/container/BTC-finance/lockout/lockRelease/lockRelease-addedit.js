import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class LockReleaseAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '针对用户',
            field: 'userName',
            formatter() {
                return sessionStorage.getItem('USER_NAME') || '-';
            }
        }, {
            title: '币种',
            field: 'currency'
        }, {
            title: '解锁数量',
            field: 'amount'
        }, {
            title: '操作人',
            field: 'applyUserName'
        }, {
            title: '操作时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '说明',
            field: 'applyNote'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '806046'
        });
    }
}

export default LockReleaseAddedit;
