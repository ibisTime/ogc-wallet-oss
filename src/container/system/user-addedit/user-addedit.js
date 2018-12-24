import React from 'react';
import {
    initStates,
    doFetching,
    cancelFetching,
    setSelectData,
    setPageData,
    restore
} from '@redux/system/user-addedit';
import {getQueryString} from 'common/js/util';
import {DetailWrapper} from 'common/js/build-detail';

@DetailWrapper(
    state => state.systemUserAddEdit,
    {initStates, doFetching, cancelFetching, setSelectData, setPageData, restore}
)
class UserAddedit extends React.Component {
    constructor(props) {
        super(props);
        this.code = getQueryString('code', this.props.location.search);
        this.view = !!getQueryString('v', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '登录名(手机号)',
            field: 'mobile',
            required: true,
            readonly: this.code
        }, {
            title: '真实姓名',
            field: 'realName',
            required: true
        }, {
            title: '密码',
            field: 'loginPwd',
            type: 'password',
            required: true,
            hidden: this.code
        }, {
            title: '角色',
            field: 'roleCode',
            type: 'select',
            listCode: '630007',
            keyName: 'code',
            valueName: 'name',
            required: true,
            hidden: this.code
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildDetail({
            fields,
            key: 'userId',
            code: this.code,
            view: this.view,
            addCode: 630050,
            editCode: 630060,
            detailCode: 630067
        });
    }
}

export default UserAddedit;
