import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/public/community-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.publicCommunityAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CommunityAddedit extends React.Component {
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
            field: 'parentCode',
            value: 0,
            hidden: true
        }, {
            title: '名称',
            field: 'name',
            required: true
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'commit_type',
            required: true,
            readonly: !!this.code
        }, {
            title: '图标',
            field: 'pic',
            type: 'img',
            required: true,
            single: true
        }, {
            title: '社群号',
            field: 'url',
            required: true
        }, {
            title: '顺序',
            field: 'orderNo',
            help: '数字越小，排序越靠前',
            required: true
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
            detailCode: '630507',
            beforeSubmit: (data) => {
                data.location = 'community';
                data.enPic = data.pic;
                if (this.code) {
                    data.type = this.props.pageData.type;
                }
                return data;
            }
        });
    }
}

export default CommunityAddedit;
