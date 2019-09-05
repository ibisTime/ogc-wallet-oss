import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class MillRulesEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.type = getQueryString('ctype');
        this.cData = {
            ctype: getQueryString('ctype'),
            ckey: {
                cDate: /_date/,
                cSymbol: /_symbol/,
                cActivity: /_notice/,
                cSelect: /_select/,
                cTextarea: /_textarea/,
                cRQText: /_note/
            }
        };
        console.log('this.type', this.type);
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
        if(this.cData.ctype.match(this.cData.ckey.cDate)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'textarate'
            });
        } else if(this.cData.ctype.match(this.cData.ckey.cTextarea)) {
            fields.push({
                title: '内容',
                field: 'cvalue',
                required: true,
                type: 'textarea'
            });
        }else if(this.cData.ctype.match(this.cData.ckey.cSymbol) || this.cData.ctype.match(this.cData.ckey.cSelect)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'select',
                listCode: '802007',
                params: {
                    status: '0'
                },
                keyName: 'symbol',
                valueName: '{{symbol.DATA}}-{{cname.DATA}}'
            });
        } else if(this.cData.ctype.match(this.cData.ckey.cRQText)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                type: 'textarea',
                required: true
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
                data.type = 'miner';
                return data;
            }
        });
    }
}

export default MillRulesEdit;
