import React from 'react';
import {Form} from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString} from 'common/js/util';

@Form.create()
class ConfigurationAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.type = getQueryString('type', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.cData = {
            ctype: getQueryString('ctype'),
            ckey: {
                cDate: /_date/,
                cDateTime: /_datetime/,
                cSymbol: /_symbol/,
                cActivity: /_notice/,
                cSelect: /_select/,
                cTextarea: /_textarea/
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
        if (this.cData.ctype.match(this.cData.ckey.cDate)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'date'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cDateTime)) {
            fields.push({
                title: '数值',
                field: 'cvalue',
                required: true,
                type: 'datetime'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cTextarea) || this.cData.ctype.match(this.cData.ckey.cActivity)) {
            fields.push({
                title: '内容',
                field: 'cvalue',
                required: true,
                type: 'textarea'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cSymbol) || this.cData.ctype.match(this.cData.ckey.cSelect)) {
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
            beforeSubmit: function (data) {
                data.type = this.type;
                return data;
            }
        });
    }
}

export default ConfigurationAddedit;
