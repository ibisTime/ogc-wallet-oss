import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/finance/GJAddress/GJAddress-addedit';
import {getQueryString, moneyFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.financeGJAddressAddEdit,
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
