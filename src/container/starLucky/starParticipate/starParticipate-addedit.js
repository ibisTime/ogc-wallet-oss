import React from 'react';
import { Form } from 'antd';
import {
    getQueryString,
    moneyFormat
} from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class StarParticipateAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '红包编号',
            field: 'code1',
            formatter(v, data) {
                return data.code;
            }
        }, {
            title: '用户',
            field: 'userId',
            formatter: function(v, data) {
                return data.sendUserMobile + '(' + data.sendUserNickname + ')';
            }
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802265',
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol'
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'red_packet_type'
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
            key: 'red_packet_status'
        }, {
            field: 'createDateTime',
            title: '发送时间',
            type: 'datetime'
        }, {
            field: 'bestHandUserNickname',
            title: '最佳手气用户'
        }, {
            field: 'bestHandCount',
            title: '手气最佳金额'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '623006'
        });
    }
}

export default StarParticipateAddedit;