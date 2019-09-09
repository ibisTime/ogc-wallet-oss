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
            field: 'name',
            title: '产品名称'
        }, {
            field: 'price',
            title: '购买单价'
        }, {
            field: 'symbol',
            title: '币种',
            formatter: function (v, data) {
                return `${v === 'TOSP_JIFEN' ? 'TOSP(积分)' : (v === 'JY' ? '间夜' : v)}`;
            }
        }, {
            field: 'quantity',
            title: '数量'
        }, {
            field: 'totalCount',
            title: '总金额',
            formatter: function (v, data) {
                return `${moneyFormat(v, '', 'ETH')}`;
            }
        }, {
            field: 'status',
            title: '状态',
            key: 'fpp_jy_order_status',
            type: 'select',
            search: true
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            detailCode: '610766'
        });
    }
}

export default atNightOrderAddedit;
