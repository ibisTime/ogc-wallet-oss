import React from 'react';
import {Form} from 'antd';
import {getQueryString, showSucMsg, getRealCheckboxVal} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.action = getQueryString('action', this.props.location.search);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.buttons = [];
        this.state = {
            ...this.state,
            isHideTickets: true
        };
        this.isFirst = true;
    }
    render() {
        const fields = [{
        //     title: '类型',
        //     type: 'select',
        //     key: 'dopen_app_action',
        //     required: true,
        //     readonly: this.code,
        //     field: 'action',
        //     onChange: (v) => {
        //         this.setState({dkey: v});
        //         if (v === '1') {
        //             this.setState({ category: true, name: true, picList: true });
        //         } else if (v === '2') {
        //             this.setState({ category: true, name: true, picList: true, url: true });
        //         }
        //     }
        // }, {
            field: 'id',
            title: '应用ID',
            hidden: true,
            integer: true
        // }, {
        //     field: 'category',
        //     type: 'select',
        //     search: true,
        //     key: 'dopen_app_category',
        //     title: '应用分类',
        //     required: true
        }, {
            field: 'name',
            title: '应用名称',
            required: true
        // }, {
        //     field: 'company',
        //     title: '应用所属厂商',
        //     required: true,
        //     hidden: this.state.dkey === '1' || this.state.dkey === '2' || this.state.dkey === '4'
        // }, {
        //     field: 'label',
        //     type: 'checkbox',
        //     listCode: '625476',
        //     keyName: 'id',
        //     valueName: 'name',
        //     hidden: this.state.dkey !== '3',
        //     required: !(this.state.dkey !== '3'),
        //     title: '应用标签',
        //     params: {type: 0},
        //     formatter(v, d) {
        //         return v;
        //     }
        // }, {
        //     field: 'location',
        //     type: 'select',
        //     required: true,
        //     key: 'dopen_app_location',
        //     title: '位置'
        }, {
            field: 'enName',
            title: '英文名称',
            required: true
        }, {
            field: 'picList',
            title: '列表展示图',
            type: 'img',
            single: true,
            required: true
        }, {
            title: 'url地址',
            field: 'url'
        }, {
            field: 'orderNo',
            title: '次序',
            integer: true,
            required: true
        }, {
            field: 'ticketsFlag',
            title: '门票是否开启',
            type: 'select',
            data: [{
                'key': '1',
                'value': '是'
            }, {
                'key': '0',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value',
            required: true,
            onChange: (v) => {
                if(v === '1') {
                    this.setState({
                        isHideTickets: false
                    });
                }else {
                    this.setState({
                        isHideTickets: true
                    });
                }
            },
            formatter: (v) => {
                if(v === '1' && this.isFirst) {
                    this.isFirst = false;
                    this.setState({
                        isHideTickets: false
                    });
                }
                return v;
            }
        }, {
            field: 'ticketsPrice',
            title: '门票价格',
            hidden: this.state.isHideTickets,
            required: !this.state.isHideTickets
        }, {
            field: 'ticketsSymbol',
            title: '门票币种',
            hidden: this.state.isHideTickets,
            required: !this.state.isHideTickets,
            type: 'select',
            listCode: '802007',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}'
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
            field: 'language',
            title: '语言',
            hidden: true,
            value: 'ZH_CN'
        }, {
            field: 'desc',
            type: 'textarea',
            normalArea: true,
            title: '应用详情描述'
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
            addCode: 625653,
            editCode: 625663,
            beforeSubmit: (params) => {
                if(params.ticketsFlag === '0') {
                    params.ticketsPrice = '0';
                }
                return true;
            }
        });
    }
}

export default AppmanagentAddedit;
