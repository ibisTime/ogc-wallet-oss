import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

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
            field: 'type',
            value: 2,
            hidden: true
        }, {
            title: 'banner名称',
            field: 'name',
            required: true
        }, {
            title: '位置',
            field: 'location',
            type: 'select',
            key: 'banner_location',
            required: true,
            onChange: (c) => {
                this.setState({dkey: c});
                if(this.index > 0) {
                    if (c === 'app_guide') {
                        this.setState({ishidden: true});
                    } else if (c === 'app_home') {
                        this.setState({ishidden: false});
                    }
                };
                this.index++;
            }
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: 'banner图片',
            field: 'pic',
            type: 'img',
            help: '1200*300',
            required: true,
            single: true
        }, {
            field: 'type',
            title: '动作',
            type: 'select',
            key: 'banner_action',
            hidden: ishidden || this.view,
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
            required: this.state.dkey === '1'
        }, {
            title: '应用',
            type: 'select',
            pageCode: 625455,
            params: {
                status: '1'
            },
            field: 'aa',
            keyName: 'id',
            valueName: 'name',
            hidden: ishidden || this.view,
            // hidden: this.state.dkey !== '2',
            required: this.state.dkey === '2'
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
                if (params.location === 'app_guide') {
                    params.type = '0';
                    return params;
                };
                params.url = params.aa;
                return params;
            }
        });
    }
}

export default BannerAddEdit;
