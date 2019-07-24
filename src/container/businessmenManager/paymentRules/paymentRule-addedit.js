import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class paymentRuleAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.cData = {
            ckey: {
                ctype: getQueryString('ckey'),
                cLocation: 'fee_location'
            }
        };
    }

    render() {
        const fields = [{
            title: '说明',
            field: 'remark1',
            readonly: true,
            formatter: (v, data) => {
                return data.remark;
            }
        }, {
            title: '说明',
            field: 'remark',
            hidden: true
        }];
        if(getQueryString('ckey') === this.cData.ckey.cLocation) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'select',
                key: 'xxzf_fee_location'
            });
        }else{
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'textarate'
            });
        }
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: '630042',
            detailCode: '630046',
            beforeSubmit: function(data) {
                data.type = 'accept_rule';
                return data;
            }
        });
    }
}

export default paymentRuleAddedit;
