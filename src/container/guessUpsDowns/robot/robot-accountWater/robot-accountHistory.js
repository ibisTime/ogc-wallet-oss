import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/guessUpsDowns/robotHistoryWater';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, moneyFormatSubtract, getCoinList, showWarnMsg} from 'common/js/util';
import {SYS_USER} from 'common/js/config';
import { getDictList } from 'api/dict';

@listWrapper(
    state => ({
        ...state.robotHistoryWater,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RobotHistoryWater extends React.Component {
    constructor(props) {
        super(props);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.isPlat = !!getQueryString('isPlat', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        if(this.symbol) {
            this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
        }
        this.buttons = [];
        this.buttons = [{
            code: 'export',
            name: '导出',
            check: false
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }
    render() {
        const fields = [{
            field: 'realName',
            title: '户名',
            render: (v, data) => {
                if (data.accountType === 'P') {
                    return '平台账户';
                } else {
                    return !v ? data.realName : v;
                }
            }
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            search: true
        }, {
            field: 'currency',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: !this.isPlat
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: this.isPlat ? this.bizType : 'jour_biz_type_user',
            search: true
        }, {
            field: 'transAmountString',
            title: '变动金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            render: (v, data) => {
                return moneyFormat(v, '', data.currency);
            }
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'bizNote',
            title: '备注'
        }];
        return <div className="guessUpsDowns-listPage-wrapper">
            {
                this.props.buildList({
                    fields,
                    pageCode: '802324',
                    searchParams: {
                        accountNumber: this.accountNumber
                    },
                    buttons: this.buttons
                })
            }
        </div>;
    }
}

export default RobotHistoryWater;
