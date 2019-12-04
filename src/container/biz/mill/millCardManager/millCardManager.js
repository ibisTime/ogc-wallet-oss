import React from 'react';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/mill/millCardManager/millCardManager';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message, Input} from 'antd';

@listWrapper(
    state => ({
        ...state.millCardManager,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class millCardManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const fields = [{
            field: 'code',
            title: '卡券编号'
        }, {
            field: 'nickname',
            title: '用户',
            render(v, d) {
                return d.user.nickname ? d.user.nickname + '(' + (d.user.email ? d.user.email : d.user.mobile) + ')' : '-';
            }
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
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
            noVisible: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'miner_card_status',
            search: true
        }, {
            field: 'creatorName',
            title: '操作人'
        }, {
            field: 'createTime',
            title: '发放时间',
            type: 'datetime'
        }, {
            field: 'useTime',
            title: '卡券使用时间',
            type: 'datetime'
        }];
        return (
            <div>
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610583
                    })
                }
            </div>
        );
    }
}

export default millCardManager;
