import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class GoldenMileAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.cData = {
            ctype: getQueryString('ckey'),
            ckey: {
                cDate: /_date/,
                cSymbol: /_symbol/,
                cActivity: /_notice/,
                cRule: /_rule/
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
        }, {
            title: '数值',
            field: 'cvalue',
            required: true
        }];
        if(this.cData.ctype.match(this.cData.ckey.cDate)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'time'
            });
        } else if(this.cData.ctype.match(this.cData.ckey.cActivity) || this.cData.ctype.match(this.cData.ckey.cRule)) {
            fields.push({
                title: '内容',
                field: 'cvalue',
                required: true,
                type: 'textarea'
            });
        }else if(this.cData.ctype.match(this.cData.ckey.cSymbol)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'select',
                pageCode: '802005',
                params: {
                    status: '0'
                },
                keyName: 'symbol',
                valueName: '{{symbol.DATA}}-{{cname.DATA}}'
            });
        } else {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true
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
                data.ckey = 'candy';
                return data;
            }
        });
    }
}

export default GoldenMileAddedit;
