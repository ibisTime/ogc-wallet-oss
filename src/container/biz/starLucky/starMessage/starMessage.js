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
} from '@redux/biz/starLucky/starMessage';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.starLuckyStarMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class StarLuckyStarMessage extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.searchFlag = !!getQueryString('code', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '领取人',
            field: 'userId',
            render: function (v, data) {
                return data.userMobile;
            },
            type: 'select',
            pageCode: '805120',
            params: {
                updater: '',
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{mobile.DATA}}--{{nickname.DATA}}',
            searchName: 'mobile',
            search: true
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802005',
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: !this.searchFlag,
            render: function (v, data) {
                return data.redPacketInfo.symbol;
            }
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'red_packet_type',
            search: !this.searchFlag,
            render: function (v, data) {
                return data.redPacketInfo.type;
            }
        }, {
            title: '领取数量',
            field: 'count'
        }, {
            field: 'createDatetime',
            title: '领取时间',
            render: dateTimeFormat
        }, {
            title: '红包编号',
            field: 'redPacketCode'
        }, {
            title: '红包发送人',
            field: 'redPacketUser',
            render: function (v, data) {
                return data.redPacketInfo.sendUserMobile + '(' + data.redPacketInfo.sendUserNickname + ')';
            }
        }, {
            title: '红包总个数',
            field: 'sendNum',
            render: function (v, data) {
                return data.redPacketInfo.sendNum;
            }
        }, {
            title: '红包总额',
            field: 'totalCount',
            render: function (v, data) {
                return data.redPacketInfo.totalCount;
            }
        }, {
            field: 'createDateTime',
            title: '发送时间',
            render: function (v, data) {
                return dateTimeFormat(data.redPacketInfo.createDateTime);
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: '623010',
            searchParams: {
                redPacketCode: this.code
            }
        });
    }
}

export default StarLuckyStarMessage;