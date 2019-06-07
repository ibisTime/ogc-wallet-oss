import React from 'react';
import {Form} from 'antd';
import {getQueryString, showSucMsg, getRealCheckboxVal} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@Form.create()
    // 保留之前的代码
class AppmanagentAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.buttons = [];
        if(!this.code) {
            this.buttons = [{
                title: '保存',
                handler: (param) => {
                    if (param.level === '1') {
                        var data = {
                         name: param.name,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            desc: param.desc,
                            isTop: param.isTop
                        };
                        console.log(param);
                        fetch(625650, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.level === '2') {
                        fetch(625651).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.level === '3') {
                        fetch(625652).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    }
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }else if (this.code) {
            this.buttons = [{
                title: '保存',
                handler: (param) => {
                    if (param.level === '1') {
                        let data = {
                            name: param.name,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            desc: param.desc,
                            isTop: param.isTop
                        };
                        console.log(param);
                        fetch(625452, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.level === '2') {
                        let data = {
                            name: param.name,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            desc: param.desc,
                            url: param.url
                        };
                        fetch(625651, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.level === '3') {
                        let data = {
                            name: param.name,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            company: param.company,
                            desc: param.desc,
                            isTop: param.isTop,
                            url: param.url
                        };
                        fetch(625652, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.level === '4') {
                        let data = {
                            name: param.name,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            desc: param.desc,
                            url: param.url
                        };
                        fetch(625653, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    }
                },
                check: true,
                type: 'primary'
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }

    render() {
        const fields = [{
            title: '类型',
            search: true,
            type: 'select',
            key: 'dopen_app_action',
            required: true,
            field: 'level',
            onChange: (v) => {
                this.setState({dkey: v});
                if (v === '1') {
                    this.setState({ category: true, name: true, picIcon: true });
                } else if (v === '2') {
                    this.setState({ category: true, name: true, picIcon: true, url: true });
                }
            }
        }, {
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
            required: true,
            hidden: this.state.dkey === '1' || this.state.dkey === '2'
        }, {
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
            required: true,
            title: '应用标签',
          params: {type: 0},
          formatter(v, d) {
            return v;
          }
        }, {
            field: 'desc',
            required: this.state.dkey === '3',
            // hidden: this.state.dkey === '1' || this.state.dkey === '2',
            title: '应用详情描述'
        }, {
            field: 'download',
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
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
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
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
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
            type: 'select',
            onChange: (v) => {
                this.setState({dkey: v});
            }
        }, {
            title: 'url地址',
            field: 'url',
            hidden: this.state.dkey === '0' || this.state.dkey === '1',
            required: true
        }, {
            field: 'orderNo',
            title: '次序',
            integer: true,
            hidden: this.state.dkey === '2',
            required: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            hidden: this.state.dkey === '2',
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
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
            title: '图片',
            required: true
        }, {
            field: 'picScreenshot',
            type: 'img',
            title: '图片详情',
            hidden: this.state.dkey === '1' || this.state.dkey === '2',
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
            // addCode: 625450,
            deleteCode: 625451,
            editCode: 625452,
            buttons: this.buttons,
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
