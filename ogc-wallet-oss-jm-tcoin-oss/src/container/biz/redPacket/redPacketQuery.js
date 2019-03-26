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
} from '@redux/biz/redPacket/redPacketQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizRedPacketQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RedPacketQuery extends React.Component {
    render() {
        const fields = [{
            title: '红包编号',
            field: 'code'
        }, {
            title: '用户',
            field: 'userId',
            formatter: function (v, data) {
                return data.sendUserMobile + '(' + data.sendUserNickname + ')';
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
            search: true,
            render: (v, data) => v
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'red_packet_type',
            search: true
        }, {
            title: '红包总个数',
            field: 'sendNum'
        }, {
            title: '红包总额',
            field: 'totalCount'
        }, {
            title: '已领取个数',
            field: 'receivedNum'
        }, {
            title: '已领取总额',
            field: 'receivedCount'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'red_packet_status',
            search: true
        }, {
            field: 'createDateTime',
            title: '发送时间',
            type: 'date',
            rangedate: ['dateStart', 'dateEnd'],
            render: dateTimeFormat,
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '623009',
            beforeSearch: function (data) {
                if (data.status) {
                    var statusList = [];
                    statusList.push(data.status);
                    data.statusList = statusList;
                }
                return data;
            },
            btnEvent: {
                receiveQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/biz/receiveQuery?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default RedPacketQuery;