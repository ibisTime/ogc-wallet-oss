import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class SysParamAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
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
            field: 'remark',
            title: '参数名',
            hidden: true
        }, {
            field: 'remark1',
            title: '参数名',
            formatter: (v, d) => {
                return (d && d.remark) || '';
            },
            readonly: true
        }];
        if (this.cData.ctype.match(this.cData.ckey.cDate)) {
            fields.push({
                title: '参数值',
                field: 'cvalue',
                required: true,
                type: 'date'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cDateTime)) {
            fields.push({
                title: '参数值',
                field: 'cvalue',
                required: true,
                type: 'datetime'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cTextarea) || this.cData.ctype.match(this.cData.ckey.cActivity)) {
            fields.push({
                title: '参数值',
                field: 'cvalue',
                required: true,
                type: 'textarea'
            });
        } else if (this.cData.ctype.match(this.cData.ckey.cSymbol) || this.cData.ctype.match(this.cData.ckey.cSelect)) {
            fields.push({
                title: '参数值',
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
                title: '参数值',
                field: 'cvalue',
                required: true
            });
        }
        fields.push({
            title: '最近修改时间',
            field: 'updateDatetime',
            type: 'datetime',
            readonly: true
        });
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '630046',
            editCode: '630042'
        });
    }
}

export default SysParamAddEdit;
