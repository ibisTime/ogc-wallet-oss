import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/user/customer/customer-blackListAddedit';
import {getQueryString, getUserName} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.userCustomerBlackListAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CustomerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            required: true
        }, {
            field: 'type',
            title: '拉黑力度',
            value: '1',
            hidden: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '805240',
            detailCode: '805247',
            beforeSubmit: (data) => {
                data.updater = getUserName();
                return data;
            }
        });
    }
}

export default CustomerAddedit;
