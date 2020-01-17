import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class NewsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '标题',
            field: 'title',
            required: true,
            maxlength: 24
        }, {
            title: '类型',
            field: 'typeList',
            type: 'select',
            listCode: '628007',
            keyName: 'code',
            valueName: 'name',
            required: true
        }, {
            title: '语言',
            field: 'language',
            type: 'select',
            key: 'sms_lang',
            required: true
        }, {
            title: '来源',
            field: 'source'
        }, {
            title: '作者',
            field: 'auther'
        }, {
            title: '广告图(最多三张)',
            field: 'advPic',
            type: 'img',
            required: true
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea',
            required: true,
            tipEle: {
                id: 'content',
                style: {
                    color: '#f5222d'
                },
                content: '建议：内容最好不能低于600个字, 每300个字之后，最好有一张图片'
            }
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '628190',
            editCode: '628191',
            detailCode: '628196',
            beforeSubmit: (params) => {
                if(typeof params.typeList === 'string') {
                    params.typeList = [params.typeList];
                }
                return params;
            }
        });
    }
}

export default NewsAddedit;
