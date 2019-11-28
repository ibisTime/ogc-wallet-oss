import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';

@Form.create()
class CategoryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            required: true,
            number: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '628000',
            editCode: '628001',
            detailCode: '628006',
            beforeSubmit: (data) => {
                data.updater = getUserName();
                return data;
            }
        });
    }
}

export default CategoryAddedit;
