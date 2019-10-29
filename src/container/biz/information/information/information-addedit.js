import React from 'react';
import {Form, message} from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class InformationAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.index = 0;
        this.symbolIn = '';
        this.symbolOut = '';
    }
    render() {
        let fields = [{
            field: 'title',
            title: '标题',
            required: true
        }, {
            field: 'advPic',
            title: '展示图',
            required: true,
            type: 'img',
            single: true
        }, {
            field: 'content',
            title: '内容',
            required: true,
            type: 'textarea'
        }, {
            field: 'readCount',
            title: '阅读次数'
        }, {
            field: 'isTop',
            title: '是否置顶',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            type: 'select',
            keyName: 'key',
            valueName: 'value'
        }];
        if(this.code) {
            fields = fields.concat([{
                field: 'status',
                title: '状态',
                data: [{
                    key: '1',
                    value: '显示'
                }, {
                    key: '0',
                    value: '不显示'
                }],
                type: 'select',
                keyName: 'key',
                valueName: 'value',
                readonly: this.code
            }, {
                field: 'updaterName',
                title: '修改人',
                readonly: this.code
            }, {
                field: 'updateDatetime',
                title: '最近修改时间',
                type: 'datetime',
                readonly: true
            }]);
        }
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '629020',
            editCode: '629022',
            detailCode: '629025',
            beforeSubmit(params) {
                if(!params.readCount) {
                    delete params.readCount;
                }
                if(!params.isTop) {
                    delete params.isTop;
                }
                return true;
            }
        });
    }
}

export default InformationAddedit;
