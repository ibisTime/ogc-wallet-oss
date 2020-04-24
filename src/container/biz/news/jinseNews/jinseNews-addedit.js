import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class JinseNewsAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '标题',
            field: 'title'
        }, {
            title: '作者',
            field: 'auther'
        }, {
            title: '广告图',
            field: 'advPic',
            type: 'img'
        }, {
            title: '内容',
            field: 'content',
            type: 'textarea'
        }, {
            title: '抓取时间',
            field: 'crawlDatetime',
            type: 'datetime'
        }, {
            title: '挑选次数',
            field: 'pickCount'
        }, {
            title: '挑选人',
            field: 'pickUser'
        }, {
            title: '挑选时间',
            field: 'pickDatetime',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '628106'
        });
    }
}

export default JinseNewsAddedit;