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
        this.isHideTickets = true;
        if(!this.code) {
            this.buttons = [{
                title: '保存',
                    handler: (param) => {
                    if (param.action === '1') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625650, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.action === '2') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625651, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.action === '3') {
                        param.dappId = this.dappId;
                        let label = param.label.split(',');
                        param.label = label.join('||');
                        let data = {
                            label: param.label,
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            picIcon: param.picIcon,
                            picScreenshot: param.picScreenshot,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url,
                            desc: param.desc,
                            company: param.company
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625652, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (param.action === '4') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            picIcon: param.picIcon,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url,
                            company: param.company
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
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
        }else if (this.code && !this.view) {
            this.buttons = [{
                title: '保存',
                handler: (param) => {
                    if (this.action === '1') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625660, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (this.action === '2') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625661, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (this.action === '3') {
                        param.dappId = this.dappId;
                        let label = param.label.split(',');
                        param.label = label.join('||');
                        let data = {
                            label: param.label,
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            picIcon: param.picIcon,
                            picScreenshot: param.picScreenshot,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url,
                            desc: param.desc,
                            company: param.company
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625662, data).then(() => {
                            showSucMsg('操作成功');
                            setTimeout(() => {
                                this.props.history.go(-1);
                            }, 1000);
                        }).catch(this.props.cancelFetching);
                    } else if (this.action === '4') {
                        let data = {
                            name: param.name,
                            id: param.id,
                            picList: param.picList,
                            category: param.category,
                            language: param.language,
                            location: param.location,
                            orderNo: param.orderNo,
                            isTop: param.isTop,
                            url: param.url1
                        };
                        if(param.ticketsFlag === '1') {
                            data.ticketsPrice = param.ticketsPrice;
                            data.ticketsSymbol = param.ticketsSymbol;
                        }
                        data.ticketsFlag = param.ticketsFlag;
                        fetch(625663, data).then(() => {
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
        }else if(this.view) {
            this.buttons = [{
                title: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }];
        }
    }
    render() {
        const fields = [{
            title: '类型',
            type: 'select',
            key: 'dopen_app_action',
            required: true,
            readonly: this.code,
            field: 'action',
            onChange: (v) => {
                this.setState({dkey: v});
                if (v === '1') {
                    this.setState({ category: true, name: true, picList: true });
                } else if (v === '2') {
                    this.setState({ category: true, name: true, picList: true, url: true });
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
            key: 'dopen_app_category',
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
            hidden: this.state.dkey === '1' || this.state.dkey === '2' || this.state.dkey === '4'
        }, {
            field: 'label',
            type: 'checkbox',
            listCode: '625476',
            keyName: 'id',
            valueName: 'name',
            hidden: this.state.dkey !== '3',
            required: !(this.state.dkey !== '3'),
            title: '应用标签',
            params: {type: 0},
            formatter(v, d) {
                return v;
            }
        }, {
            field: 'location',
            type: 'select',
            required: true,
            key: 'dopen_app_location',
            title: '位置'
        }, {
            field: 'picIcon',
            title: '图标',
            type: 'img',
            single: true,
            hidden: this.state.dkey !== '3',
            required: !(this.state.dkey !== '3')
        }, {
            field: 'picList',
            title: '列表展示图',
            type: 'img',
            single: true,
            required: true
        }, {
            field: 'picScreenshot',
            title: '详情截图',
            type: 'img',
            hidden: this.state.dkey !== '3',
            required: !(this.state.dkey !== '3')
        }, {
            title: 'url地址',
            field: 'url',
            hidden: this.state.dkey === '1' || this.state.dkey === '4',
            required: !(this.state.dkey === '1' || this.state.dkey === '4')
        }, {
            title: 'url地址',
            field: 'url1',
            type: 'select',
            key: 'dopen_app_inner_module',
            hidden: this.state.dkey !== '4',
            required: !(this.state.dkey !== '4'),
            formatter(v, d) {
                if(d.url) {
                    return d.url;
                }
            }
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
                    this.isHideTickets = false;
                }else {
                    this.isHideTickets = true;
                }
            }
        }, {
            field: 'ticketsPrice',
            title: '门票价格',
            hidden: this.isHideTickets,
            required: !this.isHideTickets
        }, {
            field: 'ticketsSymbol',
            title: '门票币种',
            hidden: this.isHideTickets,
            required: !this.isHideTickets,
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
            required: !(this.state.dkey === '1' || this.state.dkey === '2' || this.state.dkey === '4'),
            type: 'textarea',
            normalArea: true,
            hidden: this.state.dkey === '1' || this.state.dkey === '2' || this.state.dkey === '4',
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
            // addCode: 625450,
            deleteCode: 625451,
            // editCode: 625452,
            buttons: this.buttons
        });
    }
}

export default AppmanagentAddedit;
