import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import { getDictList } from 'api/dict';

@Form.create()
class BannerAddEdit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.state = {
            ...this.state,
            dkey: '',
            url: false,
            id: false,
            ishidden: !!getQueryString('ishidden', this.props.location.search)
        };
        this.index = 0;
        getDictList({ parentKey: 'banner_location' }).then(data => {
            console.log('banner_location', data);
        });
    }
    render() {
        let {ishidden} = this.state;
        const fields = [{
            field: 'url',
            hidden: true
        }, {
            field: 'status',
            hidden: true,
            value: 1
        }, {
            title: 'banner名称',
            field: 'name',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: '中文banner图片',
            field: 'pic',
            type: 'img',
            help: '1200*300',
            required: true,
            single: true
        }, {
            title: '英文banner图片',
            field: 'pic',
            type: 'enName',
            help: '1200*300',
            required: true,
            single: true
        }, {
            field: 'type',
            title: '动作',
            type: 'select',
            key: 'banner_action',
            required: this.state.dkey !== 'app_guide',
            onChange: (v) => {
                this.setState({dkey: v});
                if (v === '1' && !this.state.url) {
                    this.setState({url: true, id: false});
                } else if (v === '2' && !this.state.id) {
                    this.setState({id: true, url: false});
                }
            }
        }, {
            title: 'url地址',
            field: 'aa',
            hidden: this.state.dkey !== '1',
            required: this.state.dkey === '1',
            formatter: (v, d) => d.url
        }, {
            title: '应用',
            type: 'select',
            pageCode: 625455,
            params: {
                status: '1'
            },
            field: 'aa1',
            keyName: 'id',
            valueName: 'name',
            // hidden: ishidden || this.view,
            hidden: this.state.dkey !== '2' || this.view,
            required: this.state.dkey === '2',
            formatter: (v, d) => {
                if(d.type === '2' && d.url) {
                    return d.url;
                }
            }
        }, {
            title: '应用',
            field: 'appName',
            hidden: !this.view,
            readonly: true
        }, {
            title: '备注',
            field: 'remark',
            maxlength: 250
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: 630500,
            editCode: 630502,
            detailCode: 630507,
            beforeSubmit: (params) => {
                params.location = 'app_home';
                if (params.location === 'app_guide') {
                    params.type = '0';
                    return params;
                };
                if(params.aa1) {
                    params.url = params.aa1;
                }else {
                    params.url = params.aa;
                }
                return params;
            }
        });
    }
}

export default BannerAddEdit;
