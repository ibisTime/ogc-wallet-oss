import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class CommunityAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
          title: '名称',
          field: 'ckey',
          search: true
        }, {
          title: '社群号',
          field: 'cvalue'
        }, {
          title: '备注',
          field: 'remark'
        }];
        return this.buildDetail({
          fields,
          key: 'id',
          code: this.code,
          detailCode: 630046,
          editCode: 630042
        });
    }
}

export default CommunityAddedit;
