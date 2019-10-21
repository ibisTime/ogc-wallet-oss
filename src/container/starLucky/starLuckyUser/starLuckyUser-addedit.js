import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class StarUserAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.starId = getQueryString('starId', this.props.location.search);
        this.starName = sessionStorage.getItem('starName') || '';
        this.starSymbol = sessionStorage.getItem('starSymbol') || '';
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'starId',
            title: '星球',
            value: `${this.starName}-${this.starSymbol}`,
            readonly: true
        }, {
            field: 'userId',
            title: '必中用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            required: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '640010',
            deleteCode: '640011',
            beforeSubmit: (params) => {
                params.starId = this.starId;
                return true;
            }
        });
    }
}

export default StarUserAddedit;