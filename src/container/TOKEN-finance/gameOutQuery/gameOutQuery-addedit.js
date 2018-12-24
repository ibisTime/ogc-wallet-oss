import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/gameOutQuery/gameOutQuery-addedit';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {getListUserAccount} from 'api/account';

@DetailWrapper(
    state => state.TOKENFinanceGameOutQueryAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class GameOutQueryAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        let fields = [{
            field: 'code',
            title: '编号'
        }, {
            title: '用户',
            field: 'userId',
            formatter: (v, data) => {
                return data.userInfo ? data.userInfo.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            formatter: (v, data) => {
                return data.userInfo ? data.userInfo.mobile : '';
            }
        }, {
            field: 'email',
            title: '邮箱',
            formatter: (v, data) => {
                return data.userInfo ? data.userInfo.email : '';
            }
        }, {
            title: '划转个数',
            field: 'count',
            formatter: (v, data) => {
                return moneyFormat(v, '', 'FMVP');
            }
        }, {
            title: '划转币种',
            field: 'currency'
        }, {
            title: '订单编号',
            field: 'gameTradeNo'
        }, {
            title: '日期',
            field: 'createDatetime',
            type: 'datetime'
        }];

        return this.props.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '802706'
        });
    }
}

export default GameOutQueryAddedit;
