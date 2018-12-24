import React from 'react';
import {Modal} from 'antd';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/BTC-finance/GJManually/GJManually-addedit';
import {getQueryString, moneyFormat, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.BTCFinanceGJManuallyAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class GJManuallyAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
    }
    render() {
        let fields = [{
            title: '阈值',
            field: 'balanceStart',
            required: true,
            number: true,
            min: '0'
        }];

        return this.props.buildDetail({
            fields,
            buttons: [{
                title: '归集',
                handler: (param) => {
                    Modal.confirm({
                        okText: '确认',
                        cancelText: '取消',
                        content: `所有余额大于${param.balanceStart}的地址都将进行归集，确定进行操作吗？`,
                        onOk: () => {
                            this.props.doFetching();
                            fetch(802362, param).then(() => {
                                showSucMsg('操作成功');
                                this.props.form.setFieldsValue({
                                    'balanceStart': ''
                                });
                                this.props.cancelFetching();
                            }).catch(this.props.cancelFetching);
                        }
                    });
                },
                check: true,
                type: 'primary'
            }]
        });
    }
}

export default GJManuallyAddedit;
