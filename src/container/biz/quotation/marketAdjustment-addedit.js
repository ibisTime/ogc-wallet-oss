import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/quotation/marketAdjustment-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.quotationMarketAdjustmentAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class MarketAdjustmentAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '说明',
            field: 'remark1',
            readonly: true,
            formatter: (v, data) => {
                return data.remark;
            }
        }, {
            title: '说明',
            field: 'remark',
            hidden: true
        }, {
            title: '数值',
            field: 'cvalue',
            required: true,
            number: true
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            editCode: '630042',
            detailCode: '630046',
            beforeSubmit: function(data) {
                data.type = 'coin_price_x';
                return data;
            }
        });
    }
}

export default MarketAdjustmentAddedit;
