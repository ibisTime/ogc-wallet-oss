import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/platformDivide/platformDivide-divide';
import {getQueryString, getUserId} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.TOKENFinancePlatformDivideDivide,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class PlatformDivideDivide extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'id',
            title: '分红id',
            readonly: true,
            value: this.code
        }, {
            field: 'divideProfit',
            title: '可分配利润',
            min: '0',
            amount: true,
            required: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            addCode: '802410',
            detailCode: '805121',
            beforeSubmit: data => {
                data.divideUser = getUserId();
                data.id = this.code;
                return data;
            }
        });
    }
}

export default PlatformDivideDivide;
