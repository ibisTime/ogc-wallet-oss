import React from 'react';
import {Modal, Transfer, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/rightsInterests/preservation/preservation';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.rightsInterestsPreservation,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RightsInterestsPreservation extends React.Component {
    render() {
        const fields = [{
            field: 'loginName',
            title: '购买用户',
            render(v, d) {
                return d.user && d.user.loginName;
            }
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                limit: 1000
            },
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
            title: '产品名称',
            field: 'name',
            search: true
        }, {
            title: '购买币种',
            field: 'symbolIn'
        }, {
            title: '释放币种',
            field: 'symbolOut'
        }, {
            title: '购买数量',
            field: 'amountIn'
        }, {
            title: '释放数量',
            field: 'amountOut'
        }, {
            title: '有效期限（天）',
            field: 'daysLimit'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'right_product_order_status',
            search: true
        }, {
            title: '创建人时间',
            field: 'createTime',
            type: 'datetime'
        }, {
            title: '到期时间',
            field: 'endTime',
            type: 'datetime'
        }, {
            title: '赎回时间',
            field: 'redeemTime',
            type: 'datetime'
        }, {
            title: '释放时间',
            field: 'releaseTime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 805483
        });
    }
}

export default RightsInterestsPreservation;
