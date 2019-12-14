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
} from '@redux/parkingSpace/sessionManagement/userSpace';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    getCoinList,
    getUserId
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.parkingSpaceUserSpace,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class UserSpace extends React.Component {
    render() {
        const fields = [{
            field: 'parkOrderCode',
            title: '车位预售场次编号'
        }, {
            field: 'userId',
            title: '购买用户',
            type: 'select',
            pageCode: '805120',
            params: {
                kind: 'C'
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render(v, d) {
                return v && `${d.user.nickname}-${d.user.loginName}`;
            }
        }, {
            field: 'orderNo',
            title: '车位编号'
        }, {
            field: 'carCode',
            title: '停放车辆编号'
        }, {
            field: 'parkCar',
            title: '停放车辆信息',
            render(v) {
                return v && v.name;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'car_park_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 200103
        });
    }
}

export default UserSpace;
