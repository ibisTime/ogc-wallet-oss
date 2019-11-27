import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserId, showSucMsg} from 'common/js/util';

@Form.create()
class LockoutAddedit extends DetailUtil {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }
    render() {
        const fields = [{
            field: 'userId',
            title: '针对用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'keyword',
            required: true,
            hidden: this.code
        }, {
            title: '针对用户',
            field: 'userName',
            hidden: !this.code,
            formatter(v, d) {
                return d.userInfo && d.userInfo.nickname + '-' + d.userInfo.loginName;
            },
            readonly: true
        }, {
            title: '币种',
            field: 'currency',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            required: true,
            hidden: this.code
        }, {
            title: '币种',
            field: 'currency1',
            hidden: !this.code,
            formatter(v, d) {
              return d && d.currency;
            },
            readonly: true
        }, {
            title: '数量',
            field: 'amount',
            required: true,
            number: true,
            hidden: this.code
        }, {
            title: '锁仓总额',
            field: 'amount',
            hidden: !this.code,
            readonly: true
        }, {
            title: '锁仓次数',
            field: 'status',
            hidden: !this.code,
            readonly: true
        }, {
            title: '已解锁数量',
            field: 'singleAmount',
            hidden: !this.code,
            readonly: true
        }, {
            title: '解锁次数',
            field: 'applyDatetime',
            hidden: !this.code,
            readonly: true
        }, {
            title: '未接锁数量',
            field: 'applyNote',
            hidden: !this.code,
            readonly: true
        }, {
            title: '申请说明',
            field: 'applyNote',
            type: 'textarea',
            required: true,
            normalArea: true
        }];
        return this.buildDetail({
            fields,
            code: this.code,
            view: this.view,
            addCode: '806040',
            detailCode: '806046',
            beforeSubmit(params) {
              params.type = '1';
              return params;
            }
        });
    }
}

export default LockoutAddedit;
