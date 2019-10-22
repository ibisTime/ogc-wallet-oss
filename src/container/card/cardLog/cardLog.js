import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/card/cardLog';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyFormatSubtract,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    getUserId,
    showSucMsg,
    getQueryString
} from 'common/js/util';
import fetch from 'common/js/fetch';

let currency = '';
@listWrapper(
    state => ({
        ...state.CardcardLog,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CardLog extends React.Component {
    code = getQueryString('code', this.props.location.search);
    render() {
        const fields = [{
            field: 'price',
            title: '面值',
            render(v, d) {
                return d && d.card ? d.card.price : '';
            }
        }, {
            field: 'publicKey',
            title: '公钥',
            render(v, d) {
                return d && d.card ? d.card.publicKey : '';
            },
            search: true
        }, {
            field: 'type',
            title: '操作类型',
            type: 'select',
            key: 'card_log_type',
            search: true
        }, {
            field: 'user1',
            title: '操作人',
            render(v, d) {
                return d && d.user ? d.user.loginName : '';
            }
        }, {
            field: 'createDatetime',
            title: '操作时间',
            type: 'date'
        }];
        return <div className="superNode-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    pageCode: '610663',
                    searchParams: {
                        cardCode: this.code
                    },
                    buttons: [{
                        code: 'goBack',
                        name: '返回',
                        handler() {
                            window.history.go(-1);
                        }
                    }]
                })
            }
        </div>;
    }
}

export default CardLog;
