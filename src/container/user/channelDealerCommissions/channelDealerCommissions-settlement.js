import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/user/channelDealerCommissions/channelDealerCommissions-settlement';
import {getQueryString, moneyFormat, dateTimeFormat, showSucMsg, dateFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import {CION_FMVP} from 'common/js/config';

@DetailWrapper(
    state => state.userChannelDealerCommissionsSettlement,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class ChannelDealerCommissionsSettlement extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'userId',
            title: '用户',
            formatter: (v, data) => {
                return data.user ? data.user.realName ? data.user.realName : data.user.nickname : '';
            }
        }, {
            field: 'mobile',
            title: '手机号',
            formatter: (v, data) => {
                return data.user ? data.user.mobile : '-';
            }
        }, {
            field: 'email',
            title: '邮箱',
            formatter: (v, data) => {
                return data.user ? data.user.email : '-';
            }
        }, {
            field: 'count',
            title: '佣金',
            coin: CION_FMVP,
            coinAmount: true
        }, {
            field: 'currency',
            title: '币种'
        }, {
            field: 'refType',
            title: '佣金类型',
            type: 'select',
            key: 'award_ref_type'
        }, {
            field: 'refNote',
            title: '佣金说明'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                key: '0',
                value: '待结算'
            }, {
                key: '1',
                value: '已结算'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            field: 'refCode',
            title: '关联单号'
        }, {
            field: 'remark',
            title: '备注'
        }, {
            field: 'handleNote',
            title: '处理说明',
            required: true,
            readonly: false
        }];
        return this.props.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '802394',
            buttons: [{
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
            }]
        });
    }
}

export default ChannelDealerCommissionsSettlement;
