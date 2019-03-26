import React from 'react';
import {Form} from 'antd';
import {getQueryString, getRealCheckboxVal} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    componentWillMount() {
      fetch(625476).then(data => {
          console.log(data);
      });
    }

    render() {
        const fields = [{
            field: 'id',
            title: '应用ID',
            hidden: true,
            integer: true,
            required: true
        }, {
            field: 'category',
            type: 'select',
            search: true,
            key: 'dapp_category',
            title: '应用分类',
            required: true
        }, {
            field: 'name',
            title: '应用名称',
            search: true,
            required: true
        }, {
            field: 'company',
            title: '应用所属厂商',
            required: true
        }, {
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            required: true,
            title: '应用标签',
          params: {type: 0},
          formatter(v, d) {
            return v;
          }
        }, {
            field: 'desc',
            required: true,
            title: '应用详情描述'
        }, {
            field: 'download',
            title: '下载数量',
            required: true
        }, {
            field: 'location',
            value: '0',
            hidden: true,
            title: '位置'
        }, {
            field: 'picIcon',
            title: '图标',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'grade',
            title: '评分（星级）',
            type: 'select',
            data: [{
                'key': '1',
                'value': '1'
            }, {
                'key': '2',
                'value': '2'
            }, {
                'key': '3',
                'value': '3'
            }, {
                'key': '4',
                'value': '4'
            }, {
                'key': '5',
                'value': '5'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'action',
            title: '动作',
            key: 'dapp_action',
            required: true,
            type: 'select'
        }, {
            field: 'orderNo',
            title: '次序',
            integer: true,
            required: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            data: [{
                'key': '0',
                'value': '是'
            }, {
                'key': '1',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true
        }, {
            field: 'picList',
            type: 'img',
            single: true,
            title: '图片',
            required: true
        }, {
            field: 'picScreenshot',
            type: 'img',
            title: '图片详情',
            render: (v, d) => {
                return d.picScreenshotList;
            },
            required: true
        }, {
            field: 'language',
            title: '语言',
            value: 'ZH_CN',
            hidden: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                'key': '0',
                'value': '隐藏'
            }, {
                'key': '1',
                'value': '显示'
            }],
            keyName: 'key',
            valueName: 'value',
            hidden: !this.view
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime',
            hidden: !this.view
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: 625457,
            addCode: 625450,
            deleteCode: 625451,
            editCode: 625452,
          beforeSubmit: (params) => {
            params.dappId = this.dappId;
            let label = params.label.split(',');
            params.label = label.join('||');
            return params;
          }
        });
    }
}

export default AppmanagentAddedit;
