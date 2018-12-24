import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/GJAddress/GJAddress-addedit';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {getListUserAccount} from 'api/account';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.TOKENFinanceGJAddressAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class GJAddressAddedit extends React.Component {
    render() {
        let fields = [{
            field: 'address',
            title: '地址'
        }];

        return this.props.buildDetail({
            fields,
            addCode: '802520'
        });
    }
}

export default GJAddressAddedit;
