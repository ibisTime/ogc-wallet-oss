import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/public/legalDeclaration-addedit';
import {showSucMsg, getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.publicLegalDeclarationAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class LegalDeclarationAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'id',
            hidden: true
        }, {
            field: 'remark',
            title: '内容',
            readonly: true,
            required: true
        }, {
            title: '内容',
            field: 'cvalue',
            type: 'textarea',
            required: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            detailCode: 630046,
            editCode: 630042,
            beforeSubmit: (data) => {
                data.remark = this.props.pageData.remark;
                return data;
            }
        });
    }
}

export default LegalDeclarationAddedit;
