import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/public/banner-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.publicBannerAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class BannerAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'status',
            value: 1,
            hidden: true
        }, {
            field: 'type',
            value: 2,
            hidden: true
        }, {
            field: 'parentCode',
            value: 0,
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
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
        }, {
            title: '中文图片',
            field: 'pic',
            type: 'img',
            required: true,
            single: true
        }, {
            title: '英文图片',
            field: 'enPic',
            type: 'img',
            required: true,
            single: true
        }, {
            title: 'url地址',
            field: 'url'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '630500',
            editCode: '630502',
            detailCode: '630507'
        });
    }
}

export default BannerAddEdit;
