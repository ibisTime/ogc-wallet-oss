import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/user/channelDealer/channelDealer-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.userChannelDealerAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class ChannelDealerAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
            required: true,
            readonly: !!this.code,
            minlength: 2,
            maxlength: 20
        }, {
            field: 'mobile',
            title: '手机号',
            required: true,
            readonly: !!this.code
        }, {
            field: 'email',
            title: '邮箱',
            required: true,
            readonly: !!this.code,
            hidden: !this.view
        }, {
            field: 'realName',
            title: '真实姓名',
            required: true,
            readonly: !!this.code
        }, {
            field: 'respArea',
            title: '负责区域',
            required: true
        }, {
            field: 'idKind',
            title: '证件类型',
            type: 'select',
            data: [{
                key: '1',
                value: '身份证'
            }],
            keyName: 'key',
            valueName: 'value',
            value: '1',
            hidden: !!this.code && !this.view
        }, {
            field: 'idNo',
            title: '证件号码',
            idCard: true,
            hidden: !!this.code && !this.view
        }, {
            field: 'loginPwd',
            title: '登录密码',
            type: 'password',
            required: true,
            hidden: !!this.code
        }];
        return this.props.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            addCode: '805044',
            editCode: '805091',
            detailCode: '805121'
        });
    }
}

export default ChannelDealerAddedit;
