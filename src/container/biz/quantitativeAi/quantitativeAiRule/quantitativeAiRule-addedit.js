import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class CloudRulesEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.cData = {
            ctype: getQueryString('ctype'),
            ckey: {
                cDate: /_date/,
                cSymbol: /_symbol/,
                cActivity: /_notice/,
                cRule: /_rule/,
                cRedeem: /redeem_/
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
        if(this.cData.ctype.match(this.cData.ckey.cRedeem)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'text'
            });
        } else {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                number: true
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
                data.type = 'gplh';
                return data;
            }
        });
    }
}

export default CloudRulesEdit;
