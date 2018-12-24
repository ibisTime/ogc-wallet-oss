import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/biz/comment/check-addedit';
import {getQueryString, moneyFormat, getUserId, showSucMsg, dateTimeFormat} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
    state => state.commentCheckAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class CheckAddEdit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
        this.check = !!getQueryString('check', this.props.location.search);
    }

    checkComment(approveResult, params) {
        this.props.doFetching();
        params.approveResult = approveResult;
        params.approver = getUserId();
        fetch(628270, params).then(() => {
            this.props.cancelFetching();
            showSucMsg('操作成功');
            setTimeout(() => {
                this.props.history.go(-1);
            }, 1000);
        }).catch(this.props.cancelFetching);
    }

    render() {
        let fields = [{
            field: 'content',
            title: '内容'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'comment_status',
            search: true
        }, {
            field: 'nickname',
            title: '评论人',
            formatter: (v, data) => {
                let type = data.userId === data.tradeOrder.buyUser ? '卖家' : '买家';
                return data.user.nickname + '(' + type + ')';
            }
        }, {
            field: 'objUser',
            title: '评论对象',
            formatter: (v, data) => {
                let type = data.userId === data.tradeOrder.buyUser ? '卖家' : '买家';
                return data.objectUser.nickname + '(' + type + ')';
            }
        }, {
            field: 'commentDatetime',
            title: '评论时间',
            type: 'datetime'
        }, {
            title: '订单类型',
            field: 'tradeType',
            type: 'select',
            data: [{
                'key': 'buy',
                'value': '购买'
            }, {
                'key': 'sell',
                'value': '出售'
            }],
            keyName: 'key',
            valueName: 'value',
            formatter: (v, data) => {
                return data.tradeOrder.type;
            }
        }, {
            title: '币种',
            field: 'tradeCoin',
            formatter: (v, data) => {
                return data.tradeOrder.tradeCoin;
            }
        }, {
            title: '交易数量',
            field: 'countString',
            formatter: (v, data) => {
                return moneyFormat(data.tradeOrder.countString, '', data.tradeOrder.tradeCoin);
            }
        }, {
            title: '手续费',
            field: 'feeString',
            formatter: (v, data) => {
                return moneyFormat(data.tradeOrder.feeString, '', data.tradeOrder.tradeCoin);
            }
        }, {
            field: 'payType',
            title: '支付方式',
            type: 'select',
            data: [{
                'key': '0',
                'value': '支付宝'
            }, {
                'key': '1',
                'value': '微信'
            }, {
                'key': '2',
                'value': '银行卡转账'
            }],
            keyName: 'key',
            valueName: 'value',
            formatter: (v, data) => {
                return data.tradeOrder.payType;
            }
        }, {
            title: '广告留言',
            field: 'leaveMessage',
            type: 'textarea',
            normalArea: true,
            formatter: (v, data) => {
                return data.tradeOrder.leaveMessage;
            }
        }, {
            title: '创建时间',
            field: 'createDatetime',
            formatter: (v, data) => {
                return dateTimeFormat(data.tradeOrder.createDatetime);
            }
        }, {
            title: '最后更新时间',
            field: 'updateDatetime',
            formatter: (v, data) => {
                return dateTimeFormat(data.tradeOrder.updateDatetime);
            }
        }, {
            field: this.check ? 'approveNote' : 'remark',
            title: '审核说明',
            readonly: !this.check
        }];
        const config = {
            fields,
            code: this.code,
            view: this.view,
            detailCode: 628276
        };
        if (this.check) {
            config.buttons = [{
                title: '通过',
                type: 'primary',
                check: true,
                handler: (params) => this.checkComment(1, params)
            }, {
                title: '不通过',
                type: 'primary',
                check: true,
                handler: (params) => this.checkComment(0, params)
            }, {
                title: '返回',
                handler: () => this.props.history.go(-1)
            }];
        }
        return this.props.buildDetail(config);
    }
}

export default CheckAddEdit;
