import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/TOKEN-finance/specialReward/specialReward-addedit';
import {getQueryString, moneyFormat, getUserName, showSucMsg} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import {getListUserAccount} from 'api/account';
import fetch from 'common/js/fetch';
import {CION_FMVP} from 'common/js/config';

@DetailWrapper(
    state => state.TOKENFinanceSpecialRewardAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class SpecialRewardAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.isSpecial = !!getQueryString('isSpecial', this.props.location.search);
        this.isDetail = !!getQueryString('isDetail', this.props.location.search);
        this.buttons = [];

        this.fields = [{
            field: 'userId',
            title: '申请人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{realName.DATA}}({{nickname.DATA}})-{{kind.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            formatter: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            field: 'count',
            title: '申请数量',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'remark',
            title: '申请说明'
        }];

        if (this.isSpecial || this.isDetail) {
            this.fields = this.fields.concat([{
                field: 'handleNote',
                title: '处理说明',
                required: true,
                readonly: this.isDetail
            }]);
        }

        if (this.isSpecial) {
            this.buttons = [{
                title: '结算',
                handler: (param) => {
                    var data = {
                        id: this.code,
                        handleResult: '1',
                        handleNote: param.handleNote
                    };
                    this.props.doFetching();
                    fetch(802390, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true,
                type: 'primary'
            }, {
                title: '不结算',
                handler: (param) => {
                    var data = {
                        id: this.code,
                        handleResult: '0',
                        handleNote: param.handleNote
                    };
                    this.props.doFetching();
                    fetch(802390, data).then(() => {
                        showSucMsg('操作成功');
                        this.props.cancelFetching();
                        setTimeout(() => {
                            this.props.history.go(-1);
                        }, 1000);
                    }).catch(this.props.cancelFetching);
                },
                check: true
            }, {
                title: '返回',
                handler: (param) => {
                    this.props.history.go(-1);
                }
            }];
        }
    }
    render() {
        return this.props.buildDetail({
            fields: this.fields,
            key: 'id',
            code: this.code,
            view: this.view,
            addCode: '802391',
            detailCode: '802394',
            buttons: this.buttons
        });
    }
}

export default SpecialRewardAddedit;
