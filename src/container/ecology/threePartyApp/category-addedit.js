import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CategoryAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '父菜单编号',
            field: 'parentKey',
            listCode: '630036',
            params: {
                type: 0
            },
            keyName: 'dkey',
            valueName: 'dvalue',
            type: 'select',
            readonly: this.code,
            required: !this.code
        }, {
            title: '字典键',
            field: 'dkey',
            required: true,
            readonly: this.code,
            maxlength: 15
        }, {
            title: '字典值',
            field: 'dvalue',
            required: true,
            maxlength: 15
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: 630030,
            editCode: 630032,
            detailCode: 630037,
            beforeSubmit: (params) => {
                if(!this.code) {
                    params.type = '1';
                }
                return true;
            }
        });
    }
}

export default CategoryAddedit;
