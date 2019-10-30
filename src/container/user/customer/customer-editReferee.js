import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CustomerEditReferee extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('userId', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '昵称',
            field: 'nickname',
            readonly: true
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}({{loginName.DATA}})',
            searchName: 'keyword',
            search: true,
            required: true,
            params: {
                limit: 1000
            }
        }];
        return this.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            detailCode: '805121',
            editCode: '805071'
        });
    }
}

export default CustomerEditReferee;
