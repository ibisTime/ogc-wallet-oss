import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';
const levelData = {
    '-1': '普通用户',
    '1': 'L1节点',
    '2': 'L2节点',
    '3': 'L3节点',
    '4': 'L4节点',
    '5': 'L5节点',
    '6': 'L6节点'
};
@Form.create()
class profitAddedit extends DetailUtil {
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
            formatter: (v, data) => {
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
            field: 'symbol',
            title: '币种',
            type: 'select',
            key: 'fpp_symbol_out'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'fpp_income_type'
        }, {
            field: 'nodeLevel',
            title: '节点等级',
            type: 'select',
            key: 'user_node_level_fpp',
            formatter(v, d) {
                return levelData[v];
            }
        }, {
            field: 'incomeCountExpect',
            title: '预计收益',
            formatter: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'incomeCountTax',
            title: '税费',
            formatter: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'incomeCountTaxFee',
            title: '税率'
        }, {
            field: 'incomeCountReal',
            title: '实际收益',
            formatter: (v, d) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'fpp_income_status'
        }, {
            field: 'settleDatetime',
            title: '结算时间',
            type: 'datetime'
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            key: 'id',
            code: this.code,
            view: this.view,
            detailCode: '610736',
            beforeSubmit: (params) => {
                params.id = this.code();
                return params;
            }
        });
    }
}

export default profitAddedit;
