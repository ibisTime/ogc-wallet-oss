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
} from '@redux/card/cardVolume';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    moneyFormatSubtract,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    getUserId,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

let currency = '';
@listWrapper(
    state => ({
        ...state.CardCardVolume,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CardVolume extends React.Component {
    render() {
        const fields = [{
            field: 'symbol',
            title: '币种'
        }, {
            field: 'price',
            title: '面值'
        }, {
            field: 'publicKey',
            title: '公钥',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'card_status',
            search: true
        }, {
            field: 'generateUser',
            title: '生成人',
            render(v, d) {
                return v && v.loginName;
            }
        }, {
            field: 'useUser',
            title: '兑换人',
            render(v) {
                return v && v.loginName;
            }
        }, {
            field: 'useUserId',
            title: '兑换人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: 'loginName',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'createDatetime',
            title: '生成卡时间',
            type: 'datetime'
        }, {
            field: 'openDatetime',
            title: '查看私钥时间',
            type: 'datetime'
        }, {
            field: 'useDatetime',
            title: '兑换时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610643',
            buttons: [{
                code: 'cardLog',
                name: '卡券日志'
            }],
            btnEvent: {
                cardLog: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/card/cardLog?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default CardVolume;
