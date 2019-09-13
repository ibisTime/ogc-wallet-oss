import React from 'react';
import {Form} from 'antd';
import {getQueryString} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class QuantitativeAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'title',
            title: '标题',
            required: true
        }, {
            field: 'type',
            title: '分类',
            type: 'select',
            listCode: '802860',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            field: 'code',
            title: '文章编号',
            hidden: !this.view,
            required: true
        }, {
            field: 'orderNo',
            title: '序号',
            number: true,
            required: true
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.buildDetail({
            fields,
            // key: 'id',
            code: this.code,
            view: this.view,
            addCode: 802870,
            detailCode: 802883,
            editCode: 802871
            // beforeSubmit: (data) => {
            //   let { pageData } = this.state;
            //   data.remark = pageData.remark;
            //   return data;
            // }
        });
    }
}

export default QuantitativeAddEdit;
