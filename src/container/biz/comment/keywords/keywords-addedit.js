import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/comment/keywords-addedit';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.commentKeywordsAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class KeywordsAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'level',
            value: '0',
            hidden: true
        }, {
            field: 'reaction',
            value: '3',
            hidden: true
        }, {
            title: '关键字',
            field: 'word',
            maxlength: 50,
            required: true
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: 628006,
            addCode: 628000,
            editCode: 628002
        });
    }
}
export default KeywordsAddEdit;