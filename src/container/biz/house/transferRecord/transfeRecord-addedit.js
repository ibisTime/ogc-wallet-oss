import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class atNightOrderAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            formatter(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            noVisible: true,
            hidden: this.view
        }, {
            field: 'fromCurrency',
            title: '转入币种'
        }, {
            field: 'toCurrency',
            title: '转出币种'
        }, {
            field: 'amount',
            title: '金额',
            formatter: (v, data) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'fee',
            title: '手续费'
        }, {
            field: 'realAmount',
            title: '实际金额',
            formatter: (v, data) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'transfer_order_status',
            type: 'select',
            search: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '610776'
        });
    }
}

export default atNightOrderAddedit;
